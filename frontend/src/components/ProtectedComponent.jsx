import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios"
export default function ProtectedComponent(props){
  const {auth, setAuth} = props;
  const url = "http://localhost:3000/user/check";
  const foo = (async () => {
    axios
    .post(url ,{
      foo: "bar"
    }, {
      withCredentials: true
    })
    .then((res) => {
      setAuth(res.data.verified)
      console.log("foo");
    })
    }
  )()
  return auth ? props.children : <Redirect to="/account/login"/>
}
