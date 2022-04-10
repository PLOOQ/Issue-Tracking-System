import "./App.css";
import axios from 'axios';
import { useState } from "react";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


function App() {

  const sessionToken = sessionStorage.getItem('token')
  const [token,setToken] = useState(sessionToken)
  
  const loginHandler = (token) =>
  {
    sessionStorage.setItem('token',token)
    setToken(token)
  }

  const logoutHandler = () =>
  {
    sessionStorage.clear();
    setToken(null)
  }

  if (!token)
  {
    return (
      <div>
        <Auth 
        loginHandler={loginHandler}
        />
      </div>
    )
  }
  else if (token)
  {
    return (
      <div className="App">
        <Navbar
        logoutHandler={logoutHandler}
        />
        <Dashboard
        token={token}
        />
      </div>
    );
  }
}
export default App;
