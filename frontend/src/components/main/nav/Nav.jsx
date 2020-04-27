import React from 'react';
import {Link, Redirect} from "react-router-dom";
import TextBox from "./TextBox.jsx";
import Dropdown from "./Dropdown.jsx";
export default function Nav(props){
  const path = props.type === "My Woofs" ? "/my-woofs" : "/woofer"
  return(
    <nav className="nav-container">
      <ul>
        <li><Link to={path}>{props.type}</Link></li>
        <Dropdown dropDownTitle="Write a Woof">
          <TextBox username={props.username}/>
        </Dropdown>
        <li style={{cursor: "pointer"}}>Logout</li>
      </ul>
      {false && <Redirect to="/account/login"/>}
    </nav>
  )
}
