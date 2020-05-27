import React, {useEffect, useState} from "react"
import axios from "axios"
export default function useGetProfilePicture(username) {
  const [profImg, setProfImg] = useState(null)
  useEffect(() => {
    axios
      .post("http://localhost:3000/user/profile-picture", {username},{withCredentials: true})
      .then(res => {
        if(res.data) setProfImg(`http://localhost:3000/${res.data}`)
      })
  }, [])
  return profImg
}

