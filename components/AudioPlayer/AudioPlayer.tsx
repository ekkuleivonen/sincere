import { useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";
import PlayPauseButton from "./PlayPauseButton";

const formWaveSurferOptions = (waveformDiv: HTMLDivElement) => ({
  container: waveformDiv,
  waveColor: "#eee",
  progressColor: "orange",
  cursorColor: "orange",
  barWidth: 1,
  barRadius: 1,
  responsive: true,
  height: 30,
  normalize: true,
  partialRender: true,
});

export default function AudioPlayer({
  audioData,
}: {
  audioData: string | Blob;
}) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  let isFirstRender = useRef<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const createWaves = async () => {
      if (!isFirstRender.current) return;
      isFirstRender.current = false;
      const WaveSurfer = (await import("wavesurfer.js")).default;
      if (waveformRef.current === null) return;
      const options = formWaveSurferOptions(waveformRef.current);

      wavesurfer.current = WaveSurfer.create(options);
      if (audioData === null) return;
      if (typeof audioData === "string") {
        wavesurfer.current.load(audioData);
      } else {
        wavesurfer.current.loadBlob(audioData);
      }
    };

    createWaves();

    return () => {
      wavesurfer?.current?.destroy();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      wavesurfer?.current?.pause();
    } else {
      wavesurfer?.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.audioPlayer}>
      <PlayPauseButton isPlaying={isPlaying} togglePlay={togglePlay} />
      <div id="waveform" ref={waveformRef} className={styles.waveform} />
    </div>
  );
}
