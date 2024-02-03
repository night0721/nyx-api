const {
  DiscordAPIError,
  Client,
  Partials,
  GatewayIntentBits,
} = require("discord.js");
const fetch = require("node-fetch");
const allowlistGames = [
  "visual studio code",
  "visual studio",
  "atom",
  "sublime text",
  "adobe illustrator",
  "adobe photoshop",
  "adobe xd",
  "adobe dimension",
  "adobe after effects",
  "vim",
  "neovim",
  "blender",
  "autodesk 3ds max",
  "aseprite",
  "intellij idea ultimate",
  "intellij idea community",
  "phpstorm",
  "jetbrains ide",
  "youtube music",
  "code",
];
const statusColors = {
  online: "#43b581",
  idle: "#faa61a",
  dnd: "#f04747",
  streaming: "#6441a5",
  offline: "#555555",
};

const statusNames = {
  online: "Online",
  idle: "Away",
  dnd: "Do Not Disturb",
  streaming: "Streaming",
  offline: "Offline",
};
function processText(input) {
  input = input.length > 32 ? `${input.substring(0, 32)}...` : input;
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function parsePresence(user) {
  const username = processText(user.user.username);
  let pfpImage =
    "data:image/png;base64," +
    (await fetch(
      user.displayAvatarURL({
        format: "jpg",
        dynamic: true,
        size: 512,
      })
    )
      .then(res => res.buffer())
      .then(buffer => buffer.toString("base64")));

  const statuses = user.presence?.clientStatus;
  if (!statuses) {
    return {
      username,
      pfpImage,
      status: "offline",
      gameType: "Offline",
      game: "",
      details: "",
      detailsImage: false,
      state: "",
      height: 97,
    };
  }
  const status = statuses?.desktop || statuses?.mobile || statuses?.web;
  const playingRichGame = user.presence.activities
    .reverse()
    .find(
      e =>
        allowlistGames.includes(e.name.toLowerCase()) && (e.details || e.state)
    );
  const playingGame = user.presence.activities
    .reverse()
    .find(
      e =>
        allowlistGames.includes(e.name.toLowerCase()) && !e.details && !e.state
    );
  const spotifyGame = user.presence.activities.find(
    e => e.type == 2 && e.name == "Spotify"
  );
  const gameObject = spotifyGame || playingRichGame || playingGame;

  if (!gameObject) {
    return {
      username,
      pfpImage,
      status,
      gameType: "",
      game: "",
      details: "",
      detailsImage: false,
      state: "",
      height: 97,
    };
  }
  const game = processText(gameObject.name);
  let gameType = game == "Spotify" ? "Listening to" : "Playing";

  if (!gameObject.details && !gameObject.state) {
    return {
      username,
      pfpImage,
      status,
      gameType,
      game,
      details: "",
      detailsImage: false,
      state: "",
      height: 97,
    };
  }
  var details = gameObject.details ? processText(gameObject.details) : "";
  if (game == "IntelliJ IDEA Ultimate" || game == "IntelliJ IDEA Community")
    details = game;
  let detailsImage = false;
  let detialsURL = "";
  if (gameObject.assets && gameObject.assets.largeImage) {
    if (gameObject.assets.largeImage.startsWith("mp:")) {
      detialsURL = `https://media.discordapp.net/${gameObject.assets.largeImage.substring(
        3
      )}`;
    } else {
      detialsURL = `https://cdn.discordapp.com/app-assets/${gameObject.applicationId}/${gameObject.assets.largeImage}.png`;
      if (game == "Spotify")
        detialsURL = `https://i.scdn.co/image/${gameObject.assets.largeImage.replace(
          "spotify:",
          ""
        )}`;
    }
    if (detialsURL)
      detailsImage =
        "data:image/png;base64," +
        (await fetch(detialsURL)
          .then(res => res.buffer())
          .then(buffer => buffer.toString("base64")));
  }

  const state = gameObject.state ? processText(gameObject.state) : "";

  return {
    username,
    pfpImage,
    status,
    game,
    gameType,
    details,
    detailsImage,
    state,
    height: 187,
  };
}
class Card {
  constructor({
    username,
    pfpImage,
    status,
    game,
    gameType,
    details,
    detailsImage,
    state,
    height,
  }) {
    this.username = username;
    this.pfpImage = pfpImage;
    this.status = status;
    this.game = game;
    this.gameType = gameType;
    this.details = details;
    this.detailsImage = detailsImage;
    this.state = state;
    this.height = height;

    this.statusColor = statusColors[status];

    if (!this.game) {
      this.gameType = statusNames[status];
    }
  }

  render() {
    return `
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="382" height="${
      this.height
    }" viewBox="0 0 382 ${this.height}">
      <defs>
        <style>
          .cls-1{
            fill: none;
          }
    
          .cls-2 {
            fill: #202225;
          }
    
          .cls-3 {
            font-size: 20px;
          }
    
          .cls-11, .cls-3 {
            fill: #fff;
            font-family: SegoeUI-Bold, Segoe UI;
            font-weight: 700;
          }
    
          .cls-4 {
            font-size: 15px;
          }
    
          .cls-14, .cls-4 {
            fill: #b3b5b8;
            font-family: SegoeUI, Segoe UI;
          }
    
          .cls-5 {
            letter-spacing: -0.03em;
          }
    
          .cls-6 {
            letter-spacing: 0em;
          }
    
          .cls-7 {
            clip-path: url(#clip-path);
          }
    
          .cls-8 {
            fill: ${this.statusColor};
          }
    
          .cls-9 {
            fill: #2f3136;
          }
    
          .cls-10 {
            clip-path: url(#clip-path-2);
          }
    
          .cls-11, .cls-14 {
            font-size: 14px;
          }
        </style>
        <clipPath id="clip-path">
          <circle id="pfp-clip-shape" class="cls-1" cx="51" cy="48" r="31"/>
        </clipPath>
        <clipPath id="clip-path-2">
          <rect id="details-image-clip-shape" class="cls-1" x="34" y="106" width="52" height="52" rx="8" />
        </clipPath>
      </defs>
      <rect id="base-shape" class="cls-2" width="382" height="${
        this.height
      }" rx="4"/>
      <text id="username-text" class="cls-3" transform="translate(94.66 43.89)">${
        this.username
      }</text>
      <g id="game-text">
        <text class="cls-4" transform="translate(94.66 67.11)">${
          this.gameType
        } ${this.game}</text>
      </g>
      <g id="pfp-group">
        <g id="pfp-clip-group">
          <g class="cls-7">
            <image id="pfp-image" width="481" height="481" transform="translate(20 17) scale(0.13)" xlink:href="${
              this.pfpImage
            }"/>
          </g>
        </g>
        <circle id="status-outline" class="cls-2" cx="71.54" cy="68.54" r="10.46"/>
        <circle id="status-color" class="cls-8" cx="71.5" cy="68.5" r="6.5"/>
      </g>
      <g id="details-group" ${
        this.status == "offline" || !this.game || (!this.details && !this.state)
          ? 'display="none"'
          : ""
      }>
      <rect id="base-details-shape" class="cls-9" x="20" y="94" width="342" height="76" rx="4"/>
      <g id="details-image-clip-group">
        <g class="cls-10">
          ${
            this.detailsImage
              ? `<image id="details-image" width="128" height="128" transform="translate(34 106) scale(0.41)" xlink:href="${this.detailsImage}"/>`
              : '<rect id="details-image" width="128" height="128" transform="translate(34 106) scale(0.41)" fill="#7289da" />'
          }
        </g>
      </g>
      <g id="details-top-text">
        <text class="cls-11" transform="translate(95.66 126.57)">${
          this.details
        }</text>
      </g>
      <g id="details-bottom-text">
        <text class="cls-14" transform="translate(95.66 144.57)">${
          this.state
        }</text>
      </g>
      </g>
    </svg>`;
  }
  // <image width="128" height="128" transform="translate(318 25) scale(0.35)" xlink:href="${this.gameImage}"/>
}
export default async function handler(req, res) {
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=30");
  const client = new Client({
    shards: "auto",
    partials: [Partials.GuildMember],
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
    ],
  });
  return new Promise((resolve, reject) => {
    client.login(process.env.TOKEN).then(async () => {
      const member = await client.guilds
        .fetch(process.env.GUILD_ID)
        .then(async guild => {
          return await guild.members
            .fetch({
              user: req.query.id,
              cache: false,
              force: true,
            })
            .catch(error => {
              return error;
            });
        });
      client.destroy();

      let card;
      if (member instanceof DiscordAPIError) {
        card = new Card({
          username: "Error",
          pfpImage:
            "https://sparkcdnwus2.azureedge.net/sparkimageassets/XPDC2RH70K22MN-08afd558-a61c-4a63-9171-d3f199738e9f",
          status: "online",
          game: "Discord",
          gameType: "Playing",
          details: "Member Not Found",
          detailsImage:
            "https://sparkcdnwus2.azureedge.net/sparkimageassets/XPDC2RH70K22MN-08afd558-a61c-4a63-9171-d3f199738e9f",
          state: "Join discord.gg/SbQHChmGcp",
          height: 187,
        });
      } else {
        card = new Card(await parsePresence(member));
      }
      res.status(200).send(card.render());
      resolve();
    });
  });
}
