export interface HighScoreData {
  wpm: number;
  accuracy: number;
  date: string;
}

const HIGH_SCORE_KEY = "typr_high_score";

export function getHighScore(): HighScoreData | null {
  if (typeof window === "undefined") return null;
  
  try {
    const data = localStorage.getItem(HIGH_SCORE_KEY);
    if (!data) return null;
    return JSON.parse(data) as HighScoreData;
  } catch {
    return null;
  }
}

export function saveHighScore(wpm: number, accuracy: number): boolean {
  if (typeof window === "undefined") return false;
  
  const currentHighScore = getHighScore();
  
  // Only save if it beats the current high score
  if (currentHighScore && currentHighScore.wpm >= wpm) {
    return false;
  }
  
  const newHighScore: HighScoreData = {
    wpm,
    accuracy,
    date: new Date().toISOString(),
  };
  
  try {
    localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(newHighScore));
    return true;
  } catch {
    return false;
  }
}

export function clearHighScore(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HIGH_SCORE_KEY);
}
