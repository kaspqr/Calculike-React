import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const REGISTER_URL = '/register'
const LOGIN_URL = '/auth';

export default function Register() {

    const { auth, setAuth } = useAuth()

    const navigate = useNavigate();
    const [user, setUsername] = useState('');
    const [pwd, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const usernameRegex = /^[a-z0-9]{4,12}$/;
    const passwordRegex = /^[a-zA-Z\d!@#$%^&*()_+={};:<>?~.-]{6,20}$/
    const regex = "!@#$%^&*()_+={};:<>?~.-"

    function validateInput(inputValue, regex) {
        return regex.test(inputValue);
    }

    useEffect(() => {
        if (auth?.user) { navigate('/') }
    }, [])

    const handleRegister = async (e) => {
        e.preventDefault();
        const lowercaseUsername = user.toLowerCase()
        setUsername(lowercaseUsername)
        document.querySelector('#noPwdMatch').style.display = 'none';
        document.querySelector('#unTaken').style.display = 'none';
        document.getElementById('usernameCheck').style.display = 'none'
        document.getElementById('passwordCheck').style.display = 'none'

        const isValidUsername = validateInput(user, usernameRegex)
        const isValidPassword = validateInput(pwd, passwordRegex)

        if (pwd === passwordCheck && isValidPassword && isValidUsername) { 
            const newUser = { "user": user, "pwd": pwd }
            try {
                await axiosPrivate.post(REGISTER_URL, newUser);
                setUsername('');
                setPassword('');
                setPasswordCheck('');
                const loginResponse = await axiosPrivate.post(LOGIN_URL, { "user": user, "pwd": pwd });
                const accessToken = loginResponse?.data?.accessToken;
                const id = loginResponse?.data?.id;
                setAuth({ user, pwd, accessToken, id });
                navigate('/')          
            } catch (err) {
                if (!err?.response) {
                    console.error('No server response')
                } else if (err.response?.status === 409) {
                    console.error('Username taken')
                    document.querySelector('#unTaken').style.display = 'block';
                } else {
                    console.error('Registration failed')
                }
            }
        }
        else { 
            if (pwd !== passwordCheck) {
                document.querySelector('#noPwdMatch').style.display = 'block';
            }
            if (!isValidUsername) {
                document.getElementById('usernameCheck').style.display = 'block'
            }
            else if (!isValidPassword) {
                document.getElementById('passwordCheck').style.display = 'block'
            }
        }
    }

    return (
        <div className='homeContent'>
            <div id='loginPage'>
                <div id='loginBox'>
                    <form id='registerForm' onSubmit={handleRegister}>
                        <div id='usernameDiv'>
                            <label className='formLabel' htmlFor="user">Username:</label>
                            <input 
                                id='usernameInput'
                                required 
                                autoFocus
                                autoComplete='off'
                                type="text" 
                                name='user' 
                                value={user}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div id='passwordDiv'>
                            <label className='formLabel' htmlFor="password">Password:</label>
                            <input 
                                className='passwordInput'
                                id='passwordInput'
                                required 
                                type="password" 
                                name='password' 
                                value={pwd}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div id='passwordConfirmDiv'>
                            <label className='formLabel' htmlFor="passwordConfirm">Confirm Password:</label>
                            <input 
                                className='passwordInput'
                                id='passwordConfirmInput'
                                required 
                                type="password" 
                                name='passwordConfirm' 
                                value={passwordCheck}
                                onChange={(e) => setPasswordCheck(e.target.value)}
                            />
                        </div>
                        <button id='loginSubmitButton' type='submit'>Register</button>
                        <div id='registerLink'>
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                        <div className='errMsg' id='unTaken' style={{display: "none"}}>
                            Username taken, please choose another one
                        </div>
                        <div className='errMsg' id='noPwdMatch' style={{display: "none"}}>
                            Passwords do not match
                        </div>
                        <div className='errMsg' id='usernameCheck' style={{display: "none"}}>
                            Username must be 4-12 characters long and may only contain numbers and lowercase characters of the English alphabet
                        </div>
                        <div className='errMsg' id='passwordCheck' style={{display: "none"}}>
                            Password must be 6-20 characters long and may only contain numbers, letters of the English alphabet and the following symbols:<br />
                            {regex}
                        </div>
                    </form>
                </div>
            </div>
         </div>
    )
}
