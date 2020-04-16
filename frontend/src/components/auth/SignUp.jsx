import React from "react";
import Input from "./Input.jsx"
const url = "http://localhost:3000/user/signup"
export default function Login() {
  return(
    <Input title={"Sign up"} url={url}/>
  )
}
