import React from "react";
import styles from "./PostUploadPreview.module.css";

import type { Dispatch, SetStateAction } from "react";

export type previewData = {
  title: string;
  transcript: string;
  audio_data: Blob;
  img_data: string | Blob;
};

interface PostUploadPreviewProps {
  setPostData: Dispatch<SetStateAction<previewData>>;
}

export default function PostUploadPreview({
  setPostData,
}: PostUploadPreviewProps) {
  return <div>PostUploadPreview</div>;
}
