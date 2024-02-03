import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { createCanvas, loadImage } from "canvas";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function busted(req, res) {
  try {
    const query = req.query.image;
    if (!query)
      return res.json({ error: "Missing 'Image' Property", code: 400 });
    const avatar = await loadImage(query);
    let bg = await loadImage("public/image/busted.jpg");
    const canvas = createCanvas(1000, 1000);
    const ctx = canvas.getContext(`2d`);
    ctx.drawImage(avatar, 0, 0, 1000, 1000);
    ctx.drawImage(bg, 0, 0, 1000, 1000);
    res.setHeader("Content-Type", "image/jpg");
    res.status(200).send(canvas.toBuffer());
  } catch (e) {
    res.status(400).send({ error: e.stack, code: 400 });
    console.log(e);
  }
}
