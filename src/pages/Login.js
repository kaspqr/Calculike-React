import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import { axiosPrivate } from '../api/axios'

const LOGIN_URL = '/auth'

const Login = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errVisible, setErrVisible] = useState(false)
  const [bannedTextVisible, setBannedTextVisible] = useState(false)

  const usernameRegex = /^[a-z0-9]{4,12}$/
  const passwordRegex = /^[a-zA-Z\d!@#$%^&*()_+={};:<>?~.-]{6,20}$/

  const validateInput = (inputValue, regex) => {
    return regex.test(inputValue)
  }

  useEffect(() => {
    if (auth?.user) navigate('/')
  }, [auth?.user, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    const lowercaseUsername = user.toLowerCase()
    setErrVisible(false)
    setBannedTextVisible(false)
    if (!validateInput(lowercaseUsername, usernameRegex) || !validateInput(pwd, passwordRegex)) {
      setErrVisible(true)
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
        } else if (!checkActive?.data) setErrVisible(true)
        else setBannedTextVisible(true)

      } catch (error) {
        if (!error?.response) {
          console.error('No Server Response');
        } else if (error.response?.status === 400) {
          console.error('Missing Username or Password')
        } else if (error.response?.status === 401) {
          setErrVisible(true)
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
            <div className='err-msg' style={errVisible ? { display: "block" } : { display: "none" }} id='login-match'>
              Username and/or password does not match
            </div>
            <div className='err-msg' style={bannedTextVisible ? { display: "block" } : { display: "none" }} id='banned'>
              You have been banned from the site
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
