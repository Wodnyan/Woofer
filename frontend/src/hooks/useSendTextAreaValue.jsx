import React, {useState} from "react"
import axios from "axios"
import {socket} from "../App.jsx"
export default function useSendTextAreaValue () {
  const [textAreaValue, setTextAreaValue] = useState("")
  const [textLength, setTextLength] = useState(0)
  const handleClick = (url, data, limit) => {
    if(!textAreaValue) return;
    if(textLength > limit) return;
    axios
      .post(url, data, {withCredentials: true})
      .then(() => {
        setTextAreaValue("")
        setTextLength(0)  
      })
  }

  const handleChange = (e) => {
    const target = e.target
    setTextAreaValue(target.value);
    setTextLength(e.target.value.length);
  }
  return {textAreaValue, handleClick, handleChange, textLength}
}
