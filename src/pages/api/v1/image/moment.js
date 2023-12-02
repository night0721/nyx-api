import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { createCanvas, loadImage } from "canvas";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function moment(req, res) {
  try {
    const query = req.query.image;
    if (!query)
      return res.json({ error: "Missing 'Image' Property", code: 400 });
    const canvas = createCanvas(500, 670);
    const ctx = canvas.getContext("2d");
    const background = await loadImage("public/image/moment.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await loadImage(query);
    ctx.drawImage(avatar, 150, 100, 205, 205);
    res.setHeader("Content-Type", "image/jpg");
    res.status(200).send(canvas.toBuffer());
  } catch (e) {
    res.status(400).send({ error: e.stack, code: 400 });
    console.log(e);
  }
}
