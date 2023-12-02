import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default function fractur(req, res) {
  const texts = req.query.text;
  if (!texts) return res.status(400).send({ error: "Missing Text", code: 400 });
  var w = {
    " ": " ",
    0: "օ",
    1: "յ",
    2: "շ",
    3: "Յ",
    4: "կ",
    5: "Տ",
    6: "ճ",
    7: "Դ",
    8: "Ց",
    9: "գ",
    "+": "+",
    "-": "-",
    a: "𝖆",
    b: "𝖇",
    c: "𝖈",
    d: "𝖉",
    e: "𝖊",
    f: "𝖋",
    g: "𝖌",
    h: "𝖍",
    i: "𝖎",
    j: "𝖏",
    k: "𝖐",
    l: "𝖑",
    m: "𝖒",
    n: "𝖔",
    o: "𝖕",
    p: "𝖖",
    r: "𝖗",
    s: "𝖘",
    t: "𝖙",
    u: "𝖚",
    v: "𝖛",
    w: "𝖜",
    x: "𝖝",
    y: "𝖞",
    z: "𝖟",
  };

  function tofractur(x) {
    return x
      .split("")
      .map(c => {
        if (c in w) return w[c];
        return "";
      })
      .join("");
  }
  res.status(200).send({ text: tofractur(texts) });
}
