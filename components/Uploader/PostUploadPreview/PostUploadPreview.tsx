import Image from "next/future/image";
import { useState, useEffect } from "react";
import styles from "./PostUploadPreview.module.css";
import { limitTextLength } from "../../../utils/stringManipulation";
import AudioPlayer from "../../AudioPlayer/AudioPlayer";

import type { Dispatch, SetStateAction } from "react";

export type previewData = {
  title: string;
  transcript: string;
  audio_data: Blob;
  img_url: string;
};

interface PostUploadPreviewProps {
  setPostData: Dispatch<SetStateAction<previewData | null>>;
  previewData: previewData;
  setImgFile: Dispatch<SetStateAction<File | null>>;
}

export default function PostUploadPreview({
  setPostData,
  setImgFile,
  previewData,
}: PostUploadPreviewProps) {
  //

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "title") {
      setPostData({
        ...previewData,
        title: limitTextLength(e.target.value, 30),
      });
    } else {
      setPostData({
        ...previewData,
        transcript: e.target.value,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const previewImg = document.getElementById(
      "previewImg"
    ) as HTMLImageElement;
    if (e.target.files && previewImg) {
      setImgFile(e.target.files[0]);
      previewImg.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className={styles.fileInput}>
        <input type="file" onChange={handleFileChange} />
        <img
          src={previewData.img_url}
          alt="thumbnail"
          width={150}
          id="previewImg"
        />
      </div>
      <div className={styles.editables}>
        <input
          name="title"
          id="titleInput"
          type="text"
          value={previewData.title}
          className={styles.titleInput}
          onChange={handleTextChange}
        />
        <textarea
          name="transcript"
          id="transcriptInput"
          value={previewData.transcript}
          className={styles.transcriptInput}
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
}
