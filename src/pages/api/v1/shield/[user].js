const {
  DiscordAPIError,
  Client,
  Partials,
  GatewayIntentBits,
} = require("discord.js");

export default async function handler(req, res) {
  // return a promise to avoid stalled requests
  return new Promise(resolve => {
    let { logoColor, style, theme, presenceTheme, compact, user, bot } =
      req.query;

    // presenceTheme is present for legacy purposes, theme should be used instead
    theme = theme || presenceTheme;
    style = style || "for-the-badge";
    const client = new Client({
      shards: "auto",
      partials: [Partials.GuildMember],
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
      ],
    });
    async function getUserInfo() {
      return new Promise(resolve => {
        client.login(process.env.TOKEN).then(async () => {
          const member = await client.guilds
            .fetch(process.env.GUILD_ID)
            .then(async guild => {
              return await guild.members
                .fetch({
                  user: req.query.user,
                  cache: false,
                  force: true,
                })
                .catch(_ => {
                  return resolve({
                    t: "Error",
                    p: "Join discord.gg/SbQHChmGcp",
                  });
                });
            });
          client.destroy();
          if (member instanceof DiscordAPIError) {
            return resolve({
              t: "Error",
              p: "Join discord.gg/SbQHChmGcp",
            });
          } else {
            let presence = member?.presence?.status || "offline";
            const tag = member.user.tag;
            if (presence == "dnd") {
              presence = "do not disturb";
            }
            return resolve({ t: tag, p: presence });
          }
        });
      });
    }

    // get the shield from shields.io and returns it
    async function makeShield() {
      let { t, p } = await getUserInfo();

      // Quick temp overwrite
      if (t === "Error") {
        p = "Join discord.gg/SbQHChmGcp";
      }

      // a lookup table for the presence colors
      const presenceColors = {
        online: "3ba55d",
        idle: "faa81a",
        "do not disturb": "ed4245",
        offline: "555",
      };

      // a lookup table for the themes
      const themes = {
        default: ["555", "5865F2"],
        "default-inverted": ["5865F2", "555"],
        clean: ["555", presenceColors[p]],
        "clean-inverted": [`${presenceColors[p]}`, "555"],
        discord: ["5865F2", presenceColors[p]],
        "discord-inverted": [presenceColors[p], "5865F2"],
        "full-presence": [presenceColors[p], presenceColors[p]],
        gray: ["555", "555"],
        grey: ["555", "555"],
        blurple: ["5865F2", "5865F2"],
      };

      if (logoColor) {
        logoColor = logoColor === "presence" ? presenceColors[p] : logoColor;
      } else {
        logoColor = style === "social" ? "#5865F2" : "white";
      }

      const colors = themes[theme] || themes["default"];

      let text;
      // if compact is true, we set the text accordingly
      if (compact) {
        text = {
          label: "",
          message: encodeURIComponent(t),
        };
      } else {
        text = {
          label: encodeURIComponent(t),
          message: encodeURIComponent(p),
        };
      }

      const shieldURL = `https://img.shields.io/static/v1?label=${text.label}&message=${text.message}&style=${style}&color=${colors[0]}&labelColor=${colors[1]}&logo=discord&logoColor=${logoColor}`;
      const rawShield = await fetch(shieldURL);
      const svgShield = await rawShield.text();

      // fix the username and invite url being capitalized
      let svgShieldFix = svgShield.replace(new RegExp(t.toUpperCase(), "g"), t);
      svgShieldFix = svgShieldFix.replace(
        new RegExp("HTTPS://DISCORD.GG/ZKSPFFWQDG", "g"),
        "https://discord.gg/zkspfFwqDg"
      );

      // make the username bold
      svgShieldFix = svgShieldFix.replace(
        new RegExp(`fill="#fff">${t}</text>`, "g"),
        `fill="#fff" font-weight="bold">${t}</text>`
      );

      res.setHeader("Content-Type", "image/svg+xml");
      res.status(200).send(svgShieldFix);
    }

    // call the function and resolve the promise
    makeShield().then(() => {
      resolve;
    });
  });
}
