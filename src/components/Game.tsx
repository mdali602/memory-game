import * as S from "../assets/styles/global.styles";
import useCards from "../hooks/useCards";
import Card from "../components/Card";

export default function Game() {
  const {
    cards,
    handleClick,
    handleReset,
    numberOfClick,
    completionMessage
  } = useCards();
  return (
    <>
      {/* <S.Logo /> */}
      <S.OldLogo>
        <div>
          <h3>Memory Game</h3>
        </div>
        <div>
          <h4>Total Attempts: {numberOfClick}</h4>
        </div>
        <div>
          <h4>{completionMessage}</h4>
        </div>
      </S.OldLogo>

      <S.CardContainer>
        <S.Logo />
        {cards.map((card, idx) => (
          <Card
            key={`card-${idx}`}
            select={() => handleClick(idx)}
            symbol={card.symbol}
            status={card.status}
          />
        ))}
        {/* <S.RestartButton onClick={() => location.reload()}> */}
        <S.RestartButton onClick={handleReset}>RESTART ✓</S.RestartButton>
        {/* <S.RestartButton onClick={gotoPage}>About</S.RestartButton> */}
      </S.CardContainer>
    </>
  );
}
/* 
ghoda radio dragon bheja 
king fire 

*/