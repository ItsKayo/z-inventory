import React, { useState, useContext } from 'react';
import { ParentContext } from "../App/App";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
    const {users, setLoggedInUser, setAuth} = useContext(ParentContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = () => {
        for (let i=0; i < users.length; i++) {
            if ((users[i].username !== username) && (i === users.length-1))
            {
                alert('User does not exist')
                return
            }

            if ((users[i].username === username) && (users[i].password === password)) {
                setAuth(true)
                setLoggedInUser(users[i].first_name + ' ' + users[i].last_name)
                alert('Logged in')
                navigate('/inventory')
                return
            }
        }
        alert('Incorrect login')
    }

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login">
                        <div className="login__field">
                            <i className="login__icon fa fa-user"></i>
                            <input type="text" className="login__input" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fa fa-lock"></i>
                            <input type="password" className="login__input" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <button className="button login__submit" onClick={() => handleLogin()}>
                            <span className="button__text">Log In Now</span>
                            <i className="button__icon fa fa-chevron-right"></i>
                        </button>
                    </form>
                    <div className="newAcct">
                        <h3>New account?</h3>
                        <Link to="/signup">Sign up here</Link>
                    </div>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    )
}

export default Login;