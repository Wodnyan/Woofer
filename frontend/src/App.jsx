import React from 'react';
import style from "./App.scss"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/SignUp.jsx";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
        </Route>
        <Route path="/account/sign-up">
          <SignUp/>
        </Route>
        <Route path="/account/login">
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
