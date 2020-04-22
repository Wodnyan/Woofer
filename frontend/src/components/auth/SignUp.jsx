import React from "react";
import Input from "./Input.jsx"
const url = "http://localhost:3000/user/signup"
export default function Login(props) {
  return(
    <div className="sign-in-container">
      <Input title={"Sign up"} url={url} setUsername={props.setUsername} username={props.username} auth={props.auth}/>
    </div>
  )
}
