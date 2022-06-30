import type { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcrypt");
import prisma from "../prisma-client";

type Data = {
  username?: string;
  email?: string;
  password?: string | null;
  password_hash?: string | null;
  user_id?: string;
  status?: string;
};

const checkUniqueEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user === null) return true;
  if (user) {
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //disallow non-POST requests
  if (req.method !== "POST")
    return res.status(405).json({ status: "method not allowed" });

  //save user input from request body
  const userInput: Data = req.body;

  //must include username, email and password
  if (!userInput.username || !userInput.email || !userInput.password)
    return res.status(400).json({ status: "missing input" });

  //check that email is unique
  const emailIsUnique = await checkUniqueEmail(userInput.email);
  if (!emailIsUnique)
    return res.status(400).json({ status: "email already exists" });

  //hash password
  const hashedPassword = await bcrypt.hash(userInput.password, 12);

  //create user in db
  const createdUser = await prisma.user.create({
    data: {
      username: userInput.username,
      email: userInput.email,
      password_hash: hashedPassword,
    },
  });

  //send a response with the user data and status without the password
  res.status(201).json({
    ...createdUser,
    password_hash: null,
    password: null,
    status: "success",
  });
}
