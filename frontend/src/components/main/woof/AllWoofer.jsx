import React, {useState, useEffect} from 'react'
import Content from "./Content.jsx"
import Load from "../load/Load.jsx"
import {socket} from "../../../App.jsx"
import axios from "axios"

export default function AllWoofer(props){
  const [woof, setWoof] = useState([]);
  const URL = "http://localhost:3000/api/woofer";
  useEffect(()=>{
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios
      .get(URL, {
        cancelToken: source.token
      })
      .then((resp) => {
        setWoof(resp.data)
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
  return woof.length > 0 ? temp : <Load /> ;
}
