import React from 'react';
import style from "./style/Content.scss"
export default function Content(props){
  const {woof, user, postedOn} = props;
  return(
    <div className="woof-container">
      <span className="woof__user">{user}</span>
      <span className="woof__date">{postedOn}</span>
      <p className="woof__content">{woof}</p>
    </div>
  )
}
