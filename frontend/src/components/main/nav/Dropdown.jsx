import React from 'react';
import useDetectClickOutside from "../../../hooks/useDetectClickOutside.jsx"
import style from "./style/Dropdown.scss"

export default function Dropdown(props){
  const {dropDownTitle} = props;
  const {ref, display, setDisplay} = useDetectClickOutside(false)
  return(
    <li className="dropdown-container" style={{position: "relative"}}>
      <p className="dropdown__name" onClick={() => setDisplay(!display)} style={{cursor: "pointer"}}>{dropDownTitle}</p>
      {display && <div className="dropdown__children" ref={ref} style={{position: "absolute"}}>{props.children}</div>}
    </li>
  )
}
