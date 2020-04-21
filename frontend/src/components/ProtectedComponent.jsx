import React, {useState} from 'react';
export default function ProtectedComponent(props){
  if(props.isAuth){
    return props.children;
  }
  else{
    return <Redirect to="/account/redirect"/>
  }
}
