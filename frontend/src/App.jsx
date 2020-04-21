import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
//Style
import style from "./App.scss"
//Components
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import Header from "./components/main/nav/Header.jsx";
import Nav from "./components/main/nav/Nav.jsx";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h1>Hello</h1>
        </Route>
        <Route path="/woofer">
          <Header>
            <h1 className="header__title">Woofer</h1>
            <Nav/>
          </Header>
        </Route>
        <Route path="/account/sign-up">
          <SignUp/>
        </Route>
        <Route path="/account/login">
          <Login/>
        </Route>
        <Route path="*" component={() => "404 not found"}/>
      </Switch>
    </Router>
  );
}

export default App;
