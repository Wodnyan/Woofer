import React from "react";
import Input from "./Input.jsx"
export default function Login(props){
  const url = "http://localhost:3000/user/login"
  return(
    <div className="login-container">
      <Input title={"Login"} url={url} setUsername={props.setUsername} username={props.username} auth={props.auth}/>
    </div>
  )
}
