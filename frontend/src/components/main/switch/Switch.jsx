import React, {useState, useRef} from "react"
import "./SwitchSlider.scss"

export default function SwitchSlider(props){
  const {handleClick, defaultValue} = props;
  return (
    <>
      <label className="switch">
        <input type="checkbox" defaultChecked={defaultValue} onClick={handleClick}/>
        <span className="slider"></span>
      </label>
    </>
  )
}
