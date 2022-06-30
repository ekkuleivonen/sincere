import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../prisma-client";
import type { Post, Comment } from "@prisma/client";

type Data = {
  status: string;
  post_data?: Post;
  comment_data?: Comment[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //a single post id is allowed and mandatory
  if (!req.query.post_id || Array.isArray(req.query.post_id))
    return res.status(400).json({ status: "a post id is required" });

  try {
    //find the post data
    const post_data = await prisma.post.findUnique({
      where: { id: req.query.post_id },
    });
    //find the comments for the post
    const comment_data = await prisma.comment.findMany({
      where: { post_id: req.query.post_id },
    });
    //if no post is found with this id, its not a valid post id
    if (!post_data) return res.status(404).json({ status: "post not found" });

    //send the postdata to the client
    return res.status(201).json({ status: "ok", post_data, comment_data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "could not find the post from db",
    });
  }
}
