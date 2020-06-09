import React, {useState} from "react"
import axios from "axios"

export default function useSendTextAreaValue () {
  const [textAreaValue, setTextAreaValue] = useState("")
  const handleClick = (url, data, limit) => {
    if(!textAreaValue) return;
    if(textAreaValue.length > limit) return;
    axios
      .post(url, data, {withCredentials: true})
      .then((resp) => {
        setTextAreaValue("")
      })
  }

  const handleChange = (e) => {
    setTextAreaValue(e.target.value);
  }
  return {textAreaValue, handleClick, handleChange}
}