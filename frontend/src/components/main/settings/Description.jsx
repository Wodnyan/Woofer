import React, {useState} from 'react';
import axios from "axios"
export default function Description(props) {
  const [textAreaValue, setTextareaValue] = useState("")
  const handleChange = (e) => {
      const target = e.target;
      setTextareaValue(target.value)
  }
  const handleClick = () => {
      if(!textAreaValue) return;
      const url = "http://localhost:3000/user/description"
      axios
       .post(url, {description: textAreaValue}, {withCredentials: true})
       .then(res => {
         console.log(res)
        })
      console.log(textAreaValue)
      setTextareaValue("")
  }
  return (
    <div className="settings-description">
      <textarea placeholder="Describe yourself here..." onChange={handleChange} value={textAreaValue}/>
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}
