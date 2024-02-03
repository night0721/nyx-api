import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { createCanvas, loadImage } from "canvas";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function vr(req, res) {
  if (!req.query.image)
    return res
      .status(400)
      .send({ error: true, message: "Missing 'Image' Property" });
  try {
    const bg = await loadImage("public/image/vr.jpg");
    const img = await loadImage(req.query.image);
    const canvas = createCanvas(780, 768);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 46, 409, 305, 305);
    ctx.drawImage(bg, 0, 0, 780, 768);

    res.setHeader("Content-Type", "image/jpg");
    return res.status(200).send(canvas.toBuffer());
  } catch (e) {
    return res.status(400).send({ error: true, message: e.message });
  }
}
