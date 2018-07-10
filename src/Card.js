import React, {Component} from 'react';
import gameModel from './GameModel';
import cardCover from './resources/card.png'
import './App.css';
import styled, {css} from "styled-components";
import data from "./resources/data"

const Wrapper = styled.div`
  width: 25%;
  height: 25%;
  display: flex;
  flex-direction: row;  
  justify-content: center; 
  align-items: center;   
`;

const cardFace = css`
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 100px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 10px;
  backface-visibility: hidden;
  background-size: contain;
  background-repeat: no-repeat;
`;

const CardFaceFront = styled.div`
  background-image: url( ${cardCover} );
  ${cardFace}
`;

const CardFaceBack = styled.div`
  transform: rotateY(180deg);
  border-radius: 4px;
  border: 2px solid #000;
  overflow:hidden;
  position:relative;
  ${cardFace}
`;

const GuberAvatar = styled.img`
  position:absolute;
  left:-50%; right:-50%; top: -5%;
  margin:auto;
  height:110%; width:auto;
`;

// const Card = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   /*margin: 2px;*/
//   cursor: pointer;
//   transform-style: preserve-3d;
//   transform-origin: center;
//   transition: transform 1s;
// `

const cardStyle = {};


// {/*<div className="card__container" style={cardStyle}></div>*/}
class Card extends Component {
  constructor(props) {
    super(props);
    // this.addActiveClass= this.addActiveClass.bind(this);
    // this.state = {
    //   active: false,
    // };
  }

  handleClick() {
    console.log("click");
    this.toggle();
  }

  toggle() {
    // const currentState = this.state.active;
    // this.setState({active: !currentState});
    // console.log("is active : " + currentState);

    // console.log("cardId " + this.props.cardId);
    gameModel.tryToFlip(this.props.cardId);
  }

  render() {
    const guberId = this.props.cardPair;
    const guberImgId = data[guberId].id;
    const guberImgPath = `./data/small/s_${guberImgId}@2x.jpg`;
    // console.log("imag " + guberImgPath)

    const isGuessed = this.props.isGuessed ? 'is-guessed' : '';
    const isFlipped = this.props.isFlipped ? 'is-flipped' : '';
    const cardClass = `card ${isFlipped}`;
    const cardSceneClass = `card__scene ${isGuessed}`;

    return <Wrapper>
      <div onClick={this.handleClick.bind(this)} className={cardSceneClass}>
        <div className={cardClass}>
          <CardFaceFront>{this.props.cardPair}</CardFaceFront>
          <CardFaceBack>
            <GuberAvatar src={guberImgPath} ></GuberAvatar>
          </CardFaceBack>
        </div>
      </div>
    </Wrapper>

  }
}

export default Card;