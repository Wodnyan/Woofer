import React, {useState} from 'react';
import axios from "axios"
import CharCounter from "../char_counter/CharCounter.jsx"
import useSendTextAreaValue from "../../../hooks/useSendTextAreaValue.jsx"
import "./style/Description.scss"
export default function Description(props) {
  const url = "http://localhost:3000/user/description"
  const {textAreaValue, handleClick, handleChange, textLength} = useSendTextAreaValue()
  const data = {description: textAreaValue}
  const descriptionLimit = 250;
  return (
    <div className="settings-description">
      <textarea placeholder="Describe yourself here..." onChange={handleChange} value={textAreaValue}/>
      <div className="description-bottom">
        <CharCounter limit={descriptionLimit} length={textLength}/ >
        <button className="description-btn" onClick={() => handleClick(url, data, descriptionLimit)}>Submit</button>
      </div>
    </div>
  )
}
