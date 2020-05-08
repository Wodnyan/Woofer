import React, {useState, useEffect} from 'react'
import Content from "./Content.jsx"
import Load from "../load/Load.jsx"
import UserInfo from "../user_info/UserInfo.jsx"
import axios from "axios"

export default function MyWoofer(props){
  const url = "http://localhost:3000/api/woofer/user"
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
        const {description} = resp.data.userInfo;
        setWoof(woofs);
        setDescription(description)
      })
      .catch((err) => {
        if(axios.isCancel(err)) return;
        console.error(err);
      })
    return () => {
      source.cancel();
    }
  }, [])
  const temp = woof.map((ss)=>{
    return <Content key={ss._id} woof={ss.woof} user={ss.user} postedOn={ss.postedOn}/>;
  })
  // return temp;
  if(woof.length < 0) return <Load />
  else{
    return (
      <>
        <UserInfo username={props.username} description={description}/>
        {temp}
      </>
    )
  }
}
