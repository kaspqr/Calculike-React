import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { axiosPrivate } from '../api/axios'

const LOGIN_URL = '/auth'

export default function Login() {

    const { auth, setAuth } = useAuth()

    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const usernameRegex = /^[a-z0-9]{4,12}$/
    const passwordRegex = /^[a-zA-Z\d!@#$%^&*()_+={};:<>?~.-]{6,20}$/

    function validateInput(inputValue, regex) {
        return regex.test(inputValue);
    }

    useEffect(() => {
        if (auth?.user) { navigate('/') }
    }, [auth?.user, navigate])

    const handleLogin = async (e) => {
        e.preventDefault()
        const lowercaseUsername = user.toLowerCase()
        document.querySelector('#login-match').style.display = 'none'
        document.getElementById('banned').style.display = 'none'

        if (!validateInput(lowercaseUsername, usernameRegex) || !validateInput(pwd, passwordRegex)) {
            document.querySelector('#login-match').style.display = 'block'
        } else {
            try {
                const checkActive = await axiosPrivate.get(`/users/profiles/${lowercaseUsername}`)
                const active = checkActive?.data?.active
                if (active) {
                    const response = await axiosPrivate.post(LOGIN_URL, { "user": lowercaseUsername, pwd });
                    const accessToken = response?.data?.accessToken;
                    const id = response?.data?.id;
                    setAuth({ "user": lowercaseUsername, pwd, accessToken, id });
                    navigate('/');
                } else if (!checkActive?.data) {
                    document.getElementById('login-match').style.display = 'block';
                } else {
                    document.getElementById('banned').style.display = 'block';
                }

            } catch (error) {
                if (!error?.response) {
                    console.error('No Server Response');
                } else if (error.response?.status === 400) {
                    console.error('Missing Username or Password')
                } else if (error.response?.status === 401) {
                    document.querySelector('#login-match').style.display = 'block';
                    console.error('Unauthorized')
                } else {
                    console.error('Login Failed')
                }
            }
        }
    }

    return (
        <div className='home-content'>
            <div id='login-page'>
                <div id='login-box'>
                    <form id='login-form' onSubmit={handleLogin}>

                        <div id='username-div'>

                            <label className='form-label' htmlFor="user">
                                Username:
                            </label>

                            <input 
                                id='username-input'
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

                            <label className='form-label' htmlFor="pwd">
                                Password:
                            </label>

                            <input 
                                className='password-input'
                                id='password-input'
                                required 
                                type="password" 
                                name='pwd'  
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                            />

                        </div>

                        <button id='login-submit-button' type='submit'>
                            Log In
                        </button>

                        <div id='register-link'>
                            Don't have an account? <Link to="/register">Register</Link>
                        </div>

                        <div className='err-msg' style={{display: "none"}} id='login-match'>
                            Username and/or password does not match
                        </div>

                        <div className='err-msg' style={{display: "none"}} id='banned'>
                            You have been banned from the site
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}
