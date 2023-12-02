import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default function superscript(req, res) {
  const texts = req.query.text;
  if (!texts) return res.status(400).send({ error: "Missing Text", code: 400 });
  var w = {
    " ": " ",
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
    "+": "⁺",
    "-": "⁻",
    a: "ᵃ",
    b: "ᵇ",
    c: "ᶜ",
    d: "ᵈ",
    e: "ᵉ",
    f: "ᶠ",
    g: "ᵍ",
    h: "ʰ",
    i: "ⁱ",
    j: "ʲ",
    k: "ᵏ",
    l: "ˡ",
    m: "ᵐ",
    n: "ⁿ",
    o: "ᵒ",
    p: "ᵖ",
    r: "ʳ",
    s: "ˢ",
    t: "ᵗ",
    u: "ᵘ",
    v: "ᵛ",
    w: "ʷ",
    x: "ˣ",
    y: "ʸ",
    z: "ᶻ",
  };

  function toSuperScript(x) {
    return x
      .split("")
      .map(c => {
        if (c in w) return w[c];
        return "";
      })
      .join("");
  }
  res.status(200).send({ text: toSuperScript(texts) });
}
