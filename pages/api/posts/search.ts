import type { NextApiRequest, NextApiResponse } from "next";
import type { Post, User } from "@prisma/client";
import prisma from "../prisma-client";

type Data = {
  status: string;
  data?: ((Post | { id: string; username: string }) | User)[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //only post method is allowed
  if (req.method !== "POST")
    return res.status(405).json({ status: "Method not allowed" });

  //get the search value (string) which has to be in the body
  const { search_value } = req.body;
  if (!search_value) return res.status(400).json({ status: "Bad request" });
  if (typeof search_value !== "string")
    return res.status(400).json({ status: "Bad request" });

  const data = await findResults(search_value);
  return res.status(201).json({ status: "OK", data });
}

const findResults = async (search_value: string) => {
  //find the first five users with the search value in their name, leave out the password_hash and email
  const users = await prisma.user.findMany({
    where: {
      OR: [{ username: { contains: search_value } }],
    },
    select: {
      id: true,
      username: true,
      email: false,
      password_hash: false,
    },
    take: 5,
  });

  //find the first five posts with the search value in their title
  const posts = await prisma.post.findMany({
    where: {
      OR: [{ title: { contains: search_value } }],
    },
    take: 5,
  });
  //return the results in an array
  return [...users, ...posts];
};
