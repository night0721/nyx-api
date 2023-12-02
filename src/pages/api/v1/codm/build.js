import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import builds from "../../../../../db/codm/builds.json";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default function melee(req, res) {
  const cwts = req.query.cwts;
  const cc = req.query.cc;
  const tag = req.query.tag;
  const auth = req.headers.authorization;
  if (auth !== process.env.auth || !auth)
    return res.status(401).send({ error: "Unauthorized", code: 401 });
  else {
    const obj = builds.find(
      p =>
        p.cwts == cwts &&
        p.author.toLowerCase() == cc.toLowerCase() &&
        p.tags.map(x => x.toLowerCase()).includes(tag.toLowerCase())
    );
    if (!obj)
      return res.status(404).send({ error: "Build Not Found", code: 404 });
    res.status(200).send(obj);
  }
}
