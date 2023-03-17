import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import axios from "axios";
import { env } from "~/env.mjs";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import format from "date-fns/format";
import ctx

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
  const memoOfTheDay = await ctx.prisma.memoDate.findMany({
      where: {
        next: format(Date.now(), "dd MMMM yyyy"),
      },
    }
    )
    return 
  })  
  console.log(memoOfTheDay)
  const message = `
  This is this body of the message...
    You should study the following topics :
    
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
    body: JSON.stringify({"content": message}),
  };
  const response = await fetch(env.NEXT_PUBLIC_DISCORD_WEBHOOK_URI, options);
  
  console.log(response.ok);
  console.log(response.body);
  console.log(req.body);
  // console.log(req.headers)

  res.json({ msg: "Hello there" });
}
