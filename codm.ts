import { AutoRouter, error, json } from "itty-router";
import { readFileSync } from "fs";

import builds from "./db/codm/builds.json";
import melees from "./db/codm/melees.json";
import perks from "./db/codm/perks.json";
import scorestreaks from "./db/codm/scorestreaks.json";

export const router = AutoRouter({ base: "/api/v1/codm" });

router.get("/build", request => {
	const cwts = request.query.cwts;
	const cc: string = request.query.cc as string;
	const tag: string = request.query.tag as string;
	const auth = request.headers.get("Authorization")?.split(" ")[1];
	if (auth !== process.env.auth || !auth) {
		return error(401, "Unauthorized");
	} else {
		const obj = builds.find(
			p =>
				p.cwts == cwts &&
				p.author.toLowerCase() == cc.toLowerCase() &&
				p.tags.map((x: string) => x.toLowerCase()).includes(tag.toLowerCase())
		);
		if (!obj) return error(404, "Build Not Found");
		return json(obj);
	}
});

router.get("/melee", request => {
	const name = request.query.name as string;
	const auth = request.headers.get("Authorization")?.split(" ")[1];
	if (auth !== process.env.auth || !auth) {
		return error(401, "Unauthorized");
	} else {
		const obj = melees.find(
			(p: { value: string; }) =>
				p.value.toLowerCase() == name.toLowerCase()
		);
		if (!obj) return error(404, "Unknown Melee");
		return json(obj);
	}
});

router.get("/perk", request => {
	const name = request.query.name as string;
	const auth = request.headers.get("Authorization")?.split(" ")[1];
	if (auth !== process.env.auth || !auth) {
		return error(401, "Unauthorized");
	} else {
		const obj = perks.find(
			(p: { value: string; }) =>
				p.value.toLowerCase() == name.toLowerCase()
		);
		if (!obj) return error(404, "Unknown Perk");
		return json(obj);
	}
});

router.get("/scorestreak", request => {
	const name = request.query.name as string;
	const auth = request.headers.get("Authorization")?.split(" ")[1];
	if (auth !== process.env.auth || !auth) {
		return error(401, "Unauthorized");
	} else {
		const obj = scorestreaks.find(
			(p: { value: string; }) =>
				p.value.toLowerCase() == name.toLowerCase()
		);
		if (!obj) return error(404, "Unknown Scorestreak");
		return json(obj);
	}
});
