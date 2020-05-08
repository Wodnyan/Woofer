import React from 'react'
import {Link} from "react-router-dom"
import axios from "axios"

export default function Logout(props) {
  const {setAuth} = props;
  const handleClick = () => {
    const url = "http://localhost:3000/cookie";
    axios
      .post(url, {}, {withCredentials: true})
      .then(res => {
        setAuth(false);
      })
  }
  return <Link to="/" onClick={handleClick}>Logout</Link>
}
