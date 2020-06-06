import React from 'react'
import style from "./style/Nav.scss"
import {Link} from "react-router-dom"
import TextBox from "./TextBox.jsx"
import Dropdown from "./Dropdown.jsx"
import Logout from "./Logout.jsx"
import cogSvg from "./imgs/symbol.svg"
import pawSvg from "./imgs/dog-paw.svg"

export default function Nav(props){
  const {setAuth, username} = props;
  const path = props.type === "My Woofs" ? `/user/${username}` : "/woofer"
  return(
    <nav className="nav-container">
      <ul>
        <Dropdown dropDownTitle="User">
          <div className="arrow-up"></div>
          <ul className="user-options">
            <li>
              <Link to="/settings" className="user-options__item">
                <img className="options__logo" src={cogSvg}></img>
                <h1 className="options__name">Settings</h1>
              </Link>
            </li>
            <li className="user-options__item">
              <img className="options__logo" src={cogSvg}></img>
              <Logout setAuth={setAuth}/>
            </li>
          </ul>
        </Dropdown>
        <Dropdown dropDownTitle="Write a Woof">
          <TextBox username={username}/>
        </Dropdown>
        <li>
          <Link to={path} className="type-switch">
            {props.type}
          </Link>
        </li>
      </ul>
    </nav>
  )
}
