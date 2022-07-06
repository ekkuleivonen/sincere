import styles from "./upload.module.css";
import { useState } from "react";
import useAudioRecording from "../../hooks/useAudioRecording";

interface CompProps {
  setShowUploadModal: (setShowUploadModal: boolean) => void;
}

export default function UploadModal({ setShowUploadModal }: CompProps) {
  const [stage, setStage] = useState<number>(1);
  const myRecorder = useAudioRecording();

  const moveToNextStage = async () => {
    switch (stage) {
      case 1:
        await myRecorder.setupRecorder();
        setStage(2);
        break;
      case 2:
        await myRecorder.startRecording();
        setStage(3);
        break;
      case 3:
        await myRecorder.stopRecording();
        setStage(4);
        break;
      case 4:
        console.log(myRecorder.getMp3());
        break;
    }
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const modalBg = document.getElementById("modalBg");
    if (e.target !== modalBg) return;
    setShowUploadModal(false);
  };

  return (
    <div className={styles.modalBg} id={"modalBg"} onClick={closeModal}>
      <div className={styles.modal}>
        <UploaderStages moveToNextStage={moveToNextStage} stage={stage} />
      </div>
    </div>
  );
}

interface StageProps {
  moveToNextStage: () => Promise<void>;
  stage: number;
}

function UploaderStages({ moveToNextStage, stage }: StageProps) {
  if (stage === 1) {
    return (
      <div className={styles.modalContent}>
        <h1>Sincere will use your microphone to record the audio.</h1>
        <h1
          style={{ color: "orange", cursor: "pointer" }}
          onClick={() => moveToNextStage()}
        >
          OK
        </h1>
      </div>
    );
  }
  if (stage === 2) {
    return (
      <div className={styles.modalContent}>
        <h1>You only get one shot. Make it count.</h1>
        <h1
          style={{ color: "orange", cursor: "pointer" }}
          onClick={() => moveToNextStage()}
        >
          RECORD
        </h1>
      </div>
    );
  }
  if (stage === 3) {
    return (
      <div className={styles.modalContent}>
        <h1>You are recording</h1>
        <h1
          style={{ color: "orange", cursor: "pointer" }}
          onClick={() => moveToNextStage()}
        >
          STOP
        </h1>
      </div>
    );
  }
  if (stage === 4) {
    return (
      <div className={styles.modalContent}>
        <h1>Recording finished</h1>
        <h1
          style={{ color: "orange", cursor: "pointer" }}
          onClick={() => moveToNextStage()}
        >
          Log raw data
        </h1>
      </div>
    );
  }
  return null;
}
