import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { createCanvas, loadImage } from "canvas";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function rifleshoot(req, res) {
  if (!req.query.image)
    return res
      .status(400)
      .send({ error: true, message: "Missing 'Image' Property" });
  try {
    const bg = await loadImage("public/image/rifleshoot.jpg");
    const img = await loadImage(req.query.image);
    const canvas = createCanvas(318, 299);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 55, 28, 118, 118);
    ctx.drawImage(bg, 0, 0, 318, 299);

    res.setHeader("Content-Type", "image/jpg");
    return res.status(200).send(canvas.toBuffer());
  } catch (e) {
    return res.status(400).send({ error: true, message: e.message });
  }
}
