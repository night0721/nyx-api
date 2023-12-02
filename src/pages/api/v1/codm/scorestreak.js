import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import scorestreaks from "../../../../../db/codm/scorestreaks.json";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default function scorestreak(req, res) {
  const name = req.query.name;
  const auth = req.headers.authorization;
  if (auth !== process.env.auth || !auth)
    return res.status(401).send({ error: "Unauthorized", code: 401 });
  else {
    const obj = scorestreaks.find(p => p.value == name.toLowerCase());
    if (!obj)
      return res.status(404).send({ error: "Unknown Scorestreak", code: 404 });
    res.status(200).send(obj);
  }
}
