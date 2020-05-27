import React from 'react';
import useGetProfilePicture from "../../../hooks/useGetProfilePicture.jsx"
import img from "../imgs/astronaut.svg"
import style from "./UserInfo.scss"

export default function UserInfo(props){
  const {username, description} = props;
  const profilePic = useGetProfilePicture(username)
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
