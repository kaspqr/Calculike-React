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
        document.getElementById('emptyBio').style.display = 'none'
        document.getElementById('bioChanged').style.display = 'none'
        if (!bio.length) {
            document.getElementById('emptyBio').style.display = 'block'
        } else {
            const response = await axiosPrivate.put(USERS_URL, { "id": auth.id, "bio": bio })
            if (response.data) {
                document.getElementById('bioChanged').style.display = 'block'
            }
        }
    }


    return (
        <div className='homeContent'>
            <div id='loginPage'>
                <div id='loginBox'>
                    <form onSubmit={handlePasswordChange} className='changeSettings' id='settingsPassword'>
                        <div id='changePasswordDiv'>
                            <label className='formLabel' htmlFor="changepassword">Password: (encrypted)</label>
                            <button className='updateSettingsButton' type='submit'>Change Password</button>
                        </div>
                    </form>
                    <form onSubmit={handleBioChange} className='changeSettings' id='changeBio'>
                        <div id='bioDiv'>
                            <label className='formLabel' htmlFor="bio">Bio:</label>
                            <textarea 
                                id='bio'
                                maxLength="150"
                                minLength="1"
                                className='textfieldInput'
                                autoComplete='off'
                                type="text" 
                                name='bio' 
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                        <button className='updateSettingsButton' type='submit'>Update Bio</button>
                        <div id='emptyBio' style={{ display: "none" }} className='errMsg'>
                            Bio cannot be empty.
                        </div>
                        <div id='bioChanged' style={{ display: "none" }} className='successMsg'>
                            Your bio has been changed successfully.
                        </div>
                    </form>
                </div>
            </div>
        </div>  
    )
}

export default Settings
