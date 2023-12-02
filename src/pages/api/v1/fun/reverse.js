import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default function reverse(req, res) {
  const texts = req.query.text;
  if (!texts) return res.status(400).send({ error: "Missing Text", code: 400 });
  const reversed = texts.split("").reverse().join("");
  res.status(200).send({ text: reversed });
}
