import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import perks from "../../../../../db/codm/perks.json";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default function perk(req, res) {
  const name = req.query.name;
  const auth = req.headers.authorization;
  if (auth !== process.env.auth || !auth)
    return res.status(401).send({ error: "Unauthorized", code: 401 });
  else {
    const obj = perks.find(p => p.name == name);
    if (!obj) return res.status(404).send({ error: "Unknown Perk", code: 404 });
    res.status(200).send(obj);
  }
}
