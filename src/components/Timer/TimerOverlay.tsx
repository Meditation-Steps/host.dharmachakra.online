interface TimerOverlayProps {
  progress: number;
}

export default function TimerOverlay({ progress }: TimerOverlayProps) {
  // scaleY is composited on the GPU; animating `height` relayouts the page every frame.
  return <div className="timer-overlay" style={{ transform: `scaleY(${progress / 100})` }} />;
}
