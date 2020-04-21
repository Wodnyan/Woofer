import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
export default function ProtectedComponent(props){
  if(props.isAuth){
    return props.children;
  }
  else{
    return <Redirect to="/account/login"/>
  }
}
