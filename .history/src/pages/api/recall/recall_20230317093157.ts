import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";


export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
