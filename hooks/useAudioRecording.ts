import { useState, useEffect } from "react";
import useSpeechRecognition from "./useSpeechRecognition";

interface Hookmethods {
  setupRecorder: () => Promise<MediaRecorder>;
  startRecording: () => Promise<boolean>;
  stopRecording: () => Promise<boolean>;
  getMp3: () => Blob;
}

export default function useAudioRecording(): Hookmethods {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [mp3Data, setMp3Data] = useState<Blob | null>(null);
  let audioChunks: Blob[] = [];

  const recognition = useSpeechRecognition();

  useEffect(() => {
    if (recorder) {
      recorder.addEventListener("dataavailable", (e) => {
        audioChunks.push(e.data);
      });
      recorder.addEventListener("stop", () => {
        const blob = new Blob(audioChunks, { type: "audio/mp3" });
        setMp3Data(blob);
      });
    }

    return () => {
      if (recorder) {
        recorder.removeEventListener("dataavailable", (e) => {
          audioChunks.push(e.data);
        });
        recorder.removeEventListener("stop", () => {
          const blob = new Blob(audioChunks, { type: "audio/mp3" });
          setMp3Data(blob);
        });
      }
    };
  }, [recorder]);

  const setupStream = async () => {
    if (stream !== null && stream !== undefined) return stream;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const foundStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setStream(foundStream);
      return foundStream;
    } else throw new Error("getUserMedia not supported");
  };

  const setupRecorder = async () => {
    if (recorder !== null && recorder !== undefined) return recorder;
    let currentStream = stream;
    if (currentStream === null || currentStream === undefined) {
      currentStream = await setupStream();
    }
    const newMediaRecorder = new MediaRecorder(currentStream);
    setRecorder(newMediaRecorder);
    return newMediaRecorder;
  };

  const startRecording = async () => {
    const currentRecorder = await setupRecorder();
    if (!currentRecorder) throw new Error("no recorder available");
    recognition.startRecognition();
    currentRecorder.start(1000);
    return true;
  };

  const stopRecording = async () => {
    if (
      recorder === null ||
      recorder === undefined ||
      recorder.state !== "recording"
    )
      throw new Error("no active recorder available");

    recorder.stop();
    recognition.stopRecognition();
    return true;
  };

  const getMp3 = () => {
    if (mp3Data === null || mp3Data === undefined)
      throw new Error("no audio data available");
    console.log(recognition.getTranscript());
    return mp3Data;
  };

  const methodsToReturn = {
    setupRecorder,
    startRecording,
    stopRecording,
    getMp3,
  };

  return methodsToReturn;
}
