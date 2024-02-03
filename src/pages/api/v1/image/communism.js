import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { createCanvas, loadImage } from "canvas";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function communism(req, res) {
  try {
    const query = req.query.image;
    if (!query)
      return res.json({ error: "Missing 'Image' Property", code: 400 });
    const baseAvatar = await loadImage(query);
    const overlayAvatar = await loadImage("public/image/communism.jpg");
    const canvas = createCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");
    ctx.globalAlpha = 0.3;
    ctx.drawImage(baseAvatar, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(overlayAvatar, 0, 0, 1024, 1024);
    res.setHeader("Content-Type", "image/jpg");
    res.status(200).send(canvas.toBuffer());
  } catch (e) {
    res.status(400).send({ error: e.stack, code: 400 });
    console.log(e);
  }
}
