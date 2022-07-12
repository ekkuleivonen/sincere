import styles from "./Stages.module.css";
import type { Dispatch, SetStateAction } from "react";

interface Stage3Props {
  setStage: Dispatch<SetStateAction<number>>;
  stopRecording: () => Promise<Blob[]>;
  stopRecognition: () => boolean;
}

export default function Stage3({
  setStage,
  stopRecording,
  stopRecognition,
}: Stage3Props) {
  //
  const moveToStage4 = async () => {
    await stopRecording();
    stopRecognition();
    setStage(4);
  };

  return (
    <div>
      <div className={styles.stage1}>
        <h1>Stop whenever youre ready.</h1>
        <h2 onClick={moveToStage4}>STOP</h2>
      </div>
    </div>
  );
}
