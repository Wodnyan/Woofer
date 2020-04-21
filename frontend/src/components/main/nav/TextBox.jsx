import React, {useState} from 'react';
import postData from "../../../_functions/postF.js";
import style from "./style/TextBox.scss";
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
    <div className="text-box">
      <textarea className="text-box__textarea" onChange={handleChange} value={textAreaValue}/>
      <button className="text-box__btn" onClick={handleClick}>Submit</button>
    </div>
  )
}
