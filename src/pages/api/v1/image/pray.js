import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { createCanvas, loadImage } from "canvas";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function pray(req, res) {
  if (!req.query.image)
    return res
      .status(400)
      .send({ error: true, message: "Missing 'Image' Property" });
  try {
    const bg = await loadImage("public/image/pray.jpg");
    const img = await loadImage(req.query.image);
    const canvas = createCanvas(396, 275);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 214, 10, 143, 136);
    ctx.drawImage(bg, 0, 0, 396, 275);

    res.setHeader("Content-Type", "image/jpg");
    return res.status(200).send(canvas.toBuffer());
  } catch (e) {
    return res.status(400).send({ error: true, message: e.message });
  }
}
