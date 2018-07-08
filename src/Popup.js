import React, {Component} from 'react';
import data from "./resources/data";
import styled, {css} from "styled-components";
import background from "./resources/background_popup.png";
import guber from "./resources/large/l_artuhov@2x.jpg";
import gameModel from "./GameModel";


const Window = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  max-width: 296px;
  min-width: 296px;
  padding: 11px 11px 25px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.4);
  border: 2px solid #000;
  border-radius: 4px;
  background-image: url(${background});
`;

const Photo = styled.div`
  border-radius: 4px;
  border: 2px solid #000;
  height: 216px;
  margin-bottom: 15px;
  background: #fff url(${guber}) no-repeat 50%;
  background-size: 104%;
`

const label = css`
  font-family: Proxima Nova,sans-serif;
  color: #000;
  font-stretch: normal;
  font-style: normal;
  text-align: center;
`;

const Title = styled.h1`
  ${label}
  font-size: 20px;
  font-weight: 700;
  
  margin-top: 0;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  ${label}
  font-size: 12px;
  font-weight: 700;
  
  margin-top: 0;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  ${label}
  font-size: 15px;
  font-weight: 400;
	
	margin-top: 0;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  ${label}
  border-radius: 4px;
  background-color: #000;
  color: #fff;
  font-weight: 700;
  border: none;
  padding: 7px 37px;
  margin: 0 auto;
  cursor: pointer;
`;

export default class Popup extends Component {
  onNextClick(event) {
    gameModel.detailsNext();
    console.log("on next click")
  }

  render() {
    const id = this.props.guberId;
    let guber = data[id];
    if (!guber) {
      console.log('no guber with such id');
      guber = data[4];
    }

    return <Window>
      <Photo/>
      <Title>{guber.name}</Title>
      <Subtitle>{guber.subtitle}</Subtitle>
      <Description>{guber.description}</Description>
      <Button onClick={this.onNextClick}>Дальше</Button>
    </Window>
  }
}
