import React, {useState} from "react"
import axios from "axios"

export default function UploadPictureForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const fileSelectedHandler = (e) => {
    setFile(e.target.files[0])
  }
  const fileUploadHandler = () => {
    if(!file) return setError("File is needed") 
    const url = "http://localhost:3000/upload/profile-picture"
    const formData = new FormData();
    formData.append("image", file)
    axios
      .post(url, formData, {withCredentials: true})
      .then(res => {
        if(res.data.error) {
          setError(res.data.error)
        }
        else{
          console.log(res)
          setError("")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      {error && <h1 style={{color: "red"}}>{error}</h1>}
      <input style={{color: "red"}} type="file" onChange={fileSelectedHandler} name="image"></input>
      <button onClick={fileUploadHandler}>Upload ze file</button>
    </>
  ) 
}

