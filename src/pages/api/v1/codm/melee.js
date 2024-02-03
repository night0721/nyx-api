import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import melees from "../../../../../db/codm/melees.json";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default function melee(req, res) {
  const name = req.query.name;
  const auth = req.headers.authorization;
  if (auth !== process.env.auth || !auth)
    return res.status(401).send({ error: "Unauthorized", code: 401 });
  else {
    const obj = melees.find(p => p.value == name.toLowerCase());
    if (!obj)
      return res.status(404).send({ error: "Unknown Melee", code: 404 });
    res.status(200).send(obj);
  }
}
