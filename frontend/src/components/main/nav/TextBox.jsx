import React, {useState} from 'react';
import postData from "../../../_functions/postF.js";
import style from "./style/TextBox.scss";
import axios from "axios";
export default function TextBox(props){
  const [textAreaValue, setTextAreaValue] = useState("");
  const [woofLength, setWoofLength] = useState(0);
  const woofLimit = 250;
  const url = "http://localhost:3000/woofer"
  const handleChange = (e)=>{
    const target = e.target
    setTextAreaValue(target.value);
    const textAreaValueLength = target.value.length;
    setWoofLength(textAreaValueLength);
  }
  const handleClick = (e)=>{
    const dd = new Date();
    const date = dd.toLocaleString();
    if(!textAreaValue) return;
    const woof = {
      username: props.username,
      woof: textAreaValue,
      postedOn: date
    }
    if(woofLength > woofLimit) return;
    axios
      .post(url, woof)
      .then((resp) => {
        setTextAreaValue("")
        setWoofLength(0);
      })
  }
  return(
    <div className="text-box-container">
      <div className="text-box-arrow-up"></div>
      <div className="text-box">
        <textarea className="text-box__textarea" onChange={handleChange} value={textAreaValue} placeholder="Write your woof here..."/>
        <button className="text-box__btn" onClick={handleClick}>Submit Woof</button>
        <p className="text-box__length" style={{color: `${woofLength > woofLimit ? "red": "inherit"}`}}>{woofLength}/{woofLimit}</p>
      </div>
    </div>
  )
}
