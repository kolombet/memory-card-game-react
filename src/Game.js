import React, {Component} from 'react';
import data from "./resources/data";
import gameModel from "./GameModel";
import Card from "./Card";
import styled, {css} from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameView = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 100%;
`;

const MoveLabel = styled.span`
  font-family: Proxima Nova,sans-serif;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  text-align: center;
  color: #000;
  margin-bottom: 9px;
  text-transform: uppercase;
`;

const AspectRatio = styled.div`
  width: 296px;
  height: 376px;

  @media (max-width: 296px) {
    //width:100%;
    width: 100vw;
    height: 128.571428571vw;
  }
`;

export default class Game extends Component {
  constructor() {
    super();
    // this.gameModel = gameModel;
    // console.log("data" + data);

    this.state = {
      cards: gameModel.getCards(),
      moves: gameModel.getMoveCount()
    }
  }

  componentWillMount() {
    console.log("componentWillMount");
    gameModel.onModelChanged.add(this.onModelChanged);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    gameModel.onModelChanged.remove(this.onModelChanged);
  }

  onModelChanged = () => {
    console.log("on model changed");
    this.updateGameState();
  };

  updateGameState() {
    this.setState({
      cards: gameModel.getCards(),
      moves: gameModel.getMoveCount()
    })
  }

  render() {
    if (!this.state || this.state.cards === null)
      return <p> loading...</p>

    let move = `ходов: ${this.state.moves}`;
    return <Container>
      <MoveLabel>{move}</MoveLabel>

      <AspectRatio>
        <GameView>
          {this.state.cards.map((card, i) => {
            return <Card isGuessed={card.isGuessed}
                         isFlipped={card.isFlipped}
                         cardId={card.id}
                         cardPair={card.pairId}
                         key={i}/>;
          })}
        </GameView>
      </AspectRatio>
    </Container>
  }
}