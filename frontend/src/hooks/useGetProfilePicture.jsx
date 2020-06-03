import React, {useEffect, useState} from "react"
import axios from "axios"
export default function useGetProfilePicture(username) {
  const [profImg, setProfImg] = useState(null)
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  useEffect(() => {
    axios
      .post("http://localhost:3000/user/profile-picture", {username}, {cancelToke: source.token})
      .then(res => {
        if(res.data) setProfImg(`http://localhost:3000/${res.data}`)
      })
    return () => {
      source.cancel()
    }
  }, [])
  return profImg
}

