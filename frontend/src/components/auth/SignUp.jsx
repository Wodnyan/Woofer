import React from "react";
import Input from "./Input.jsx"
const url = "http://localhost:3000/user/signup"
export default function Login() {
  return(
    <div className="sign-in-container">
      <Input title={"Sign up"} url={url}/>
    </div>
  )
}
