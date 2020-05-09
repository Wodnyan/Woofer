import React from 'react'
import {Link, Redirect} from "react-router-dom"
import TextBox from "./TextBox.jsx"
import Dropdown from "./Dropdown.jsx"
import Logout from "./Logout.jsx"
import cogSvg from "./imgs/symbol.svg"
import pawSvg from "./imgs/dog-paw.svg"

export default function Nav(props){
  const path = props.type === "My Woofs" ? "/my-woofs" : "/woofer"
  const {setAuth} = props;
  return(
    <nav className="nav-container">
      <ul>
        <Dropdown dropDownTitle="User">
          <ul className="user-options">
            <Link to={path} className="user-options__item">
              <img className="options__logo" src={pawSvg}></img>
              <h1 className="options__name">{props.type}</h1>
            </Link>
            <Link to="/settings" className="user-options__item">
              <img className="options__logo" src={cogSvg}></img>
              <h1 className="options__name">Settings</h1>
            </Link>
          </ul>
        </Dropdown>
        <Dropdown dropDownTitle="Write a Woof">
          <TextBox username={props.username}/>
        </Dropdown>
        <li>
          <Logout setAuth={setAuth}/>
        </li>
      </ul>
      {false && <Redirect to="/account/login"/>}
    </nav>
  )
}
