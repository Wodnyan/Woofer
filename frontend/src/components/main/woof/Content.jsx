import React from 'react';
export default function Content(props){
  const {woof, user, postedOn} = props;
  return(
    <div className="woof-container">
      <h1 className="woof__user">{user}</h1>
      <p className="woof__content">{woof}</p>
      <h5 className="woof__date">{postedOn}</h5>
    </div>
  )
}
