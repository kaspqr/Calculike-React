import React from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import { useState, useEffect, useRef } from 'react';
import useAuth from '../hooks/useAuth';

const Settings = () => {

    const { auth } = useAuth()
    const [bio, setBio] = useState('')
    const navigate = useNavigate()
    const effectRan = useRef(false)
    const USERS_URL = `/users/${auth.id}`

    async function fetchData() {
        const response = await axiosPrivate.get(USERS_URL) 
        if (response.data.bio !== undefined) {
            setBio(response.data.bio)
        }
    }

    useEffect(() => {

        if (effectRan.current === false) {
            fetchData()
            return () => { effectRan.current = true }
        }
    }, [])

    function handlePasswordChange(e) {
        e.preventDefault()
        navigate('/changepwd')
    }

    async function handleBioChange(e) {
        e.preventDefault()
        document.getElementById('empty-bio').style.display = 'none'
        document.getElementById('bio-changed').style.display = 'none'
        if (!bio.length) {
            document.getElementById('empty-bio').style.display = 'block'
        } else {
            const response = await axiosPrivate.put(USERS_URL, { "id": auth.id, "bio": bio })
            if (response.data) {
                document.getElementById('bio-changed').style.display = 'block'
            }
        }
    }


    return (
        <div className='home-content'>
            <div id='login-page'>
                <div id='login-box'>
                    <form onSubmit={handlePasswordChange} className='change-settings' id='settings-password'>

                        <div>
                            <label className='form-label' htmlFor="change-password">
                                Password:
                            </label>

                            <button className='update-settings-button' type='submit'>
                                Change Password
                            </button>

                        </div>

                    </form>

                    <form onSubmit={handleBioChange} className='change-settings'>
                        <div>

                            <label className='form-label' htmlFor="bio">
                                Bio:
                            </label>

                            <textarea 
                                id='bio'
                                maxLength="150"
                                minLength="1"
                                className='textfield-input'
                                autoComplete='off'
                                type="text" 
                                name='bio' 
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />

                        </div>

                        <button className='update-settings-button' type='submit'>
                            Update Bio
                        </button>

                        <div id='empty-bio' style={{ display: "none" }} className='err-msg'>
                            Bio cannot be empty.
                        </div>

                        <div id='bio-changed' style={{ display: "none" }} className='success-msg'>
                            Your bio has been changed successfully.
                        </div>

                    </form>
                </div>
            </div>
        </div>  
    )
}

export default Settings
