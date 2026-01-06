import { AutoRouter, error, json } from "itty-router";

export const router = AutoRouter({ base: "/api/v1/fun" });

router.get("/8ball", (request) => {
	const answers = [
		"Maybe.",
		"Certainly not.",
		"I hope so.",
		"Not in your wildest dreams.",
		"There is a good chance.",
		"Quite likely.",
		"I think so.",
		"I hope not.",
		"I hope so.",
		"Never!",
		"Fuhgeddaboudit.",
		"Ahaha! Really?!?",
		"Pfft.",
		"Sorry, bucko.",
		"Hell, yes.",
		"Hell to the no.",
		"The future is bleak.",
		"The future is uncertain.",
		"I would rather not say.",
		"Who cares?",
		"Possibly.",
		"Never, ever, ever.",
		"There is a small chance.",
		"Yes!",
	];
	return json({ answer: answers[Math.floor(Math.random() * answers.length)] });
});

router.get("/doublestruck", (request) => {
	const text = request.query.text as string;
	if (!text) return error(400, "Missing Text");
	const w = {
		" ": " ",
		0: "𝟘",
		1: "𝟙",
		2: "𝟚",
		3: "𝟛",
		4: "𝟜",
		5: "𝟝",
		6: "𝟞",
		7: "𝟟",
		8: "𝟠",
		9: "𝟡",
		"+": "+",
		"-": "-",
		a: "𝕒",
		b: "𝕓",
		c: "𝕔",
		d: "𝕕",
		e: "𝕖",
		f: "𝕗",
		g: "𝕘",
		h: "𝕙",
		i: "𝕚",
		j: "𝕛",
		k: "𝕜",
		l: "𝕝",
		m: "𝕞",
		n: "𝕠",
		o: "𝕡",
		p: "𝕢",
		r: "𝕣",
		s: "𝕤",
		t: "𝕥",
		u: "𝕦",
		v: "𝕧",
		w: "𝕨",
		x: "𝕩",
		y: "𝕪",
		z: "𝕫",
	};
	return json({
		text: text.split("").map(c => {
			if (c in w) return w[c];
			return "";
		}).join("")
	});
});

router.get("/fractur", (request) => {
	const text = request.query.text as string;
	if (!text) return error(400, "Missing Text");
	const w = {
		" ": " ",
		0: "օ",
		1: "յ",
		2: "շ",
		3: "Յ",
		4: "կ",
		5: "Տ",
		6: "ճ",
		7: "Դ",
		8: "Ց",
		9: "գ",
		"+": "+",
		"-": "-",
		a: "𝖆",
		b: "𝖇",
		c: "𝖈",
		d: "𝖉",
		e: "𝖊",
		f: "𝖋",
		g: "𝖌",
		h: "𝖍",
		i: "𝖎",
		j: "𝖏",
		k: "𝖐",
		l: "𝖑",
		m: "𝖒",
		n: "𝖔",
		o: "𝖕",
		p: "𝖖",
		r: "𝖗",
		s: "𝖘",
		t: "𝖙",
		u: "𝖚",
		v: "𝖛",
		w: "𝖜",
		x: "𝖝",
		y: "𝖞",
		z: "𝖟",
	};
	return json({
		text: text.split("").map(c => {
			if (c in w) return w[c];
			return "";
		}).join("")
	});
});

router.get("/reverse", (request) => {
	const text = request.query.text as string;
	if (!text) return error(400, "Missing Text");
	return json({ text: text.split("").reverse().join("") });
});

router.get("/superscript", (request) => {
	const text = request.query.text as string;
	if (!text) return error(400, "Missing Text");
	const w = {
		" ": " ",
		0: "⁰",
		1: "¹",
		2: "²",
		3: "³",
		4: "⁴",
		5: "⁵",
		6: "⁶",
		7: "⁷",
		8: "⁸",
		9: "⁹",
		"+": "⁺",
		"-": "⁻",
		a: "ᵃ",
		b: "ᵇ",
		c: "ᶜ",
		d: "ᵈ",
		e: "ᵉ",
		f: "ᶠ",
		g: "ᵍ",
		h: "ʰ",
		i: "ⁱ",
		j: "ʲ",
		k: "ᵏ",
		l: "ˡ",
		m: "ᵐ",
		n: "ⁿ",
		o: "ᵒ",
		p: "ᵖ",
		r: "ʳ",
		s: "ˢ",
		t: "ᵗ",
		u: "ᵘ",
		v: "ᵛ",
		w: "ʷ",
		x: "ˣ",
		y: "ʸ",
		z: "ᶻ",
	};
	return json({
		text: text.split("").map(c => {
			if (c in w) return w[c];
			return "";
		}).join("")
	});
});