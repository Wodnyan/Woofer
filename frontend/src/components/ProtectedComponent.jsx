import React, {useEffect, useState} from 'react'
import {Redirect} from "react-router-dom"
import Load from "./main/load/Load.jsx"
import axios from "axios"
function displayLoader(auth, func) {
  func();
  return auth ? null : <Load />
}
export default function ProtectedComponent(props){
  //State
  const [redirect, setRedirect] = useState(false);
  //Props
  const {auth, setAuth, setUsername} = props;
  //Axios
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const getToken = async () => {
    const url = "http://localhost:3000/user/check";
    try {
      const getData = await axios.post(url, {}, {withCredentials: true, cancelToken: source.token});
      const {verified, token, username} = getData.data;
      if(!verified) setRedirect(true)
      else {
        setUsername(username);
        setAuth(verified);
      }
    }
    catch(err) {
      //TODO: Investigate this
      //It returns {message: undefined}
      return;
    }
  }

  useEffect(() => {
    source.cancel()
    return () => source.cancel()
  }, [])

  if(redirect) return  <Redirect to="/account/login"/>
  else return (
    <>
      {displayLoader(auth, getToken)}
      {props.children}
    </>
  ) 
}
