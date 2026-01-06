import { AutoRouter, createResponse, error, json } from "itty-router";
import { DiscordAPIError, Client, Partials, GatewayIntentBits, GuildMember, Activity } from "discord.js";

export const router = AutoRouter({ base: "/api/v1/discord" });

router.get("/server/:invite", async request => {
	let { logoColor, style, theme, presenceTheme, compact } = request.query;
	style = style || "for-the-badge";
	theme = (theme as string) || "default";
	presenceTheme = (presenceTheme as string) || "online";

	const res = await fetch(`https://discord.com/api/v10/invites/${request.invite}?with_counts=true&with_expiration=true`, { method: "GET", }).catch(e => console.error("[ERROR]", e, Date.now())) as Response;
	const serverInfo = await res.json();

	let label: string, message: string;
	if (serverInfo.code === 10006) {
		label = "Error";
		message = "Unknown Invite";
	} else {
		label = serverInfo.guild.name;
		message = `${serverInfo.approximate_member_count} members`;
	}

	const presenceColors = {
		online: "43B581",
		idle: "FAA81A",
		"do not disturb": "EDD4245",
		offline: "555",
	};

	const themes = {
		default: ["555", "5865F2"],
		"default-inverted": ["5865F2", "555"],
		clean: ["555", presenceColors[presenceTheme]],
		"clean-inverted": [`${presenceColors[presenceTheme]}`, "555"],
		discord: ["5865F2", presenceColors[presenceTheme]],
		"discord-inverted": [presenceColors[presenceTheme], "5865F2"],
		"full-presence": [presenceColors[presenceTheme], presenceColors[presenceTheme]],
		gray: ["555", "555"],
		grey: ["555", "555"],
		blurple: ["5865F2", "5865F2"],
	};

	if (logoColor) {
		logoColor = logoColor === "presence" ? presenceColors[presenceTheme] : logoColor;
	} else {
		logoColor = style === "social" ? "#5865F2" : "white";
	}

	const colors = themes[theme] || themes["default"];

	let text = {
		label: compact ? "" : encodeURIComponent(label),
		message: compact ? encodeURIComponent(label) : encodeURIComponent(message),
	};

	// Get the shield from shields.io and returns it
	const rawShield = await fetch(`https://img.shields.io/static/v1?label=${text.label}&message=${text.message}&style=${style}&color=${colors[0]}&labelColor=${colors[1]}&logo=discord&logoColor=${logoColor}`);

	// Fix the server name being capitalized and make it bold
	let shield = (await rawShield.text()).replace(new RegExp(label.toUpperCase(), "g"), label).replace(
		new RegExp(`fill="#fff">${label}</text>`, "g"),
		`fill="#fff" font-weight="bold">${label}</text>`
	);

	const svg = createResponse("image/svg+xml");
	return svg(shield);
});

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

