import { useCallback, useEffect, useState } from "react";
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

export default function MeditationTimer({ durationMinutes = 30 }: MeditationTimerProps) {
  const { t } = useTranslation("validation");
  const [searchParams] = useSearchParams();

  const givenDurationTime = getNumberParam(
      searchParams.get("f")
  ) || durationMinutes * secondsInMinute;
  const givenRemainingTime = getNumberParam(searchParams.get("t")) || 0;

  if (givenDurationTime < givenRemainingTime) {
    alert(t("givenDurationAndRemainingTime"));
  }

  const [showControls, setShowControls] = useState(true);

  const handleComplete = useCallback(() => {
    playNotificationSound();
  }, []);

  const { remainingTime, isRunning, progress, start, stop, reset } = useTimer({
    durationSeconds: givenDurationTime,
    givenRemainingTime: givenRemainingTime,
    onComplete: handleComplete,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleUserActivity = () => {
      setShowControls(true);

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    // Initial timeout
    timeoutId = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <TimerOverlay progress={progress} />

      <footer
        className="timer-footer"
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h1 className="timer-display">{formatTime(remainingTime)}</h1>
        <div
          style={{
            transition: "opacity 0.3s ease",
            opacity: showControls ? 1 : 0,
            pointerEvents: showControls ? "auto" : "none",
          }}
        >
          <TimerControls isRunning={isRunning} onStart={start} onStop={stop} onReset={reset} />
        </div>
      </footer>
    </>
  );
}
