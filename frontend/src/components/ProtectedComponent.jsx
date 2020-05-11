import React, {useEffect, useState} from 'react'
import {Redirect} from "react-router-dom"
import Load from "./main/load/Load.jsx"
import axios, {CancelToken} from "axios"

export default function ProtectedComponent(props){
  //State
  const [redirect, setRedirect] = useState(false);
  //Props
  const {auth, setAuth, setUsername} = props;
  const source = CancelToken.source();
  const getToken = async () => {
    const url = "http://localhost:3000/user/check";
    const getData = await axios.post(url, {}, {withCredentials: true, cancelToken: source.token});
    const {verified, token, username} = getData.data;
    setUsername(username);
    setAuth(verified);
    if(!verified) setRedirect(true)
  }
  useEffect(() => {
    source.cancel();
    return () => source.cancel()
  })
  console.log(auth)
  if(redirect) return  <Redirect to="/account/login"/>
  if(!auth){
    getToken();
    return <Load />
  }
  else return props.children;
}
