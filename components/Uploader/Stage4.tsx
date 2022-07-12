import styles from "./Stages.module.css";
import { useState, useEffect } from "react";
import PostUploadPreview from "./PostUploadPreview/PostUploadPreview";

import type { Dispatch, SetStateAction } from "react";

interface Stage4Props {
  setStage: Dispatch<SetStateAction<number>>;
}

import type { previewData } from "./PostUploadPreview/PostUploadPreview";

export default function Stage4({ setStage }: Stage4Props) {
  const [postData, setPostData] = useState<previewData>({} as previewData);
  //
  const moveToStage5 = () => {
    console.log("done");
  };

  return (
    <div>
      <div className={styles.stage1}>
        <h1>Preview</h1>
        <PostUploadPreview setPostData={setPostData} />
        <h2 onClick={moveToStage5}>UPLOAD</h2>
      </div>
    </div>
  );
}
