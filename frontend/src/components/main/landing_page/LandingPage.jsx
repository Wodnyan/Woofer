import React from 'react'
import {Link} from "react-router-dom"
import squiggle from "./imgs/squiggle.svg"
import style from "./style/LandingPage.scss"
export default function LandingPage(){
  return (
    <div className="hero">
      <div className="hero__squiggle">
        <img src={squiggle} alt="Squiggle svg thingy"></img>
      </div>
      <div className="hero__img">
      </div>
      <div className="hero__txt-container">
        <h1 className="hero__title">Woofer</h1>
        <p className="hero__txt">A place for dogs to share their thoughts about the world</p>
        <Link to="/woofer" className="hero__btn">Let's get started</Link>
      </div>
    </div>
  )
}
