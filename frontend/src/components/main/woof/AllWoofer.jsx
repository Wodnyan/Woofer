import React, {useState, useEffect} from 'react';
import Content from "./Content.jsx"
export default function AllWoofer(props){
  const [woof, setWoof] = useState([]);
  useEffect(()=>{
    const controller = new AbortController();
    const {signal} = controller;
    const getData = async ()=>{
      const woofs =  await fetch("http://localhost:3000/api/woofer", {signal});
      const data = woofs.json();
      return data
    }
    const data = getData().then((dd)=> setWoof(dd));
    return function cleanUp() {
      controller.abort()
    }
  }, [])
  const temp = woof.map((ss)=>{
    return <Content key={ss._id} woof={ss.woof} user={ss.user} postedOn={ss.postedOn}/>;
  })
  console.log(woof);
  return temp;
}
