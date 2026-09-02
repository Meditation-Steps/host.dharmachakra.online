"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseTimerOptions {
  durationSeconds?: number;
  givenRemainingTime?: number;
  onComplete?: () => void;
}

export interface UseTimerReturn {
  remainingTime: number;
  isRunning: boolean;
  progress: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

// The display only changes once per second; 250ms keeps the tick responsive
// without spinning the main thread the way requestAnimationFrame did.
const TICK_MS = 250;

export function useTimer({ durationSeconds = 1800, givenRemainingTime = 0, onComplete }: UseTimerOptions = {}): UseTimerReturn {
  const [remainingTime, setRemainingTime] = useState(givenRemainingTime || durationSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const initialPausedTime = givenRemainingTime ? (durationSeconds - givenRemainingTime) * 1000 : 0;

  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(initialPausedTime);

  // Held in a ref so an inline callback from the caller doesn't restart the loop.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const progress = ((durationSeconds - remainingTime) / durationSeconds) * 100;

  // Main timer loop with automatic cleanup
  useEffect(() => {
    if (!isRunning) return;

    startTimeRef.current = Date.now() - pausedTimeRef.current;

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - (startTimeRef.current as number);
      const newRemaining = Math.max(0, durationSeconds - Math.floor(elapsed / 1000));

      setRemainingTime(newRemaining);

      if (newRemaining <= 0) {
        setIsRunning(false);
        onCompleteRef.current?.();
      }
    }, TICK_MS);

    return () => clearInterval(intervalId);
  }, [isRunning, durationSeconds]);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
    }
  }, [isRunning]);

  const stop = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      pausedTimeRef.current = Date.now() - (startTimeRef.current as number);
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setRemainingTime(durationSeconds);
    pausedTimeRef.current = 0;
    startTimeRef.current = null;
  }, [durationSeconds]);

  return {
    remainingTime,
    isRunning,
    progress,
    start,
    stop,
    reset,
  };
}
