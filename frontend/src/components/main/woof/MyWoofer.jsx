import React, {useState, useEffect} from 'react'
import {Redirect} from "react-router-dom"
import Content from "./Content.jsx"
import Load from "../load/Load.jsx"
import UserInfo from "../user_info/UserInfo.jsx"
import NoContent from "../no_content/NoContent.jsx"
import axios from "axios"

export default function MyWoofer(props){
  const url = "http://localhost:3000/api/woofer/user"
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [woof, setWoof] = useState([]);
  const [description, setDescription] = useState("");  
  useEffect(()=>{
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios
      .post(url, {
        username: props.username
      }, {
        cancelToken: source.token
      })
      .then((resp) => {
        const {woofs} = resp.data;
        if(woofs.length === 0) setIsLoading(false)
        const {description} = resp.data.userInfo;
        setIsLoading(false)
        setWoof(woofs);
        setDescription(description)
      })
      .catch((err) => {
        if(axios.isCancel(err)) return;
        setRedirect(true);
      })
    return () => {
      source.cancel();
    }
  }, [])
  //Change the name of this variable
  const temp = woof.map((ss)=>{
    return <Content key={ss._id} woof={ss.woof} user={ss.user} postedOn={ss.postedOn}/>;
  })
  if(redirect) return <Redirect exact to="/404"/>
  if(isLoading) return <Load />
  return (
    <>
      <UserInfo username={props.username} description={description}/>
      {woof.length === 0 && <NoContent />}
      {temp}
    </>
  )
}
