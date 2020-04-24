import React, {useState} from 'react';
import style from "./style/Dropdown.scss"
export default function Dropdown(props){
  const {dropDownTitle} = props;
  const [dropdown, setDropdown] = useState(true);
  const handleClick = ()=>{
    setDropdown(!dropdown);
  }
  return(
    <li className="dropdown-container" style={{position: "relative"}}>
      <p className="dropdown__name" onClick={handleClick} style={{cursor: "pointer"}}>{dropDownTitle}</p>
      {dropdown && <div className="dropdown__children" style={{position: "absolute"}}>{props.children}</div>}
    </li>
  )
}
