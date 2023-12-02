import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { createCanvas, loadImage } from "canvas";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function pressplay(req, res) {
  if (!req.query.image)
    return res
      .status(400)
      .send({ error: true, message: "Missing 'Image' Property" });
  try {
    const bg = await loadImage("public/image/pressplay.jpg");
    const img = await loadImage(req.query.image);
    const canvas = createCanvas(474, 474);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 218, 208, 228, 228);
    ctx.drawImage(bg, 0, 0, 474, 474);

    res.setHeader("Content-Type", "image/jpg");
    return res.status(200).send(canvas.toBuffer());
  } catch (e) {
    return res.status(400).send({ error: true, message: e.message });
  }
}
