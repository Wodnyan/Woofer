import React from 'react'
import {Link, Redirect} from "react-router-dom"
import TextBox from "./TextBox.jsx"
import Dropdown from "./Dropdown.jsx"
import Logout from "./Logout.jsx"

export default function Nav(props){
  const path = props.type === "My Woofs" ? "/my-woofs" : "/woofer"
  return(
    <nav className="nav-container">
      <ul>
        <li className="nav__woof-pages"><Link to={path}>{props.type}</Link></li>
        <Dropdown dropDownTitle="Write a Woof">
          <TextBox username={props.username}/>
        </Dropdown>
        <li><Logout /></li>
      </ul>
      {false && <Redirect to="/account/login"/>}
    </nav>
  )
}
