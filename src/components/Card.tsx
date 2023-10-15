import type { MouseEventHandler } from "react";
import styled from "styled-components";
import { cardstyling } from "../assets/styles/global.styles";
import { StatusType, SymbolType } from "../types/global.types";
import { defaultSymbol } from "../helpers/cards";

const S = {
  Card: styled.button<{ status: StatusType }>`
    ${cardstyling}
    border-color: ${(p: { status: StatusType }) =>
      p.status === "matched" ? "#FF9A00" : "violet"};
    background-color: ${(p: { status: StatusType }) =>
      p.status === "facedown" ? "#AB0097" : "#FFF"};
    animation: ${(p: { status: StatusType }) =>
      p.status === "matched" ? "tada" : "flipInY"};
    animation-duration: 1s;
  `
};

interface Props {
  select?: MouseEventHandler<HTMLButtonElement>;
  status: StatusType;
  symbol: SymbolType;
}

/**
 * Card Component
 * -
 */
export default function Card(props: Props) {
  const { select, status, symbol } = props;
  return (
    <S.Card key={`card-${status}`} onClick={select} status={status}>
      {status !== "facedown" ? symbol : defaultSymbol}
    </S.Card>
  );
}
