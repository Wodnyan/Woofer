import React, {useState, useEffect} from 'react';
import postF from "../../../_functions/postF.js"
import Content from "./Content.jsx"
export default function MyWoofer(props){
  const url = "http://localhost:3000/api/woofer/user"
  const [woof, setWoof] = useState([]);
  useEffect(()=>{
    const data = postF(props, url).then((data) => {
      setWoof(data);
    });
  }, [])
  const temp = woof.map((ss)=>{
    return <Content key={ss._id} woof={ss.woof} user={ss.user} postedOn={ss.postedOn}/>;
  })
  return temp;
}
