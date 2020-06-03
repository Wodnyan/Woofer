import React, {useState, useEffect} from 'react';
import useGetProfilePicture from "../../../hooks/useGetProfilePicture.jsx"
import img from "../imgs/astronaut.svg"
import style from "./UserInfo.scss"
import axios from "axios"
export default function UserInfo(props){
  const {username} = props;
  const [description, setDescription] = useState("")
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const profilePic = useGetProfilePicture(username)
  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/description?username=${username}`, {cancelToken: source.token})
      .then(res => {
        setDescription(res.data)
      })
    return () => {
      source.cancel()
    }
  }, [])
  return (
    <div className="user-info-container">
      <div className="user__prof-pic">
        <img src={profilePic ? profilePic : img} style={{width: "120px"}}/>
      </div>
      <div className="user__username">
        {username}
      </div>
      <div className="user__description">
        {description}
      </div>
    </div>
  )
}
