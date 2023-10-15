export type DefaultSymbolType = "❓";

export type SymbolType =
  | "🤡"
  | "🤖"
  | "🎃"
  | "🧠"
  | "👑"
  | "🦄"
  | "🍀"
  | "🐲"
  | "🦋"
  | "❤️‍🔥";

export type StatusType = "faceup" | "facedown" | "matched";

export type CardType = {
  symbol: SymbolType;
  status: StatusType;
};
