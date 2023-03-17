import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";


export default function 
public get value() : string {
    return 
}
(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
}
