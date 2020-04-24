import React, {useState, useEffect} from 'react';
import Content from "./Content.jsx"
export default function AllWoofer(props){
  const [woof, setWoof] = useState([]);
  useEffect(()=>{
    const getData = async ()=>{
      const woofs =  await fetch("http://localhost:3000/api/woofer");
      const data = woofs.json();
      return data
    }
    console.log("All woofer")
    const data = getData().then((dd)=> setWoof(dd));
  }, [])
  const temp = woof.map((ss)=>{
    return <Content key={ss._id} woof={ss.woof} user={ss.user} postedOn={ss.postedOn}/>;
  })
  return temp;
}
