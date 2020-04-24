import React, {useState} from 'react';
import postData from "../../../_functions/postF.js";
import style from "./style/TextBox.scss";
export default function TextBox(props){
  const [textAreaValue, setTextAreaValue] = useState("");
  const [woofLength, setWoofLength] = useState(0);

  const handleChange = (e)=>{
    const target = e.target
    setTextAreaValue(target.value);
    //Need to add +1 to length because starting value is <empty string>
    const textAreaValueLength = target.value.length;
    setWoofLength(textAreaValueLength);
  }
  console.log(woofLength);
  const handleClick = ()=>{
    const dd = new Date()
    const date = dd.toLocaleString();
    if(!textAreaValue) return;
    const woof = {
      username: props.username,
      woof: textAreaValue,
      postedOn: date
    }
    postData(woof, "http://localhost:3000/woofer");
    setTextAreaValue("")
  }
  return(
    <div className="text-box">
      <div className="text-box__arrow-up"></div>
      <textarea className="text-box__textarea" onChange={handleChange} value={textAreaValue} placeholder="Write your woof here..."/>
      <button className="text-box__btn" onClick={handleClick}>Submit Woof</button>
    </div>
  )
}
