import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest, res: NextApiResponse) {
  res.json({ time: new Date().toLocaleTimeString() });
}