import React, {useState, useEffect} from 'react'
import postF from "../../../_functions/postF.js"
import Content from "./Content.jsx"
import Load from "../load/Load.jsx"
import axios from "axios"

export default function MyWoofer(props){
  const url = "http://localhost:3000/api/woofer/user"
  const [woof, setWoof] = useState([]);
  const abortController = new AbortController()
  useEffect(()=>{
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const {username} = props;
    axios
      .post(url, {
        username
      }, {
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
  // return temp;
  return woof.length > 0 ? temp : <Load /> ;
}
