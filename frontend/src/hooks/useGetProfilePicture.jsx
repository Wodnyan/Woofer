import React, {useEffect, useState} from "react"
import axios from "axios"
export default function () {
  const [profImg, setProfImg] = useState(null)
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/profile-picture")
      .then(res => {
        setProfImg(res.data)
      })
  })
  return profImg
}

