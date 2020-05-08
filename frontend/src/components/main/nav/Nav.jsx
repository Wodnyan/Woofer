import React from 'react'
import {Link, Redirect} from "react-router-dom"
import TextBox from "./TextBox.jsx"
import Dropdown from "./Dropdown.jsx"
import Logout from "./Logout.jsx"
import cogSvg from "./imgs/symbol.svg"
import pawSvg from "./imgs/dog-paw.svg"

export default function Nav(props){
  const path = props.type === "My Woofs" ? "/my-woofs" : "/woofer"
  return(
    <nav className="nav-container">
      <ul>
        <Dropdown dropDownTitle="User">
          <ul className="user-options">
            <li className="user-options__item">
              <img className="options-logo" src={pawSvg}></img>
              <Link to={path} className="options-name">{props.type}</Link>
            </li>
            <li className="user-options__item">
              <img className="options-logo" src={cogSvg}></img>
              <Link to="/settings" className="options-name">Settings</Link>
            </li>
          </ul>
        </Dropdown>
        <Dropdown dropDownTitle="Write a Woof">
          <TextBox username={props.username}/>
        </Dropdown>
        <li>
          <Logout />
        </li>
      </ul>
      {false && <Redirect to="/account/login"/>}
    </nav>
  )
}
