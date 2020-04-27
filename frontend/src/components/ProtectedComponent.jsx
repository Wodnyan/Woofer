import React, {useEffect} from 'react';
import postData from "../_functions/postF.js"
import {Redirect} from "react-router-dom";
export default function ProtectedComponent(props){
  const {isAuth, setAuth} = props
  const url = "http://localhost:3000/user/check";
  useEffect(()=>{
    setAuth(true);
  }, [isAuth])
  if(!isAuth){
    return <Redirect to="/account/login"/>
  }
  else{
    return props.children;
  }
}
