import React, {useState} from 'react';
import postData from "../../../_functions/postF.js";
import style from "./style/TextBox.scss";
export default function TextBox(props){
  const [textAreaValue, setTextAreaValue] = useState("");
  const [woofLength, setWoofLength] = useState(0);
  const woofLimit = 150;
  const handleChange = (e)=>{
    const target = e.target
    setTextAreaValue(target.value);
    const textAreaValueLength = target.value.length;
    setWoofLength(textAreaValueLength);
  }
  const handleClick = (e)=>{
    const dd = new Date()
    const date = dd.toLocaleString();
    if(!textAreaValue) return;
    const woof = {
      username: props.username,
      woof: textAreaValue,
      postedOn: date
    }
    if(woofLength >= woofLimit) return;
    postData(woof, "http://localhost:3000/woofer");
    setTextAreaValue("")
  }
  return(
    <div className="text-box-container">
      <div className="text-box-arrow-up"></div>
      <div className="text-box">
        <textarea className="text-box__textarea" onChange={handleChange} value={textAreaValue} placeholder="Write your woof here..."/>
        <button className="text-box__btn" onClick={handleClick}>Submit Woof</button>
        <p className="text-box__length" style={{color: `${woofLength > woofLimit ? "red": "inherit"}`}}>{woofLength}/150</p>
      </div>
    </div>
  )
}