function processText(input: string): string {
	input = input.length > 32 ? `${input.substring(0, 32)}...` : input;
	return input
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

interface CardData {
	username: string;
	pfpImage: string;
	status: string;
	game: string;
	gameType: string;
	details: string;
	detailsImage: string | false;
	state: string;
	height: number;
}

async function parsePresence(member: any): Promise<CardData> {
	const username = processText(member.user.username);
	const avatarUrl = member.displayAvatarURL({
		format: "jpg",
		dynamic: true,
		size: 512,
	});
	const avatarResponse = await fetch(avatarUrl);
	const avatarBuffer = await avatarResponse.arrayBuffer();
	const pfpImage =
		"data:image/png;base64," +
		Buffer.from(avatarBuffer).toString("base64");

	const statuses = member.presence?.clientStatus;
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
	const playingRichGame = member.presence.activities
		.reverse()
		.find(
			(e: any) =>
				allowlistGames.includes(e.name.toLowerCase()) &&
				(e.details || e.state)
		);
	const playingGame = member.presence.activities
		.reverse()
		.find(
			(e: any) =>
				allowlistGames.includes(e.name.toLowerCase()) &&
				!e.details &&
				!e.state
		);
	const spotifyGame = member.presence.activities.find(
		(e: any) => e.type == 2 && e.name == "Spotify"
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
	let detailsImage: string | false = false;
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
		if (detialsURL) {
			const detailsResponse = await fetch(detialsURL);
			const detailsBuffer = await detailsResponse.arrayBuffer();
			detailsImage =
				"data:image/png;base64," +
				Buffer.from(detailsBuffer).toString("base64");
		}
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
	username: string;
	pfpImage: string;
	status: string;
	game: string;
	gameType: string;
	details: string;
	detailsImage: string | false;
	state: string;
	height: number;
	statusColor: string;

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
				}: CardData) {
		this.username = username;
		this.pfpImage = pfpImage;
		this.status = status;
		this.game = game;
		this.gameType = gameType;
		this.details = details;
		this.detailsImage = detailsImage;
		this.state = state;
		this.height = height;

		this.statusColor = statusColors[status as keyof typeof statusColors];

		if (!this.game) {
			this.gameType = statusNames[status as keyof typeof statusNames];
		}
	}

	render(): string {
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
            font-family: SegoeUI-Bold, Segoe UI, serif;
            font-weight: 700;
          }
    
          .cls-4 {
            font-size: 15px;
          }
    
          .cls-14, .cls-4 {
            fill: #b3b5b8;
            font-family: SegoeUI, Segoe UI, serif;
          }
    
          .cls-5 {
            letter-spacing: -0.03em;
          }
    
          .cls-6 {
            letter-spacing: 0;
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
				? "display=\"none\""
				: ""
		}>
      <rect id="base-details-shape" class="cls-9" x="20" y="94" width="342" height="76" rx="4"/>
      <g id="details-image-clip-group">
        <g class="cls-10">
          ${
			this.detailsImage
				? `<image id="details-image" width="128" height="128" transform="translate(34 106) scale(0.41)" xlink:href="${this.detailsImage}"/>`
				: "<rect id=\"details-image\" width=\"128\" height=\"128\" transform=\"translate(34 106) scale(0.41)\" fill=\"#7289da\" />"
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
}

async function getMember(id: string): Promise<GuildMember | Response> {
	const client = new Client({
		shards: "auto",
		partials: [Partials.GuildMember],
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMembers,
			GatewayIntentBits.GuildPresences,
		],
	});
	try {
		await client.login(process.env.TOKEN);
		const guild = await client.guilds.fetch(process.env.GUILD_ID!);
		const member = await guild.members
			.fetch({
				user: id,
				cache: false,
				force: true,
			})
			.catch(() => null);

		await client.destroy();
		return member;
	} catch (e) {
		await client.destroy().catch(() => {
		});
		return error(500, e.message);
	}
}

router.get("/user/:id", async request => {
	const member = await getMember(request.id);
	if (member instanceof Response) return member;
	try {
		let card: Card;
		if (!member || member instanceof DiscordAPIError) {
			card = new Card({
				username: "Error",
				pfpImage: "https://avatars.githubusercontent.com/u/77528305?v=4",
				status: "online",
				game: "Discord",
				gameType: "Playing",
				details: "Member Not Found",
				detailsImage: "https://avatars.githubusercontent.com/u/77528305?v=4",
				state: "Join discord.gg/SbQHChmGcp",
				height: 187,
			});
		} else {
			card = new Card(await parsePresence(member));
		}

		const svg = createResponse("image/svg+xml");
		return svg(card.render());
	} catch (e) {
		return error(500, e.message);
	}
});

