import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default function doublestruck(req, res) {
  const texts = req.query.text;
  if (!texts) return res.status(400).send({ error: "Missing Text", code: 400 });
  var w = {
    " ": " ",
    0: "𝟘",
    1: "𝟙",
    2: "𝟚",
    3: "𝟛",
    4: "𝟜",
    5: "𝟝",
    6: "𝟞",
    7: "𝟟",
    8: "𝟠",
    9: "𝟡",
    "+": "+",
    "-": "-",
    a: "𝕒",
    b: "𝕓",
    c: "𝕔",
    d: "𝕕",
    e: "𝕖",
    f: "𝕗",
    g: "𝕘",
    h: "𝕙",
    i: "𝕚",
    j: "𝕛",
    k: "𝕜",
    l: "𝕝",
    m: "𝕞",
    n: "𝕠",
    o: "𝕡",
    p: "𝕢",
    r: "𝕣",
    s: "𝕤",
    t: "𝕥",
    u: "𝕦",
    v: "𝕧",
    w: "𝕨",
    x: "𝕩",
    y: "𝕪",
    z: "𝕫",
  };

  function toDoubleStruck(x) {
    return x
      .split("")
      .map(c => {
        if (c in w) return w[c];
        return "";
      })
      .join("");
  }
  res.status(200).send({ text: toDoubleStruck(texts) });
}
