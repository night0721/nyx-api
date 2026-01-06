import { AutoRouter } from "itty-router";
import { router as codm } from "./codm";
import { router as fun } from "./fun";
import { router as discord } from "./discord";
import { router as image } from "./image";

export const router = AutoRouter({ base: "/api/v1" });

router.get("/codm/*", codm.fetch);
router.get("/fun/*", fun.fetch);
router.get("/discord/*", discord.fetch)
router.get("/image/*", image.fetch)