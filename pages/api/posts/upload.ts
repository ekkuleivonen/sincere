import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../prisma-client";

type Data = {
  status: string;
  post?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //only post method is allowed
  if (req.method !== "POST")
    return res.status(405).json({ status: "Method not allowed" });

  //get the post data from the request body
  const { post } = req.body;
  console.log("incoming post", post);

  return res.status(201).json({ status: "OK", post });
}
