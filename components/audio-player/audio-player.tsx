import { useEffect, useRef, useState } from "react";
import styles from "./audio-player.module.css";
import PlayPauseButton from "../play-pause-button/play-pause-button";

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

export default function AudioPlayer() {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  let isFirstRender = useRef<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const url =
    "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3";

  useEffect(() => {
    const createWaves = async () => {
      if (!isFirstRender.current) return;
      isFirstRender.current = false;
      const WaveSurfer = (await import("wavesurfer.js")).default;
      if (waveformRef.current === null) return;
      const options = formWaveSurferOptions(waveformRef.current);

      wavesurfer.current = WaveSurfer.create(options);

      wavesurfer.current.load(url);
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
