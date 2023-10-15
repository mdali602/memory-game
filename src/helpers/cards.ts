import { CardType, DefaultSymbolType, SymbolType } from "../types/global.types";

export const defaultSymbol: DefaultSymbolType = "❓";

const symbols: SymbolType[] = [
  "🤡",
  "🤖",
  "🎃",
  "🧠",
  "👑",
  "🦄",
  "🍀",
  "🐲",
  "🦋",
  "❤️‍🔥",
];

export default function shuffleCards(): CardType[] {
  return [...symbols, ...symbols]
    .sort(() => Math.random() - 0.5)
    .map((symbol) => ({ symbol, status: "faceup" } as CardType));
}
