import React from "react";
import Input from "./Input.jsx"
const url = "http://localhost:3000/user/login"
export default function Login(props){
  return(
    <div className="login-container">
      <Input title={"Login"} url={url} setUsername={props.setUsername} username={props.username} auth={props.auth}/>
    </div>
  )
}
