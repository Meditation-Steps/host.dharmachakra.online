import { useEffect, useState } from "react";
import { useTimer } from "@/hooks/useTimer.ts";
import { playNotificationSound } from "@/utils/audio.ts";
import { formatTime } from "@/utils/formatTime.ts";
import TimerControls from "./TimerControls";
import TimerOverlay from "./TimerOverlay";
import "./Timer.css";
import { useSearchParams } from "react-router-dom";
import { secondsInMinute } from "@/constants/time.ts";
import { getNumberParam } from "@/utils/route.ts";
import { useTranslation } from "react-i18next";

interface MeditationTimerProps {
  durationMinutes?: number;
}

const CONTROLS_HIDE_DELAY = 3000;

export default function MeditationTimer({ durationMinutes = 30 }: MeditationTimerProps) {
  const { t } = useTranslation("validation");
  const [searchParams] = useSearchParams();

  const givenDurationTime = getNumberParam(
      searchParams.get("f")
  ) || durationMinutes * secondsInMinute;
  const givenRemainingTime = getNumberParam(searchParams.get("t")) || 0;
  const hasInvalidParams = givenDurationTime < givenRemainingTime;

  const [showControls, setShowControls] = useState(true);

  const { remainingTime, isRunning, progress, start, stop, reset } = useTimer({
    durationSeconds: givenDurationTime,
    givenRemainingTime: givenRemainingTime,
    onComplete: playNotificationSound,
  });

  useEffect(() => {
    if (hasInvalidParams) {
      alert(t("givenDurationAndRemainingTime"));
    }
  }, [hasInvalidParams, t]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const hideControls = () => setShowControls(false);

    const handleUserActivity = () => {
      setShowControls(true);

      clearTimeout(timeoutId);

      timeoutId = setTimeout(hideControls, CONTROLS_HIDE_DELAY);
    };

    window.addEventListener("mousemove", handleUserActivity, { passive: true });
    window.addEventListener("touchstart", handleUserActivity, { passive: true });

    // Initial timeout
    timeoutId = setTimeout(hideControls, CONTROLS_HIDE_DELAY);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <TimerOverlay progress={progress} />

      <footer className="timer-footer">
        <h1 className="timer-display">{formatTime(remainingTime)}</h1>
        <div className={showControls ? "timer-controls-fade" : "timer-controls-fade is-hidden"}>
          <TimerControls isRunning={isRunning} onStart={start} onStop={stop} onReset={reset} />
        </div>
      </footer>
    </>
  );
}
