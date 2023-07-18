import React, { useState, useContext } from 'react';
import { ParentContext } from "../App/App";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

function SignUp() {
    const {users, setUsers} = useContext(ParentContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')

    const navigate = useNavigate()

    const handleSignUp = async () => {
        for (let i=0; i < users.length; i++) {
            if (users[i].username === username) {
                alert('User already exists')
                navigate('/login')
                break
            }
        }

        if (password === confirmPass) {
            const newUser = {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    first_name: first,
                    last_name: last,
                    username: username,
                    password: password
                })
            }

            setUsers([...users, {first_name: first, last_name: last, username: username,password: password}])

            await fetch('http://localhost:3001/users', newUser)
                .then(() => alert('Account created!'))
                .catch(err => alert(`Error: ${err} \n Account could not be created`))
        } 
        else {
            alert('Passwords do not match')
        }
    }

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="signup">
                        <div className="login__field">
                            <i className="login__icon fa fa-id-badge"></i>
                            <input type="text" className="login__input" placeholder="First Name" onChange={e => setFirst(e.target.value)}/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fa fa-id-badge"></i>
                            <input type="text" className="login__input" placeholder="Last Name" onChange={e => setLast(e.target.value)}/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fa fa-user"></i>
                            <input type="text" className="login__input" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fa fa-lock"></i>
                            <input type="password" className="login__input" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fa fa-lock"></i>
                            <input type="password" className="login__input" placeholder="Confirm Password" onChange={e => setConfirmPass(e.target.value)}/>
                        </div>
                        <button className="button signup__submit" onClick={() => {handleSignUp(); navigate('/login')}}>
                            <span className="button__text">Sign Up</span>
                            <i className="button__icon fa fa-chevron-right"></i>
                        </button>
                    </form>
                    <div className="newAcct">
                        <h3>Already have an account?</h3>
                        <Link to="/login">Login here</Link>
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

export default SignUp;