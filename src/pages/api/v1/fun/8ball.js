import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default function random8ball(req, res) {
  const answers = [
    "Maybe.",
    "Certainly not.",
    "I hope so.",
    "Not in your wildest dreams.",
    "There is a good chance.",
    "Quite likely.",
    "I think so.",
    "I hope not.",
    "I hope so.",
    "Never!",
    "Fuhgeddaboudit.",
    "Ahaha! Really?!?",
    "Pfft.",
    "Sorry, bucko.",
    "Hell, yes.",
    "Hell to the no.",
    "The future is bleak.",
    "The future is uncertain.",
    "I would rather not say.",
    "Who cares?",
    "Possibly.",
    "Never, ever, ever.",
    "There is a small chance.",
    "Yes!",
  ];
  const answered = answers[Math.floor(Math.random() * answers.length)];
  res.status(200).send({ answer: answered });
}
