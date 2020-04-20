import React, {useState} from 'react';
export default function Dropdown(props){
  const {dropDownTitle} = props;
  const [dropdown, setDropdown] = useState(true);
  const handleClick = ()=>{
    setDropdown(!dropdown);
  }
  return(
    <li className="dropdown-container">
      <h1 className="dropdown__name" onClick={handleClick} style={{cursor: "pointer"}}>{dropDownTitle}</h1>
      {dropdown && <div className="dropdown__children">{props.children}</div>}
    </li>
  )
}
