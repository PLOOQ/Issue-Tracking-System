import './Auth.css'
import './Login.css'
import { useState } from "react";

function Login(props)
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameChangeHandler = (event) =>{
        setUsername(event.target.value);
    }
    const onPasswordChangeHandler = (event) =>{
        setPassword(event.target.value)
    }

    return(
        <div className="auth_background">
                <form className="login_form">
                    <div> Login Page </div>

                    <label>
                        <p>Username</p>
                        <input 
                        onChange={onUsernameChangeHandler}
                        type="text"/>
                    </label>

                    <label>
                        <p>Password</p>
                        <input 
                        onChange={onPasswordChangeHandler}
                        type="password"
                        />
                    </label>
                    
                    <div className="buttons_wrapper">
                        <button onClick={(event)=>{
                            const data = JSON.stringify(
                                {
                                    'username':username,
                                    'password':password,
                                }
                            )
                            event.preventDefault();
                            fetch('http://localhost:8080/api-token-auth/',{
                                method:'POST',
                                body:data,
                                headers: { 
                                    "Content-Type":"application/json",
                                },
                            })
                            .then((response) =>response.json())
                            .then(data => {
                                if('token' in data)
                                {
                                    props.loginHandler(data.token);
                                }
                            })
                            }}> 
                        Login </button>
                        <button
                        onClick={(event)=>{
                            event.preventDefault();
                            props.setLogin(false)}
                        } 
                        >Sign Up</button>
                    </div>
                </form>
        </div>
    )
}


export default Login;