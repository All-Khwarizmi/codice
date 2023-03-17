import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import axios from "axios";
import { env } from "~/env.mjs";

type MiddlewareFnCallbackFn = (result: unknown) => unknown;
type MiddlewareFn = (
  req: NextApiRequest,
  res: NextApiResponse,
  result: MiddlewareFnCallbackFn
) => void;
// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: MiddlewareFn
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of the API logic
  const message = `
  This is this body of the message...
  "env.NEXT_PUBLIC_DISCORD_WEBHOOK_URI"
  `;
  /*   const axiosConfig = {
    method: "POST",
    url: env.NEXT_PUBLIC_DISCORD_WEBHOOK_URI,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      content: message,
    }),
  };

  axios(axiosConfig)
    .then(function (response) {
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    }); */

  const options = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: message,
  };
  const response = await fetch(
    "https://discord.com/api/webhooks/1086239951760392302/N9UWx3EZBX4wDIayBbk9NDXy-MskFMFd4EohsLx4vk4I-Zt_HFXnLHdMiZAJLv3HgjBK",
    options
  );
  const data = await response.json();
  console.log(req.body);
  console.log(response.body);
  console.log(response.body);
  // console.log(req.headers)

  res.json({ msg: "Hello there" });
}
