import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { createCanvas, loadImage } from "canvas";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function saveonlyone(req, res) {
  if (!req.query.image)
    return res
      .status(400)
      .send({ message: "Missing 'Image' Property", error: 400 });
  if (!req.query.image2)
    return res
      .status(400)
      .send({ message: "Missing 'Image' Property", error: 400 });
  if (!req.query.image3)
    return res
      .status(400)
      .send({ message: "Missing 'Image' Property", error: 400 });

  try {
    const bg = await loadImage("public/image/saveonlyone.jpg");
    const img = await loadImage(req.query.image);
    const img2 = await loadImage(req.query.image2);
    const img3 = await loadImage(req.query.image3);
    const canvas = createCanvas(910, 799);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 465, 135, 158, 158);
    ctx.drawImage(img2, 729, 107, 158, 158);
    ctx.drawImage(img3, 170, 478, 104, 104);
    ctx.drawImage(bg, 0, 0, 910, 799);
    res.setHeader("Content-Type", "image/jpg");
    return res.status(200).send(canvas.toBuffer());
  } catch (e) {
    res.status(400).send({ error: e.stack, code: 400 });
    console.log(e);
  }
}
