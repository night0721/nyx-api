import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import { createCanvas, loadImage } from "canvas";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function robert(req, res) {
  if (!req.query.image)
    return res
      .status(400)
      .send({ error: true, message: "Missing 'Image' Property" });
  try {
    const bg = await loadImage("public/image/robert.jpg");
    const glasses = await loadImage("public/image/glasses.jpg");
    const img = await loadImage(req.query.image);
    const canvas = createCanvas(295, 406);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 50, 115, 53, 53);
    ctx.drawImage(img, 218, 115, 53, 53);
    ctx.drawImage(glasses, 62, 130, 36, 19);
    ctx.drawImage(bg, 0, 0, 295, 406);

    res.setHeader("Content-Type", "image/jpg");
    return res.status(200).send(canvas.toBuffer());
  } catch (e) {
    return res.status(400).send({ error: true, message: e.message });
  }
}
