import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';

const LOGIN_URL = '/auth';

export default function Login() {

    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const usernameRegex = /^[a-z0-9]{4,12}$/;
    const passwordRegex = /^[a-zA-Z\d!@#$%^&*()_+={};:<>?~.-]{6,20}$/

    function validateInput(inputValue, regex) {
        return regex.test(inputValue);
    }

    useEffect(() => {
        if (auth?.user) { navigate('/') }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
        document.querySelector('#loginMatch').style.display = 'none';
        document.getElementById('banned').style.display = 'none';

        if (!validateInput(user, usernameRegex) || !validateInput(pwd, passwordRegex)) {
            document.querySelector('#loginMatch').style.display = 'block';
        } else {
            try {
                const checkActive = await axiosPrivate.get(`/users/profiles/${user}`)
                const active = checkActive?.data?.active
                if (active) {
                    const response = await axiosPrivate.post(LOGIN_URL, { user, pwd });
                    const accessToken = response?.data?.accessToken;
                    const id = response?.data?.id;
                    setAuth({ user, pwd, accessToken, id });
                    navigate('/');
                } else {
                    document.getElementById('banned').style.display = 'block';
                }

            } catch (error) {
                if (!error?.response) {
                    console.error('No Server Response');
                } else if (error.response?.status === 400) {
                    console.error('Missing Username or Password')
                } else if (error.response?.status === 401) {
                    document.querySelector('#loginMatch').style.display = 'block';
                    console.error('Unauthorized')
                } else {
                    console.error('Login Failed')
                }
            }
        }
    }

    return (
        <div className='homeContent'>
            <div id='loginPage'>
                <div id='loginBox'>
                    <form id='loginForm' onSubmit={handleLogin}>
                        <div id='usernameDiv'>
                            <label className='formLabel' htmlFor="user">Username:</label>
                            <input 
                                id='usernameInput'
                                autoComplete='off'
                                autoFocus
                                required 
                                type="text" 
                                name='user' 
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </div>
                        <div id='passwordDiv'>
                            <label className='formLabel' htmlFor="pwd">Password:</label>
                            <input 
                                className='passwordInput'
                                id='passwordInput'
                                required 
                                type="password" 
                                name='pwd'  
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                            />
                        </div>
                        <button id='loginSubmitButton' type='submit'>Log In</button>
                        <div id='registerLink'>
                            Don't have an account? <Link to="/register">Register</Link>
                        </div>
                        <div className='errMsg' style={{display: "none"}} id='loginMatch'>
                            Username and/or password does not match
                        </div>
                        <div className='errMsg' style={{display: "none"}} id='banned'>
                            You have been banned from the site
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
