import React, {useState} from 'react';
import postData from "../../../_functions/postF.js"
export default function TextBox(props){
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleChange = (e)=>{
    setTextAreaValue(e.target.value);
  }
  const handleClick = ()=>{
    const dd = new Date()
    const date = dd.toLocaleString();
    if(!textAreaValue) return;
    const woof = {
      woof: textAreaValue,
      postedOn: date
    }
    postData(woof, "http://localhost:3000/woofer");
    setTextAreaValue("")
  }
  return(
    <>
      <textarea onChange={handleChange} value={textAreaValue}/>
      <button onClick={handleClick}>Submit</button>
    </>
  )
}
