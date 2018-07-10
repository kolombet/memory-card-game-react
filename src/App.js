import React, {Component} from 'react';
import './App.css';
import Popup from "./Popup";
import Game from "./Game";
import gameModel from "./GameModel";
import styled, {css} from "styled-components";
import backgroundImage from "./resources/background.png";
import Score from "./Score";

const Background = styled.div`
    position:relative;
    border-radius: 2px;
    background: url(${backgroundImage});
    background-size: 50px;
    border: 1px solid rgba(0,0,0,.1);
    width:100%;
    max-width: 650px;
    margin: 0 auto;
`;

class App extends Component {
  constructor() {
    super();
    gameModel.onModelChanged.add(() => {
      console.log("game model state change " + gameModel.isShowingDetails())
      this.setState({
        isShowingDetails: gameModel.isShowingDetails(),
        guberId: gameModel.detailsId()
      })
    });

    this.state = {
      isShowingDetails: gameModel.isShowingDetails()
    }
  }

  render() {
    console.log("render " + this.state.isShowingDetails);
    return (
    <Background>
      <Game/>
      {this.state.isShowingDetails &&
        <Popup guberId={this.state.guberId}/>
      }

      {/*<Popup/>*/}
      <Score/>
    </Background>
    );
  }
}

export default App;
