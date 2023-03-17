import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import axios from 'axios'

type MiddlewareFnCallbackFn = (result: unknown) => unknown
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

/*   axios
    .post(
      "https://discord.com/api/webhooks/1086192170089840761/G8hhoI7PcuuLh0_OpjrnWiL0E33fxZDtPHky20VdntZPjl7heCYdAJpXsmJBZZgN4cQ4",
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    )
    .then(function (response) {
      console.log(response.status);
    })
    .catch(function (error) {
      console.log("error");
    })
    .finally(function () {
      // always executed
    });
 */
const response = await fetch(
  "https://discord.com/api/webhooks/1086192170089840761/G8hhoI7PcuuLh0_OpjrnWiL0E33fxZDtPHky20VdntZPjl7heCYdAJpXsmJBZZgN4cQ4",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.({
      "content": "Hey ya"
    }),
  }
);
const data = await response.json()
console.log(response.status)
console.log(req.body)
console.log(req.headers)

  res.json({msg: 'hello wordl'});
}
