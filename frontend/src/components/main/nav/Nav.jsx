import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import TextBox from "./TextBox.jsx";
import Dropdown from "./Dropdown.jsx";
export default function Nav(props){
  const [loggedOut, setLoggedOut] = useState(false);
  return(
    <nav className="nav-container">
      <ul>
        <li><Link to="/my-woofers">My woofs</Link></li>
        <Dropdown dropDownTitle="Write a Woof">
          <TextBox username={props.username}/>
        </Dropdown>
        <li onClick={()=> setLoggedOut(true)} style={{cursor: "pointer"}}>Logout</li>
      </ul>
      {loggedOut && <Redirect to="/account/login"/>}
    </nav>
  )
}
