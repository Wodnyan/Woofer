import React from 'react';
import {Link} from "react-router-dom";
import image from "./sad-dog.png"
import styled from "styled-components"


const NotFoundContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const HeroText = styled.div`
  position: absolute;
  width: 40%;
  text-align: center;
  h1 {
    font-size: 3em
  }
  a {
    display: inline-block;
    margin-top: 10px;
    padding: .7em 1.5em;
    border: 2px solid var(--secondary-color);
    border-radius: 2em;
    background-color: var(--secondary-color);
    color: var(--main-text-color);
    text-decoration: none;
    transition: background .2s ease;
    &:hover {
      background: transparent;
    }
  }
  @media (max-width: 760px) {
    & {
      width: 90%;
    }
  }

`
const ImageContainer = styled.div`
  position: absolute;
  left: ${props => props.right ? "60%" : 0};
  transform: ${props => props.right ? "scaleX(-1)" : ""};
  width: 40%;
  z-index: -10000;
  img {
    width: 100%;
  }
  @media (max-width: 760px) {
    &{
      display: none;
    }
  }
`

export default function NotFound(){
  return(
    <NotFoundContainer>
      <HeroText>
        <h1>404</h1>
        <p>
          We cannot seem to find the page you were looking for, you can return to the home page with the link below
        </p>
        <Link to="/woofer">Go back</Link>
      </HeroText>
      <ImageContainer>
        <img src={image} alt="sad dog"/>
      </ImageContainer>
      <ImageContainer right>
        <img src={image} alt="sad dog"/>
      </ImageContainer>
    </NotFoundContainer>
  )
}
