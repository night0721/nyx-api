import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { createCanvas, loadImage } from "canvas";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function alone(req, res) {
  try {
    const query = req.query.image;
    if (!query)
      return res.json({ error: "Missing 'Image' Property", code: 400 });
    const avatar = await loadImage(query);
    const canvas = createCanvas(1100, 892);
    const ctx = canvas.getContext("2d");
    const background = await loadImage("public/image/alone.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatar, 480, 350, 205, 205);
    res.setHeader("Content-Type", "image/jpg");
    res.status(200).send(canvas.toBuffer());
  } catch (e) {
    res.status(400).send({ error: e.stack, code: 400 });
    console.log(e);
  }
}
