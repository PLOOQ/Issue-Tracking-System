import './Navbar.css'

function Navbar (props)
{
    return(
        <div>
            <nav className="navbar">
                <div className='logout_button_div'>
                    <button className='logout_button' onClick={props.logoutHandler}> 
                        Log Out
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;