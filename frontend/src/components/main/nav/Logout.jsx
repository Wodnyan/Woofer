import React from 'react'
import {Link} from "react-router-dom"
import axios from "axios"

export default function Logout() {
  const handleClick = () => {
    // const url = "http://localhost:3000/user/logout";
    // axios
    //   .post(url, {}, {withCredentials: true})
    //   .then(data => console.log(data))
    console.log("Logged out");
  }
  return <Link to="/" onClick={handleClick}>Logout</Link>
}
