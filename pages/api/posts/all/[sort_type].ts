import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma-client";

import type { Post, Comment } from "@prisma/client";
import type { PostPlayerPost } from "../../../../components/Post/Post";

type Data = {
  status: string;
  posts?: PostPlayerPost[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //a single post id is allowed and mandatory
  if (!req.query.sort_type || Array.isArray(req.query.sort_type))
    return res.status(400).json({ status: "a sort type is required" });

  console.log("incoming sort");

  try {
    const postsArray = [
      {
        id: "1",
        title: "post 1",
        transcript:
          "kukkuluuruuuuuuu saöjdhlaskjfhöKJFLKJSDAHFLKJshdflkjhsdlkJHLFKJ",
        audio_url:
          "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
        img_url: "https://avatars.githubusercontent.com/u/92802215?v=4",
        comments: [] as Comment[],
        likes: 29,
      },
    ];
    return res.status(201).json({ status: "ok", posts: postsArray });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "could not find the any posts from db",
    });
  }
}
