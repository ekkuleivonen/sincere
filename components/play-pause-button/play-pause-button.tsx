import styles from "./play-pause-button.module.css";
import { Play, Pause } from "react-feather";

interface CompProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

export default function PlayPauseButton({ isPlaying, togglePlay }: CompProps) {
  if (!isPlaying)
    return (
      <div onClick={togglePlay}>
        <Play color="white" />
      </div>
    );
  return (
    <div onClick={togglePlay}>
      <Pause color="white" />
    </div>
  );
}
