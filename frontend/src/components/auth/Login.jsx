import React from "react";
import Input from "./Input.jsx"
const url = "http://localhost:3000/user/login"
export default function Login(){
  return(
    <div className="login-container">
      <Input title={"Login"} url={url}/>
    </div>
  )
}
