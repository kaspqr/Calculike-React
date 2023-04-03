import React from 'react'
import { Link } from "react-router-dom";
import { axiosPrivate } from '../api/axios';
import { useState, useEffect, useRef } from 'react';
import useAuth from "../hooks/useAuth";

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

    function validateInput(inputValue, regex) {
        return regex.test(inputValue);
    }

    async function fetchData() {
        const response = await axiosPrivate.get(USERS_URL) 
        setCurrentUser(response.data)
    }

    useEffect(() => {

        if (effectRan.current === false) {
            fetchData()
            return () => { effectRan.current = true }
        }
    }, [])

    async function handleChangePwd(e) {
        e.preventDefault()
        document.getElementById('oldPwdCheck').style.display = 'none'
        document.getElementById('newPwdMatch').style.display = 'none'
        document.getElementById('newPwdLengthErr').style.display = 'none'
        document.getElementById('pwdChanged').style.display = 'none'
        const isValidPwd = validateInput(newPwd, passwordRegex)
        const isOldPwdValid = validateInput(password, passwordRegex)
        if (!isOldPwdValid) { document.getElementById('oldPwdCheck').style.display = 'block' }
        if (newPwd !== newPwdConfirm) { document.getElementById('newPwdMatch').style.display = 'block' }
        if (!isValidPwd) { document.getElementById('newPwdLengthErr').style.display = 'block' }
        if (newPwd.length >= 6 && newPwd === newPwdConfirm && isValidPwd && isOldPwdValid) {
            try {
                const accessToken = auth?.accessToken
                const id = auth?.id
                const response = await axiosPrivate.put(USERS_URL, { "id": currentUser._id, "pwd": password, "newPwd": newPwd })
                const user = response.data.user
                const pwd = response.data.pwd
                setAuth({ user, pwd, accessToken, id })
                document.getElementById('pwdChanged').style.display = 'block'
                setPassword('')
                setNewPwd('')
                setNewPwdConfirm('')
            } catch(error) {
                if (!error?.response) {
                    console.error('No Server Response');
                } else if (error.response?.status === 401) {
                    console.error('Current password is incorrect')
                    document.getElementById('oldPwdCheck').style.display = 'block'
                }
            }
        }
    }


    return (
        <div className='homeContent'>
            <div id='loginPage'>
                <div id='loginBox'>
                    <form onSubmit={handleChangePwd} id='changePassword'>
                        <div id='oldPasswordDiv'>
                            <label className='formLabel' htmlFor="oldPassword">Current Password:</label>
                            <input 
                                id='oldPasswordInput'
                                className='passwordInput'
                                autoComplete='off'
                                autoFocus
                                required 
                                type="password" 
                                name='oldPassword' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div id='newPasswordDiv'>
                            <label className='formLabel' htmlFor="newPassword">New Password:</label>
                            <input 
                                className='passwordInput'
                                id='newPasswordInput'
                                required 
                                type="password" 
                                name='newPassword'  
                                value={newPwd}
                                onChange={(e) => setNewPwd(e.target.value)}
                            />
                        </div>
                        <div id='newPasswordConfirmDiv'>
                            <label className='formLabel' htmlFor="newPasswordConfirm">Confirm New Password:</label>
                            <input 
                                className='passwordInput'
                                id='newPasswordConfirmInput'
                                required 
                                type="password" 
                                name='newPasswordConfirm'  
                                value={newPwdConfirm}
                                onChange={(e) => setNewPwdConfirm(e.target.value)}
                            />
                        </div>
                        <button id='loginSubmitButton' type='submit'>Change Password</button>
                        <div id='registerLink'>
                            Changed your mind? <Link to="/settings">Go back</Link>
                        </div>
                        <div className='errMsg' style={{display: "none"}} id='newPwdMatch'>
                            New passwords do not match
                        </div>
                        <div className='errMsg' style={{display: "none"}} id='oldPwdCheck'>
                            The current password you entered was incorrect
                        </div>
                        <div className='errMsg' style={{display: "none"}} id='newPwdLengthErr'>
                            Password must be 6-20 characters long and may only contain letters, numbers and the following digits:
                            <br />
                            {regex}
                        </div>
                        <div className='successMsg' style={{display: "none"}} id='pwdChanged'>
                            Your password was changed successfully
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePwd
