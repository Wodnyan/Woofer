import React, {useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import {ThemeProvider, createGlobalStyle} from "styled-components"
//Style
import "./App.scss"
//Components
import Login from "./components/auth/Login.jsx"
import SignUp from "./components/auth/SignUp.jsx"
import Header from "./components/main/nav/Header.jsx"
import Nav from "./components/main/nav/Nav.jsx"
import ProtectedComponent from "./components/ProtectedComponent.jsx"
import AllWoofer from "./components/main/woof/AllWoofer.jsx"
import MyWoofer from "./components/main/woof/MyWoofer.jsx"
import NotFound from "./components/main/not_found/NotFound.jsx"
import LandingPage from "./components/main/landing_page/LandingPage.jsx"
import Settings from "./components/main/settings/Settings.jsx"
import SwitchSlider from "./components/main/switch/Switch.jsx"
//Make these values global so everything changes;
const GlobalStyle = createGlobalStyle`
  :root{
    --main-color: ${props => props.theme.darkMode ? "#222629" : "#fff"};
    --main-text-color: ${props => props.theme.darkMode ? "#fff" : "#000" };
    --secondary-color: ${props => props.theme.darkMode ? "#61892f" : "#3b5998"};
    --tertiary-color: #86c232
  }
  body{
    color: var(--main-text-color);
  }
`
function App() {
  const [username, setUsername] = useState("");
  const [auth, setAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(true)
  return (
    <ThemeProvider theme={{darkMode}}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/dev">
            <SwitchSlider />
          </Route>
          <Route path="/woofer">
            <ProtectedComponent auth={auth} setAuth={setAuth} setUsername={setUsername}>
              <Header>
                {username}
                <h1 className="header__title">Woofer</h1>
                <Nav username={username} type={"My Woofs"} setAuth={setAuth} />
              </Header>
              <section className="woof-section">
                <AllWoofer />
              </section>
            </ProtectedComponent>
          </Route>
          <Route path="/my-woofs">
            <ProtectedComponent auth={auth} setAuth={setAuth} setUsername={setUsername}>
              <Header>
                {username}
                <h1 className="header__title">Woofer</h1>
                <Nav username={username} type={"All Woofs"} setAuth={setAuth} />
              </Header>
              <section className="woof-section">
                <MyWoofer username={username} />
              </section>
            </ProtectedComponent>
          </Route>
          <Route exact path="/account/sign-up">
            <SignUp setUsername={setUsername} username={username} auth={setAuth} />
          </Route>
          <Route exact path="/account/login">
            <Login setUsername={setUsername} username={username} auth={setAuth} />
          </Route>
          <Route exact path="/settings">
            <ProtectedComponent auth={auth} setAuth={setAuth} setUsername={setUsername}>
              <Header>
                {username}
                <h1 className="header__title">Woofer</h1>
                <Nav username={username} type={"All Woofs"} setAuth={setAuth} />
              </Header>
              <Settings setDarkMode={setDarkMode} darkMode={darkMode}/>
            </ProtectedComponent>
          </Route>
          <Route path="*" render={(props)=> <NotFound />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
export default App;
