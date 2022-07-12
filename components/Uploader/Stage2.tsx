import styles from "./Stages.module.css";
import type { Dispatch, SetStateAction } from "react";

interface Stage2Props {
  setStage: Dispatch<SetStateAction<number>>;
  startRecording: () => Promise<boolean>;
  startRecognition: () => boolean;
}

export default function Stage2({
  setStage,
  startRecording,
  startRecognition,
}: Stage2Props) {
  //
  const moveToStage3 = async () => {
    await startRecording();
    startRecognition();
    setStage(3);
  };

  return (
    <div>
      <div className={styles.stage1}>
        <h1>You have only one shot. Make it count.</h1>
        <h2 onClick={moveToStage3}>RECORD</h2>
      </div>
    </div>
  );
}
