import React, {Component} from 'react';
import data from "./resources/data";
import styled, {css, keyframes} from "styled-components";
import background from "./resources/background_score.png";
import guber from "./resources/large/l_artuhov@2x.jpg";
import gameModel from "./GameModel";
import {pluralize} from "numeralize-ru";
import logo from "./resources/logo.png";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Background = styled.div`
  width: 600px;
  height: 315px;
  background-size: contain;
  background-image: url(${background});
`;

const Column = styled.div`
  margin-left: 35px;
  margin-right: 35px;
  flex-direction: column;  
  align-items: center;
  display: flex;
  justify-content: center;
`;


const Caption = styled.h2`
    width:100%;
    font-family: Helvetica;
    margin-bottom: 10px;
    font-size: 17px;
    opacity: .8;
    font-weight: normal;
    font-style:normal;
    font-stretch: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
`;

const Title = styled.h1`
  font-family: PFRegal, sans-serif;
  text-align: left;
  color: #000000;
  font-size: 25px;
  font-weight: 700;
  margin: 30px 20px 25px;
  line-height: 1.25;
`;

const Card = styled.div`
  width:100%;
  background: #ffffff;
  border-radius:4px;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.1),inset 0 5px 0 0 #b78b5c;
	margin-bottom: 80px;
	height: 111px;
`;

const MeduzaIcon = styled.div`
  background:url(${logo}) center/cover;
  background-image:url(${logo});
  background-size:cover;
  width: 85px;
  height: 18px;
`;

const IconContainer = styled.div`
  margin-top:20px;
  margin-bottom:60px;
  display:flex;
  width: 100%;
`;

export default class Score extends Component {
  render() {
    const movesCount = gameModel.getMoveCount();
    const plural = pluralize(movesCount, 'раз', 'раза', 'раз');
    const locale = `${movesCount} ${plural}`;
    return (
    <Wrapper>
      <Background>
        <Column>
          <IconContainer>
            <MeduzaIcon/>
          </IconContainer>

          <Caption>Найди двух одинаковых губернаторов: игра «Медузы»</Caption>
          <Card>
            <Title>Я могу отличить губернаторов<br/> c {locale}</Title>
          </Card>
        </Column>
      </Background>
    </Wrapper>
    )
  }
}
