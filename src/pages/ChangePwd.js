import React from 'react'
import { Link } from "react-router-dom"
import { axiosPrivate } from '../api/axios'
import { useState, useEffect, useRef } from 'react'
import useAuth from "../hooks/useAuth"

const ChangePwd = () => {

    const { auth, setAuth } = useAuth()
    const effectRan = useRef(false)
    const USERS_URL = `/users/${auth.id}`
    const [currentUser, setCurrentUser] = useState()
    const [password, setPassword] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [newPwdConfirm, setNewPwdConfirm] = useState('')
    const passwordRegex = /^[a-zA-Z\d!@#$%^&*()_+={};:<>?~.-]{6,20}$/
    const regex = "!@#$%^&*()_+={};:<>?~.-"
    const [oldPwdErrVisible, setOldPwdErrVisible] = useState(false)
    const [newPwdMatchErrVisible, setNewPwdMatchErrVisible] = useState(false)
    const [newPwdErrVisible, setNewPwdErrVisible] = useState(false)
    const [successMsgVisible, setSuccessMsgVisible] = useState(false)

    const validateInput = (inputValue, regex) => {
        return regex.test(inputValue)
    }

    const fetchData = async () => {
        const response = await axiosPrivate.get(USERS_URL) 
        setCurrentUser(response.data)
    }

    useEffect(() => {
        if (effectRan.current === false) {
            fetchData()
            return () => { effectRan.current = true }
        }
    }, [])

    const handleChangePwd = async (e) => {
        e.preventDefault()

        setOldPwdErrVisible(false)
        setNewPwdMatchErrVisible(false)
        setNewPwdErrVisible(false)
        setSuccessMsgVisible(false)

        const isValidPwd = validateInput(newPwd, passwordRegex)
        const isOldPwdValid = validateInput(password, passwordRegex)

        if (!isOldPwdValid) setOldPwdErrVisible(true)

        if (newPwd !== newPwdConfirm) setNewPwdMatchErrVisible(true)

        if (!isValidPwd) setNewPwdErrVisible(true)

        if (newPwd.length >= 6 && newPwd === newPwdConfirm && isValidPwd && isOldPwdValid) {
            try {
                const accessToken = auth?.accessToken
                const id = auth?.id
                const response = await axiosPrivate.put(USERS_URL, { "id": currentUser._id, "pwd": password, "newPwd": newPwd })
                const user = response.data.user
                const pwd = response.data.pwd
                setAuth({ user, pwd, accessToken, id })
                setSuccessMsgVisible(true)
                setPassword('')
                setNewPwd('')
                setNewPwdConfirm('')
            } catch(error) {
                if (!error?.response) {
                    console.error('No Server Response')
                } else if (error.response?.status === 401) {
                    console.error('Current password is incorrect')
                    setOldPwdErrVisible(true)
                }
            }
        }
    }


    return (
        <div className='home-content'>
            <div id='login-page'>
                <div id='login-box'>
                    <form onSubmit={handleChangePwd} id='change-password'>
                        <div>

                            <label className='form-label' htmlFor="old-password">
                                Current Password:
                            </label>

                            <input 
                                className='password-input'
                                autoComplete='off'
                                autoFocus
                                required 
                                type="password" 
                                name='old-password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                        <div>

                            <label className='form-label' htmlFor="new-password">
                                New Password:
                            </label>

                            <input 
                                className='password-input'
                                required 
                                type="password" 
                                name='new-password'  
                                value={newPwd}
                                onChange={(e) => setNewPwd(e.target.value)}
                            />

                        </div>

                        <div>

                            <label className='form-label' htmlFor="new-password-confirm">
                                Confirm New Password:
                            </label>

                            <input 
                                className='password-input'
                                required 
                                type="password" 
                                name='new-password-confirm'  
                                value={newPwdConfirm}
                                onChange={(e) => setNewPwdConfirm(e.target.value)}
                            />

                        </div>

                        <button title='Change Password' id='login-submit-button' type='submit'>
                            Change Password
                        </button>

                        <div id='register-link'>
                            Changed your mind? <Link to="/settings">Go back</Link>
                        </div>

                        <div 
                            className='err-msg' 
                            style={newPwdMatchErrVisible ? { display: "block" } : { display: "none" }} 
                            id='new-pwd-match'
                        >
                            New passwords do not match
                        </div>

                        <div 
                            className='err-msg' 
                            style={oldPwdErrVisible ? { display: "block" } : { display: "none" }} 
                            id='old-pwd-check'
                        >
                            The current password you entered was incorrect
                        </div>

                        <div 
                            className='err-msg' 
                            style={newPwdErrVisible ? { display: "block" } : {display: "none"}} 
                            id='new-pwd-length-err'
                        >
                            Password must be 6-20 characters long and may only contain letters, numbers and the following digits:
                            <br />
                            {regex}
                        </div>

                        <div 
                            className='success-msg' 
                            style={successMsgVisible ? { display: "block" } : {display: "none"}} 
                            id='pwd-changed'
                        >
                            Your password was changed successfully
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePwd
