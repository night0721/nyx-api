const {
  DiscordAPIError,
  Client,
  Partials,
  GatewayIntentBits,
} = require("discord.js");
export default async function handler(req, res) {
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
      const discord_user = {
        username: member.user.username,
        public_flags: member.user.flags,
        id: member.user.id,
        discriminator: member.user.discriminator,
        avatar: member.user.avatar,
      };
      const discord_status = member?.presence?.status || "offline";
      const spo_activity = member?.presence?.activities.find(
        activity => activity.name == "Spotify"
      );
      let spotify = null;
      if (spo_activity) {
        spotify = {
          timestamps: {
            start: Date.parse(spo_activity.timestamps.start),
            end: Date.parse(spo_activity.timestamps.end),
          },
          song: spo_activity.details,
          artist: spo_activity.state,
          album_art_url: `https://i.scdn.co/image/${spo_activity.assets.largeImage.slice(
            8
          )}`,
          album: spo_activity.assets.largeText,
        };
      }
      const activities = member?.presence?.activities.map(activity => {
        if (activity.name == "Spotify") {
          return {
            type: activity.type,
            timestamps: {
              start: Date.parse(activity.timestamps.start),
              end: Date.parse(activity.timestamps.end),
            },
            state: activity.state,
            party: {
              id: activity.party?.id,
            },
            name: activity.name,
            id: activity.id,
            flags: activity.flags,
            details: activity.details,
            created_at: activity.createdTimestamp,
            assets: {
              large_text: activity.assets?.largeText,
              large_image: activity.assets?.largeImage,
            },
          };
        }
        let activity_obj = {};
        activity.type != null ? (activity_obj["type"] = activity.type) : "";
        activity.state ? (activity_obj["state"] = activity.state) : "";
        activity.details ? (activity_obj["details"] = activity.details) : "";
        activity.flags ? (activity_obj["flags"] = activity.flags) : "";
        activity.name ? (activity_obj["name"] = activity.name) : "";
        activity.id ? (activity_obj["id"] = activity.id) : "";
        activity.createdTimestamp
          ? (activity_obj["timestamps"] = { start: activity.createdTimestamp })
          : "";
        activity.buttons.length != 0
          ? (activity_obj["buttons"] = activity.buttons)
          : "";
        activity.emoji
          ? (activity_obj["emoji"] = {
              name: activity.emoji?.name,
              id: activity.emoji?.id,
              animated: activity.emoji?.animated,
            })
          : "";
        activity.assets
          ? (activity_obj["assets"] = {
              small_text: activity.assets?.smallText,
              small_image: activity.assets?.smallImage,
              large_text: activity.assets?.largeText,
              large_image: activity.assets?.largeImage,
            })
          : "";
        activity.applicationId
          ? (activity_obj["application_id"] = activity.applicationId)
          : "";

        return activity_obj;
      });
      const active_on_discord_web = member?.presence?.clientStatus?.web
        ? true
        : false;
      const active_on_discord_mobile = member?.presence?.clientStatus?.mobile
        ? true
        : false;
      const active_on_discord_desktop = member?.presence?.clientStatus?.desktop
        ? true
        : false;
      if (member instanceof DiscordAPIError) {
        resolve();
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      } else {
        resolve();
        return res.status(200).json({
          success: true,
          data: {
            spotify,
            discord_user,
            discord_status,
            activities,
            active_on_discord_web,
            active_on_discord_mobile,
            active_on_discord_desktop,
          },
        });
      }
    });
  });
}
