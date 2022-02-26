import "./App.css";
import axios from 'axios';
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


function App() {

  const token=sessionStorage.getItem('token');
  const loginHandler = (token) =>{
    sessionStorage.setItem('token',token);
  }

  if (token)
  {
    return (
      <div>
        <Auth 
        loginHandler={loginHandler}
        />
      </div>
    )
  }
  else if (!token)
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
