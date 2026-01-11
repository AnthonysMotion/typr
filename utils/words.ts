// Common English words for typing practice
const wordList = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "word", "find", "long", "down", "did", "been", "call", "who", "oil", "may",
  "part", "over", "such", "made", "live", "back", "where", "after", "still", "place",
  "same", "while", "last", "might", "great", "old", "year", "start", "next", "should",
  "every", "home", "need", "much", "through", "high", "life", "world", "house", "again",
  "point", "right", "move", "try", "kind", "hand", "left", "night", "real", "small",
  "number", "off", "always", "gave", "never", "before", "own", "found", "end", "run",
  "read", "keep", "thing", "why", "asked", "went", "men", "change", "name", "very",
  "sentence", "help", "line", "turn", "cause", "much", "mean", "build", "land", "here",
  "thought", "both", "few", "those", "always", "show", "large", "often", "together", "head",
  "under", "story", "saw", "far", "sea", "draw", "important", "until", "children", "side",
  "feet", "car", "mile", "night", "walk", "white", "paper", "group", "music", "shall",
  "began", "problem", "fact", "between", "study", "second", "enough", "almost", "took", "tree",
  "cross", "farm", "hard", "start", "example", "river", "sometimes", "young", "talk", "soon",
  "stop", "without", "open", "seem", "simple", "face", "watch", "stood", "question", "mark"
];

export function generateWords(count: number = 50): string[] {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    words.push(wordList[randomIndex]);
  }
  return words;
}

export function generateText(wordCount: number = 50): string {
  return generateWords(wordCount).join(" ");
}
