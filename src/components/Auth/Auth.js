import './Auth.css'
import { useState } from 'react';
import Login from './Login';
import SignUp from './Signup';


function Auth(props)
{
    const [login , setLogin] = useState(true)
   
    if(login)
        {
            return(
            <Login
            setLogin={setLogin}
            loginHandler={props.loginHandler}
            />
            )
        }

    else if (!login)
    {
        return (
        <SignUp
        setLogin={setLogin}
        />)
    }
}


export default Auth;