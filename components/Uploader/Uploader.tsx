import styles from "./Uploader.module.css";
import { useState, useEffect } from "react";
import useAudioRecording from "../../hooks/useAudioRecording";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";

import type { PostPlayerPost } from "../Post/Post";

type uploadablePost = {
  title?: string;
  transcript?: string;
  audio_blob?: Blob;
  img_data?: string | Blob;
};

interface CompProps {
  setShowUploadModal: (setShowUploadModal: boolean) => void;
}

export default function UploadModal({ setShowUploadModal }: CompProps) {
  const [stage, setStage] = useState<number>(1);

  const myRecorder = useAudioRecording();
  const recognition = useSpeechRecognition();

  const truncateText = (text: string, length: number): string => {
    if (text.length <= length) {
      return text;
    }
    return text.substring(0, length) + "\u2026";
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const modalBg = document.getElementById("modalBg");
    if (e.target !== modalBg) return;
    setShowUploadModal(false);
    setStage(1);
  };

  return (
    <div className={styles.modalBg} id={"modalBg"} onClick={closeModal}>
      <div className={styles.modal}>
        {stage === 1 && (
          <Stage1
            setStage={setStage}
            prepareRecorder={myRecorder.setupRecorder}
          />
        )}
        {stage === 2 && (
          <Stage2
            setStage={setStage}
            startRecording={myRecorder.startRecording}
            startRecognition={recognition.startRecognition}
          />
        )}
        {stage === 3 && (
          <Stage3
            setStage={setStage}
            stopRecording={myRecorder.stopRecording}
            stopRecognition={recognition.stopRecognition}
          />
        )}
        {stage === 4 && (
          <Stage4
            setStage={setStage}
            getAudioData={myRecorder.getMp3}
            getTranscript={recognition.getTranscript}
          />
        )}
      </div>
    </div>
  );
}
