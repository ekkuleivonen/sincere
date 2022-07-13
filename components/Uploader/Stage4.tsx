import styles from "./Stages.module.css";
import { useState, useEffect } from "react";
import { limitTextLength } from "../../utils/stringManipulation";
import PostUploadPreview from "./PostUploadPreview/PostUploadPreview";

import type { Dispatch, SetStateAction } from "react";

interface Stage4Props {
  setStage: Dispatch<SetStateAction<number>>;
  getAudioData: () => Blob;
  getTranscript: () => string;
}

import type { previewData } from "./PostUploadPreview/PostUploadPreview";

export default function Stage4({
  setStage,
  getAudioData,
  getTranscript,
}: Stage4Props) {
  //
  const [postData, setPostData] = useState<previewData | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  //
  useEffect(() => {
    setPostData({
      title: limitTextLength(getTranscript(), 50),
      transcript: getTranscript(),
      audio_data: getAudioData(),
      img_url:
        "https://reactnative-examples.com/wp-content/uploads/2022/02/default-loading-image.png",
    });
    console.log(getTranscript());
  }, []);
  //
  const uploadPost = () => {
    console.log("done", postData, imgFile);
  };

  return (
    <div>
      <div className={styles.stage1}>
        <h1>Preview</h1>
        {postData && (
          <PostUploadPreview
            setPostData={setPostData}
            previewData={postData}
            setImgFile={setImgFile}
          />
        )}
        <h2 onClick={uploadPost}>UPLOAD</h2>
      </div>
    </div>
  );
}
