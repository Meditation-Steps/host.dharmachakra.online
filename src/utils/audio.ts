// Preloaded so the chime plays the instant the timer ends, rather than
// waiting on a fetch at exactly the moment timing matters.
const chime = new Audio("/audio/chime.mp3");
chime.preload = "auto";

export function playNotificationSound(): void {
  // Rewinding is only legal once metadata has loaded.
  if (chime.readyState > 0) {
    chime.currentTime = 0;
  }
  // play() rejects (rather than throws) when the browser blocks autoplay.
  chime.play().catch((err) => {
    console.warn("Audio playback failed:", err);
  });
}
