import { useTranslation } from "react-i18next";
import "../../styles/buttons.css";

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export default function TimerControls({ isRunning, onStart, onStop, onReset }: TimerControlsProps) {
  const { t } = useTranslation("timer");

  return (
    <div className="timer-controls">
      {isRunning ? (
        <button id="stop-btn" className="timer-button" onClick={onStop} type="button">
          <img src="/images/stop.png" alt="" />
          {t("stop")}
        </button>
      ) : (
        <button id="start-btn" className="timer-button" onClick={onStart} type="button">
          <img src="/images/start.png" alt="" />
          {t("start")}
        </button>
      )}
      <button id="reset-btn" className="timer-button" onClick={onReset} type="button">
        <img src="/images/reset.png" alt="" />
        {t("reset")}
      </button>
    </div>
  );
}
