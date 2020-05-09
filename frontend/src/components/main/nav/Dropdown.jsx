import React, {useState, useEffect, useRef} from 'react';
import style from "./style/Dropdown.scss"
export default function Dropdown(props){
  const {dropDownTitle} = props;
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const handleClick = ()=>{
    setDropdown(!dropdown)
  }
  useEffect(() => {
    const handle = (e) => {
      if(dropdownRef.current && 
        !dropdownRef.current.contains(e.target)){
        setDropdown(!dropdown)
      }
    }
    document.addEventListener("click", handle)
    return () => {
      document.removeEventListener("click", handle)
    }
  }, [dropdown])
  return(
    <li className="dropdown-container" style={{position: "relative"}}>
      <p className="dropdown__name" onClick={handleClick} style={{cursor: "pointer"}}>{dropDownTitle}</p>
      {dropdown && <div className="dropdown__children" ref={dropdownRef} style={{position: "absolute"}}>{props.children}</div>}
    </li>
  )
}
