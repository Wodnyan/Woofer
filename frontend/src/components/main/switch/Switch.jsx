import React, {useState, useRef} from "react"
import "./SwitchSlider.scss"

export default function SwitchSlider(){
  const ref = useRef(null)
  //Check if the input is checked
  const handleClick = () => {
    const node = ref.current;
    console.log(node.checked) 
  }
  return (
    <>
      <label className="switch">
        <input type="checkbox" ref={ref} onClick={handleClick}/>
        <span className="slider"></span>
      </label>
    </>
  )
}
