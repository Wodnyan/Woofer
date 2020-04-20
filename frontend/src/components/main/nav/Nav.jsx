import React, {useState} from 'react';
import {Link} from "react-router-dom";
import TextBox from "./TextBox.jsx";
import Dropdown from "./Dropdown.jsx";
export default function Nav(){
  return(
    <nav>
      <ul>
        <li><Link to="/my-woofers">My woofs</Link></li>
        <Dropdown dropDownTitle="Write a Woof">
          <TextBox/>
        </Dropdown>
        <li>Logout</li>
      </ul>
    </nav>
  )
}
