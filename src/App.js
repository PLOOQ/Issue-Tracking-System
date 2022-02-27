import "./App.css";
import axios from 'axios';
import { useState } from "react";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


function App() {

  const token = sessionStorage.setItem('')
  const [isToken, setIsToken] = useState(false);
  
  const loginHandler = (token) =>{
    setToken(token);
    setIsToken(true);
  }

  if (!isToken)
  {
    return (
      <div>
        <Auth 
        loginHandler={loginHandler}
        />
      </div>
    )
  }
  else if (isToken)
  {
    return (
      <div className="App">
        <Dashboard
        token={token}
        />
      </div>
    );
  }
}
export default App;
