import { useState } from "react";

function Signup(props)
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const onUsernameChangeHandler = (event) =>{
        setUsername(event.target.value);
    }
    const onPasswordChangeHandler = (event) =>{
        setPassword(event.target.value)
    }
    const onPasswordConfirmChangeHandler = (event) =>{
        setPasswordConfirm(event.target.value)
    }

    const createAccountHandler = (event) =>{
        event.preventDefault();
        const data = JSON.stringify(
            {
                'username':username,
                'password':password,
            }
        )
            if (!(password === passwordConfirm))
            {
                alert("The passwords do not match!")
            }
            else if (password === passwordConfirm)
            {
                fetch('https://mighty-issue-tracking-system.herokuapp.com/users/',
                {
                    method:"POST",
                    body:data,
                    headers: { "Content-Type": "application/json"},
                }
                )
            }
    } 

    return(
        <div className="auth_background">
            <form className="login_form">
                <div> Signup Page </div>

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


                <label>
                    <p>Confirm Password</p>
                    <input 
                    onChange={onPasswordConfirmChangeHandler}
                    type="password"
                    />
                </label>

                <p> Please create a unique password with at least 8 characters <br/>
                    in length and one special character </p>
                
                <div className="buttons_wrapper">
                    <button onClick={createAccountHandler}> 
                        Create Account 
                    </button>
                </div>
                <div className="buttons_wrapper">
                    <button onClick={()=>{props.setLogin(true)}}> 
                        Return to login
                    </button>
                </div>
            </form>
        </div>
    )
}


export default Signup;