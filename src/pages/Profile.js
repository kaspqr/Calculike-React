import React from 'react'
import { useParams } from "react-router-dom";
import { axiosPrivate } from '../api/axios';
import { useState, useEffect, useRef } from 'react';
import Novice from '../images/novice.png'
import Apprentice from '../images/apprentice.png'
import Practitioner from '../images/practitioner.png'
import Mathematician from '../images/mathematician.png'
import Prodigy from '../images/prodigy.png'
import Expert from '../images/expert.png'
import Grandmaster from '../images/grandmaster.png'
import Archimedes from '../images/archimedes.png'
import Pythagoras from '../images/pythagoras.png'

const Profile = () => {
    const effectRan = useRef(false)
    const params = useParams()
    const USERS_URL = `users/profiles/${params.id}`
    const [user, setUser] = useState({})
    const [bio, setBio] = useState('')
    const [isResponse, setIsResponse] = useState(true)

    async function fetchData() {
        const response = await axiosPrivate.get(USERS_URL) 
        const active = response?.data?.active
        if (active) {
            setUser(Object.entries(response.data))
            setBio(response.data.bio)
        } else {
            setIsResponse(false)
        }
    }

    useEffect(() => {

        if (effectRan.current === false) {
            fetchData()
            return () => { effectRan.current = true }
        }
    }, [])

    let userItems = []
    let username

    let light = 0

    let points = 0

    for (let item in user) {
        if ((user[item][0].startsWith('add') || 
            user[item][0].startsWith('multiply') || 
            user[item][0].startsWith('subtract') || 
            user[item][0].startsWith('divide') || 
            user[item][0].startsWith('combo')) && 
            user[item][1] > 0) {

            let level

            const temp = user[item][0]

            if (user[item][0].endsWith('all')) {
                points += user[item][1]
                let index = temp.indexOf('all')
                level = temp.slice(0, index) + " lvl All"
            } else {
                level = temp.slice(0, temp.length - 1) + " lvl " + temp[temp.length - 1]
            }

            level = level[0].toUpperCase() + level.slice(1)

            userItems.push(
                <tr className={light % 2 === 0 ? 'profile-tr-1' : 'profile-tr-2'} key={item}>
                <td className='profile-key-td'>{level}</td>
                <td className='profile-value-td'>{user[item][1]}</td></tr>
            )

            light++

        } else if (user[item][0] === 'user') {
            username = user[item][1]
        }
    }

    let rank = Novice
    let rankName = "Novice"

    points = points / 5

    if (points < 100) { 
        rank = Novice 
        rankName = "Novice"
    }
    else if (points < 1000) { 
        rank = Apprentice 
        rankName = "Apprentice"
    }
    else if (points < 10000) { 
        rank = Practitioner 
        rankName = "Practitioner"
    }
    else if (points < 50000) { 
        rank = Mathematician 
        rankName = "Mathematician"
    }
    else if (points < 100000) { 
        rank = Prodigy 
        rankName = "Prodigy"
    }
    else if (points < 150000) { 
        rank = Expert 
        rankName = "Expert"
    }
    else if (points < 200000) { 
        rank = Grandmaster 
        rankName = "Grandmaster"
    }
    else if (points < 250000) { 
        rank = Archimedes 
        rankName = "Archimedes"
    }
    else { 
        rank = Pythagoras 
        rankName = "Pythagoras"
    }

    if (!isResponse) {
        return (
            <div className='profile-content'>
                <div style={{textAlign: "center"}}>
                    Error 404: User not found
                </div>
            </div>
        )
    }

    return (
        <div className='profile-content'>

            <header id='profile-username'>
                <b>{username}</b>
            </header>

            <br />

            <div id='profile-rank-div'>
                <img className='badge-png' src={rank} alt="novicebadge" />
            </div>

            <br />

            <p className='rank-name'>
                {rankName}
            </p>

            <p id='profile-points-div'>
                {Math.floor(points)} points
            </p>

            <br />

            <p id='profile-bio-div'>
                <i>{bio}</i>
            </p>

            {points > 0 
                ? <><br /><div className='profile-scores-title'>Scores</div></>
                : null
            }

            <table id='profile-table'>
                <tbody>
                    {userItems}
                </tbody>
            </table>

        </div>
    )
}

export default Profile
