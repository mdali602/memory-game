import { useCallback, useEffect, useRef, useState } from "react";
import shuffleCards from "../helpers/cards";
import { StatusType } from "../types/global.types";

const shuffledCards = shuffleCards()

export default function useCards() {
  const [cards, setCards] = useState(shuffledCards);
  const disabled = useRef(true);
  const prevIndex = useRef(-1);
  const numberOfClick = useRef(0);

  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>();

  const completionMessage = cards.every((c) => c.status === "matched")
    ? '"CONGRATULATIONS!!!"'
    : "";

  const startTimer = useCallback(() => {
    timeout.current = setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((c) => ({ ...c, status: "facedown" }))
      );
      disabled.current = false;
    }, 3 * 1000);
  }, []);

  const handleReset = () => {
    disabled.current = true;
    prevIndex.current = -1;
    numberOfClick.current = 0;

    setCards(shuffleCards());
    startTimer();
  };

  const updateCard = (indexes: number[], status: StatusType) =>
    cards.map((card, i) =>
      indexes.indexOf(i) !== -1 ? { ...card, status } : card
    );

  const handleClick = (idx: number) => {
    const currCard = cards[idx];
    const prevCard = cards[prevIndex.current];
    if (disabled.current || currCard.status === "matched") {
      return;
    }
    numberOfClick.current += 1;
    if (prevIndex.current === idx) {
      setCards(updateCard([idx], "facedown"));
      prevIndex.current = -1;
      return;
    }
    setCards(updateCard([idx], "faceup"));
    if (prevCard) {
      disabled.current = true;
      const newStatus =
        prevCard.symbol !== currCard.symbol ? "facedown" : "matched";
      const updatedCards = updateCard([prevIndex.current, idx], newStatus);
      setTimeout(() => {
        setCards(updatedCards);
        disabled.current = false;
      }, 500);
    }
    prevIndex.current = numberOfClick.current % 2 === 0 ? -1 : idx;
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearTimeout(timeout.current);
    };
  }, [startTimer]);
  return {
    cards,
    handleClick,
    handleReset,
    numberOfClick: numberOfClick.current,
    completionMessage
  };
}