router.get("/user/json/:id", async request => {
	// Member could be an error or guild member
	const member = await getMember(request.id);
	if (member instanceof Response) return member;
	if (!member || member instanceof DiscordAPIError) {
		return error(400, "User not found");
	}

	const discord_user = {
		username: member.user.username,
		public_flags: member.user.flags,
		id: member.user.id,
		discriminator: member.user.discriminator,
		avatar: member.user.avatar,
	};

	const discord_status = member.presence?.status || "offline";
	const activity = member.presence?.activities.find(
		(activity: Activity) => activity.name == "Spotify"
	);
	let spotify = null;
	if (activity) {
		spotify = {
			timestamps: {
				start: activity.timestamps.start.getTime(),
				end: activity.timestamps.end.getTime(),
			},
			song: activity.details,
			artist: activity.state,
			album_art_url: `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`,
			album: activity.assets.largeText,
		};
	}
	const activities = member?.presence?.activities.map((activity: Activity) => {
		if (activity.name == "Spotify") {
			return {
				type: activity.type,
				timestamps: {
					start: activity.timestamps.start.getTime(),
					end: activity.timestamps.end.getTime(),
				},
				state: activity.state,
				party: {
					id: activity.party?.id,
				},
				name: activity.name,
				flags: activity.flags,
				details: activity.details,
				created_at: activity.createdTimestamp,
				assets: {
					large_text: activity.assets?.largeText,
					large_image: activity.assets?.largeImage,
				},
			};
		}
		let activity_obj: any = {};
		if (activity.type != null) activity_obj["type"] = activity.type;
		if (activity.state) activity_obj["state"] = activity.state;
		if (activity.details) activity_obj["details"] = activity.details;
		if (activity.flags) activity_obj["flags"] = activity.flags;
		if (activity.name) activity_obj["name"] = activity.name;
		if (activity.createdTimestamp) activity_obj["timestamps"] = { start: activity.createdTimestamp };
		if (activity.buttons && activity.buttons.length != 0) activity_obj["buttons"] = activity.buttons;
		if (activity.emoji)
			activity_obj["emoji"] = {
				name: activity.emoji?.name,
				id: activity.emoji?.id,
				animated: activity.emoji?.animated,
			};
		if (activity.assets)
			activity_obj["assets"] = {
				small_text: activity.assets?.smallText,
				small_image: activity.assets?.smallImage,
				large_text: activity.assets?.largeText,
				large_image: activity.assets?.largeImage,
			};
		if (activity.applicationId)
			activity_obj["application_id"] = activity.applicationId;

		return activity_obj;
	});
	const active_on_discord_web = !!member?.presence?.clientStatus?.web;
	const active_on_discord_mobile = !!member?.presence?.clientStatus?.mobile;
	const active_on_discord_desktop = !!member?.presence?.clientStatus?.desktop;

	return json({
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
});

router.get("/shield/:id", async request => {
	let { logoColor, style, theme, presenceTheme, compact } = request.query;
	style = style || "for-the-badge";
	theme = (theme as string) || (presenceTheme as string) || "default";

	const member = await getMember(request.id);
	if (member instanceof Response) return member;

	try {
		let label: string, message: string;
		if (!member || member instanceof DiscordAPIError) {
			label = "Error";
			message = "Join discord.gg/SbQHChmGcp";
		} else {
			let presence = member?.presence?.status as string || "offline";
			label = member.user.tag;
			if (presence == "dnd") {
				presence = "do not disturb";
			}
			message = presence;
		}

		if (label == "Error") {
			message = "Join discord.gg/SbQHChmGcp";
		}

		const presenceColors = {
			online: "3ba55d",
			idle: "faa81a",
			"do not disturb": "ed4245",
			offline: "555",
		};

		const themes = {
			default: ["555", "5865F2"],
			"default-inverted": ["5865F2", "555"],
			clean: ["555", presenceColors[message]],
			"clean-inverted": [presenceColors[message], "555"],
			discord: ["5865F2", presenceColors[message]],
			"discord-inverted": [presenceColors[message], "5865F2"],
			"full-presence": [presenceColors[message], presenceColors[message]],
			gray: ["555", "555"],
			grey: ["555", "555"],
			blurple: ["5865F2", "5865F2"],
		};

		let logoColorValue: string;
		if (logoColor) {
			logoColorValue =
				logoColor === "presence"
					? presenceColors[message]
					: (logoColor as string);
		} else {
			logoColorValue = style === "social" ? "#5865F2" : "white";
		}

		const colors = themes[theme] || themes["default"];

		// If compact is true, we set the text accordingly
		let text = {
			label: compact ? "" : encodeURIComponent(label),
			message: encodeURIComponent(message),
		};

		const rawShield = await fetch(`https://img.shields.io/static/v1?label=${text.label}&message=${text.message}&style=${style}&color=${colors[0]}&labelColor=${colors[1]}&logo=discord&logoColor=${logoColorValue}`);

		// Fix the username and invite URL being capitalized and make the username bold
		let shield = (await rawShield.text()).replace(new RegExp(label.toUpperCase(), "g"), label).replace(
			new RegExp("HTTPS://DISCORD.GG/SBQHCHMGCP", "g"),
			"https://discord.gg/SbQHChmGcp"
		).replace(
			new RegExp(`fill="#fff">${label}</text>`, "g"),
			`fill="#fff" font-weight="bold">${label}</text>`
		);

		const svg = createResponse("image/svg+xml");
		return svg(shield);
	} catch (e) {
		return error(500, e.message);
	}
});