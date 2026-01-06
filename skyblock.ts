import { AutoRouter, error, json } from "itty-router";

import { getItemNetworth } from "skyhelper-networth";
import nbt from "prismarine-nbt";
import { promisify } from "util";

const parseNbt = promisify(nbt.parse);


export const router = AutoRouter({ base: "/api/v1/skyblock" });

async function decodeData(buffer: string) {
	const parsedNbt = await parseNbt(Buffer.from(buffer, "base64"));
	return nbt.simplify(parsedNbt);
}

router.post("/skyblock", async request => {
	if (!request.body) return error(400, "No body was provided");
	if (typeof request.body !== "string") return error(400, "ByteData is not a string");
	try {
		const data = await getItemNetworth((await decodeData(request.body)).i[0], {
			cache: true,
		});
		return json(data);
	} catch {
		return error(400, "Invalid ByteData");
	}
})