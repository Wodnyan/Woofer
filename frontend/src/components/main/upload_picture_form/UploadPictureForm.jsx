import React, {useState} from "react"
import axios from "axios"

export default function UploadPictureForm() {
  const [file, setFile] = useState(null);
  const fileSelectedHandler = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }
  const fileUploadHandler = () => {
    if(!file) return console.log("File is needed")
    const url = "http://localhost:3000/upload/profile-picture"
    const formData = new FormData();
    formData.append("image", file)
    axios
      .post(url, formData, {withCredentials: true})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log("Oopsie")
      })
  }
  return (
    <>
      <input type="file" onChange={fileSelectedHandler} name="image"></input>
      <button onClick={fileUploadHandler}>Upload ze file</button>
    </>
  ) 
}

