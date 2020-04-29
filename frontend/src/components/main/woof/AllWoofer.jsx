import React, {useState, useEffect} from 'react';
import Content from "./Content.jsx";
import Load from "../load/Load.jsx";
export default function AllWoofer(props){
  const [woof, setWoof] = useState([]);
  const abortController = new AbortController()
  useEffect(()=>{
    let mounted = true;
    if(mounted){
      const getData = async ()=>{
        const woofs =  await fetch("http://localhost:3000/api/woofer", {signal: abortController.signal});
        const data = woofs.json();
        return data
      }
      const data = getData()
                    .then((dd)=> setWoof(dd))
                    .catch(err => {
                      if(err.name === "AbortError") return;
                       throw err;
                    })
    }
    return () => abortController.abort();
  }, [])
  const temp = woof.map((ss)=>{
    return <Content key={ss._id} woof={ss.woof} user={ss.user} postedOn={ss.postedOn}/>;
  })
  return woof.length > 0 ? temp : <Load /> ;
}
