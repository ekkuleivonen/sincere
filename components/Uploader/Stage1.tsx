import styles from "./Stages.module.css";
import type { Dispatch, SetStateAction } from "react";

interface Stage1Props {
  setStage: Dispatch<SetStateAction<number>>;
  prepareRecorder: () => Promise<MediaRecorder>;
}

export default function Stage1({ setStage, prepareRecorder }: Stage1Props) {
  //
  const moveToStage2 = async () => {
    await prepareRecorder();
    setStage(2);
  };

  return (
    <div>
      <div className={styles.stage1}>
        <h1>
          Sincere will use your computer's microphone to record the audio.
        </h1>
        <h2 onClick={moveToStage2}>OK</h2>
      </div>
    </div>
  );
}
