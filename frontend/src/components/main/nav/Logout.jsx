import React from 'react'
import {Link} from "react-router-dom"
import axios from "axios"

export default function Logout() {
  const handleClick = () => {
    //Set auth to false
    const url = "http://localhost:3000/cookie";
    axios
      .post(url, {}, {withCredentials: true})
      .then(res => {
        console.log(res) 
      })
  }
  return <Link to="/" onClick={handleClick}>Logout</Link>
}
