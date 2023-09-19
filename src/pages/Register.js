import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosPrivate } from '../api/axios'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const REGISTER_URL = '/register'
const LOGIN_URL = '/auth'

const Register = () => {

    const { auth, setAuth } = useAuth()

    const navigate = useNavigate()
    const [user, setUsername] = useState('')
    const [pwd, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const usernameRegex = /^[a-z0-9]{4,12}$/
    const passwordRegex = /^[a-zA-Z\d!@#$%^&*()_+={};:<>?~.-]{6,20}$/
    const regex = "!@#$%^&*()_+={};:<>?~.-"
    const [unTakenErrVisible, setUnTakenErrVisible] = useState(false) // un = username
    const [matchErrVisible, setMatchErrVisible] = useState(false)
    const [unErrVisible, setUnErrVisible] = useState(false) // un = username
    const [pwdErrVisible, setPwdErrVisible] = useState(false)

    const validateInput = (inputValue, regex) => {
        return regex.test(inputValue)
    }

    useEffect(() => {
        if (auth?.user) { navigate('/') }
    }, [auth?.user, navigate])

    const handleRegister = async (e) => {  
        e.preventDefault()
        const lowercaseUsername = user.toLowerCase()
        setMatchErrVisible(false)
        setUnTakenErrVisible(false)
        setUnErrVisible(false)
        setPwdErrVisible(false)

        const isValidUsername = validateInput(lowercaseUsername, usernameRegex)
        const isValidPassword = validateInput(pwd, passwordRegex)

        if (pwd === passwordCheck && isValidPassword && isValidUsername) { 
            const newUser = { "user": lowercaseUsername, "pwd": pwd }
            try {
                await axiosPrivate.post(REGISTER_URL, newUser)
                setUsername('')
                setPassword('')
                setPasswordCheck('')
                const loginResponse = await axiosPrivate.post(LOGIN_URL, { "user": lowercaseUsername, "pwd": pwd })
                const accessToken = loginResponse?.data?.accessToken
                const id = loginResponse?.data?.id
                setAuth({ "user": lowercaseUsername, pwd, accessToken, id })
                navigate('/')          
            } catch (err) {
                if (!err?.response) {
                    console.error('No server response')
                } else if (err.response?.status === 409) {
                    console.error('Username taken')
                    setUnTakenErrVisible(true)
                } else {
                    console.error('Registration failed')
                }
            }
        }
        else { 
            if (pwd !== passwordCheck) {
                setMatchErrVisible(true)
            }
            if (!isValidUsername) {
                setUnErrVisible(true)
            }
            else if (!isValidPassword) {
                setPwdErrVisible(true)
            }
        }
    }

    return (
        <div className='home-content'>
            <div id='login-page'>
                <div id='login-box'>
                    <form id='register-form' onSubmit={handleRegister}>

                        <div id='username-div'>

                            <label className='form-label' htmlFor="user">
                                Username:
                            </label>

                            <input 
                                id='username-input'
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

                            <label className='form-label' htmlFor="password">
                                Password:
                            </label>

                            <input 
                                className='password-input'
                                id='password-input'
                                required 
                                type="password" 
                                name='password' 
                                value={pwd}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                        <div id='passwordConfirmDiv'>

                            <label className='form-label' htmlFor="passwordConfirm">
                                Confirm Password:
                            </label>

                            <input 
                                className='password-input'
                                id='passwordConfirmInput'
                                required 
                                type="password" 
                                name='passwordConfirm' 
                                value={passwordCheck}
                                onChange={(e) => setPasswordCheck(e.target.value)}
                            />

                        </div>

                        <button id='login-submit-button' type='submit'>
                            Register
                        </button>

                        <div id='register-link'>
                            Already have an account? <Link to="/login">Login</Link>
                        </div>

                        <div 
                            className='err-msg' 
                            id='username-taken' 
                            style={unTakenErrVisible ? { display: "block" } : {display: "none"}}
                        >
                            Username taken, please choose another one
                        </div>

                        <div 
                            className='err-msg' 
                            id='no-pwd-match' 
                            style={matchErrVisible ? { display: "block" } : { display: "none" }}
                        >
                            Passwords do not match
                        </div>

                        <div 
                            className='err-msg' 
                            id='username-check' 
                            style={unErrVisible ? { display: "block" } : { display: "none" }}
                        >
                            Username must be 4-12 characters long and may only contain numbers and lowercase characters of the English alphabet
                        </div>

                        <div 
                            className='err-msg' 
                            id='password-check' 
                            style={pwdErrVisible ? { display: "block" } : { display: "none" }}
                        >
                            Password must be 6-20 characters long and may only contain numbers, letters of the English alphabet and the following symbols:<br />
                            {regex}
                        </div>
                        
                    </form>
                </div>
            </div>
         </div>
    )
}

export default Register
