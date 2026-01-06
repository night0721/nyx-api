import { AutoRouter, error, json } from "itty-router";
import { createCanvas, loadImage } from "canvas";

export const router = AutoRouter({ base: "/api/v1/image" });

router.get("/alone", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const avatar = await loadImage(imageUrl);
		const canvas = createCanvas(1100, 892);
		const ctx = canvas.getContext("2d");
		const background = await loadImage("public/image/alone.jpg");
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(avatar, 480, 350, 205, 205);
		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/bestmeme", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const bg = await loadImage("public/image/bestmeme.jpg");
		const img = await loadImage(imageUrl);
		const canvas = createCanvas(966, 1145);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(img, 693, 970, 127, 127);
		ctx.drawImage(img, 114, 734, 239, 239);
		ctx.drawImage(bg, 0, 0, 966, 1145);

		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/busted", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const avatar = await loadImage(imageUrl);
		const bg = await loadImage("public/image/busted.jpg");
		const canvas = createCanvas(1000, 1000);
		const ctx = canvas.getContext("2d");
		ctx.drawImage(avatar, 0, 0, 1000, 1000);
		ctx.drawImage(bg, 0, 0, 1000, 1000);
		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/communism", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const baseAvatar = await loadImage(imageUrl);
		const overlayAvatar = await loadImage("public/image/communism.jpg");
		const canvas = createCanvas(1024, 1024);
		const ctx = canvas.getContext("2d");
		ctx.globalAlpha = 0.3;
		ctx.drawImage(baseAvatar, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(overlayAvatar, 0, 0, 1024, 1024);
		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/gun", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const bg = await loadImage("public/image/gun.jpg");
		const img = await loadImage(imageUrl);
		const canvas = createCanvas(550, 550);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(img, 0, 0, 550, 550);
		ctx.drawImage(bg, -70, 190, 350, 350);

		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/mask", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const bg = await loadImage("public/image/mask.jpg");
		const img = await loadImage(imageUrl);
		const canvas = createCanvas(1080, 960);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(img, 64, 571, 269, 269);
		ctx.drawImage(bg, 0, 0, 1080, 960);

		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/moment", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const canvas = createCanvas(500, 670);
		const ctx = canvas.getContext("2d");
		const background = await loadImage("public/image/moment.jpg");
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		const avatar = await loadImage(imageUrl);
		ctx.drawImage(avatar, 150, 100, 205, 205);
		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/pray", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const bg = await loadImage("public/image/pray.jpg");
		const img = await loadImage(imageUrl);
		const canvas = createCanvas(396, 275);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(img, 214, 10, 143, 136);
		ctx.drawImage(bg, 0, 0, 396, 275);

		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/pressplay", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const bg = await loadImage("public/image/pressplay.jpg");
		const img = await loadImage(imageUrl);
		const canvas = createCanvas(474, 474);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(img, 218, 208, 228, 228);
		ctx.drawImage(bg, 0, 0, 474, 474);

		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/rifleshoot", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const bg = await loadImage("public/image/rifleshoot.jpg");
		const img = await loadImage(imageUrl);
		const canvas = createCanvas(318, 299);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(img, 55, 28, 118, 118);
		ctx.drawImage(bg, 0, 0, 318, 299);

		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/robert", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const bg = await loadImage("public/image/robert.jpg");
		const glasses = await loadImage("public/image/glasses.jpg");
		const img = await loadImage(imageUrl);
		const canvas = createCanvas(295, 406);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(img, 50, 115, 53, 53);
		ctx.drawImage(img, 218, 115, 53, 53);
		ctx.drawImage(glasses, 62, 130, 36, 19);
		ctx.drawImage(bg, 0, 0, 295, 406);

		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/saveonlyone", async (request) => {
	const imageUrl = request.query.image as string;
	const imageUrl2 = request.query.image2 as string;
	const imageUrl3 = request.query.image3 as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	if (!imageUrl2) {
		return error(400, "Missing 'Image2' Property");
	}
	if (!imageUrl3) {
		return error(400, "Missing 'Image3' Property");
	}
	try {
		const bg = await loadImage("public/image/saveonlyone.jpg");
		const img = await loadImage(imageUrl);
		const img2 = await loadImage(imageUrl2);
		const img3 = await loadImage(imageUrl3);
		const canvas = createCanvas(910, 799);
		const ctx = canvas.getContext("2d");
		ctx.drawImage(img, 465, 135, 158, 158);
		ctx.drawImage(img2, 729, 107, 158, 158);
		ctx.drawImage(img3, 170, 478, 104, 104);
		ctx.drawImage(bg, 0, 0, 910, 799);
		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/toilet", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const canvas = createCanvas(500, 670);
		const ctx = canvas.getContext("2d");
		const background = await loadImage("public/image/toilet.jpg");
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		const avatar = await loadImage(imageUrl);
		ctx.drawImage(avatar, 135, 350, 205, 205);
		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/vr", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const bg = await loadImage("public/image/vr.jpg");
		const img = await loadImage(imageUrl);
		const canvas = createCanvas(780, 768);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(img, 46, 409, 305, 305);
		ctx.drawImage(bg, 0, 0, 780, 768);

		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});

router.get("/whodidthis", async (request) => {
	const imageUrl = request.query.image as string;
	if (!imageUrl) {
		return error(400, "Missing 'Image' Property");
	}
	try {
		const bg = await loadImage("public/image/whodidthis.jpg");
		const img = await loadImage(imageUrl);
		const canvas = createCanvas(512, 512);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(img, 0, 109, 512, 295);
		ctx.drawImage(bg, 0, 0, 512, 512);

		const buffer = canvas.toBuffer();
		return new Response(buffer, {
			headers: {
				"Content-Type": "image/jpg",
			},
		});
	} catch (e) {
		return error(400, e.message);
	}
});
