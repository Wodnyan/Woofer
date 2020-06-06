import React from 'react';
import "./style/TextBox.scss";
import useSendTextAreaValue from "../../../hooks/useSendTextAreaValue.jsx"
import CharCounter from "../char_counter/CharCounter.jsx"
import axios from "axios";

export default function TextBox(props){
  const {textAreaValue ,handleClick, handleChange} = useSendTextAreaValue() //Custom hook to handle sending data to backend
  const WOOF_LIMIT = 250;
  const url = "http://localhost:3000/woofer"
  const date = new Date().toLocaleString()
  const data = {
    username: props.username,
    woof: textAreaValue,
    postedOn: date
  }
  return(
    <div className="text-box-container">
      <div className="arrow-up"></div>
      <div className="text-box">
        <textarea className="text-box__textarea" onChange={handleChange} value={textAreaValue} placeholder="Write your woof here..."/>
        <button className="text-box__btn" onClick={() => handleClick(url, data, WOOF_LIMIT)}>Submit Woof</button>
        <CharCounter className="char_counter--text-box" length={textAreaValue.length} limit={WOOF_LIMIT} />
      </div>
    </div>
  )
}
