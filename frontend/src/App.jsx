import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
import {ThemeProvider, createGlobalStyle} from "styled-components"
//Style
import "./App.scss"
//Components
import Login from "./components/auth/Login.jsx"
import SignUp from "./components/auth/SignUp.jsx"
import Nav from "./components/main/nav/Nav.jsx"
import ProtectedComponent from "./components/ProtectedComponent.jsx"
import AllWoofer from "./components/main/woof/AllWoofer.jsx"
import MyWoofer from "./components/main/woof/MyWoofer.jsx"
import NotFound from "./components/main/not_found/NotFound.jsx"
import LandingPage from "./components/main/landing_page/LandingPage.jsx"
import Settings from "./components/main/settings/Settings.jsx"

const GlobalStyle = createGlobalStyle`
  :root{
    --main-color: ${props => props.theme.darkMode ? "#222629" : "#fff"};
    --main-text-color: ${props => props.theme.darkMode ? "#fff" : "#000" };
    --secondary-color: ${props => props.theme.darkMode ? "#61892f" : "#3b5998"};
    --tertiary-color: #86c232
  }
  body{
    background-color: var(--main-color);
    color: var(--main-text-color);
  }
`
function App() {
  const [username, setUsername] = useState("");
  const [auth, setAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(true)
  useEffect(() => {
    const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if(isDarkMode === null) return;
    setDarkMode(isDarkMode)
  }, [])
  return (
    <ThemeProvider theme={{darkMode}}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/dev">
          </Route>
          <Route path="/user/:user" 
          component={(props) => {
            const {user} = props.match.params;
            return (
              <ProtectedComponent auth={auth} setAuth={setAuth} setUsername={setUsername}>
                <header className="header">
                  <Link to="/woofer" className="header__title">Woofer</Link>
                  <Nav username={username} type={"All Woofs"} setAuth={setAuth} />
                </header>
                <section className="woof-section">
                  <MyWoofer username={user} />
                </section>
              </ProtectedComponent>
            )
          }}/>
          <Route path="/woofer">
            <ProtectedComponent auth={auth} setAuth={setAuth} setUsername={setUsername}>
              <header className="header">
                <Link to="/woofer" className="header__title">Woofer</Link>
                <Nav username={username} type={"My Woofs"} setAuth={setAuth} />
              </header>
              <section className="woof-section">
                <AllWoofer />
              </section>
            </ProtectedComponent>
          </Route>
          <Route path="/my-woofs">
            <ProtectedComponent auth={auth} setAuth={setAuth} setUsername={setUsername}>
              <header className="header">
                <Link to="/woofer" className="header__title">Woofer</Link>
                <Nav username={username} type={"All Woofs"} setAuth={setAuth} />
              </header>
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
              <header className="header">
                <Link to="/woofer" className="header__title">Woofer</Link>
                <Nav username={username} type={"My Woofs"} setAuth={setAuth} />
              </header>
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
