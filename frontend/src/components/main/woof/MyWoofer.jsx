import React, {useState, useEffect} from 'react';
import postF from "../../../_functions/postF.js";
import Content from "./Content.jsx";
import Load from "../load/Load.jsx";
export default function MyWoofer(props){
  const url = "http://localhost:3000/api/woofer/user"
  const [woof, setWoof] = useState([]);
  const abortController = new AbortController()
  useEffect(()=>{
      const data = postF(props, url, abortController.signal)
                                      .then((data) => {
                                        setWoof(data);
                                      })
                                      .catch(err => {
                                        if(err.name === "AbortError") return;
                                        throw err;
                                      })
      return () => abortController.abort();
  }, [])
  const temp = woof.map((ss)=>{
    return <Content key={ss._id} woof={ss.woof} user={ss.user} postedOn={ss.postedOn}/>;
  })
  // return temp;
  return woof.length > 0 ? temp : <Load /> ;
}
