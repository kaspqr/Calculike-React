import React, { useEffect, useRef, useState } from 'react';
import { axiosPrivate } from '../api/axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Hiscores() {
    const effectRan = useRef(false)
    const USERS_URL = '/users'
    const searchRef = useRef('comboall')
    const [hiscoreUsers, setHiscoreUsers] = useState([])

    async function fetchData() {
        const response = await axiosPrivate.get(USERS_URL) 
        const filteredResponse = response.data.filter(user => user[searchRef.current] > 0)
        const activeResponse = filteredResponse.filter(user => user.active === true)
        const finalResponse = activeResponse.sort((a, b) => b[searchRef.current] - a[searchRef.current])
        const finalResult = finalResponse.slice(0, 10)
        setHiscoreUsers(finalResult)
    }

    useEffect(() => {

        if (effectRan.current === false) {
            fetchData()
            return () => { effectRan.current = true }
        }
    }, [])

    function handleHiscoreSearch(e) {
        e.preventDefault()
        const calcSelect = document.getElementById('calcSelect').value
        const levelSelect = document.getElementById('levelSelect').value
        searchRef.current = (calcSelect + levelSelect)
        fetchData()
    }

    return (
        <div className='profileContent'>
            <div id='hiscoreContent'>
                <div id='searchDiv'>
                    <form onSubmit={handleHiscoreSearch}>
                        <div id='insideForm'>
                            <select id="calcSelect" className="hsSelect">
                                <option className="calcOption" value="combo">Combo</option>
                                <option className="calcOption" value="add">Add</option>
                                <option className="calcOption" value="subtract">Subtract</option>
                                <option className="calcOption" value="multiply">Multiply</option>
                                <option className="calcOption" value="divide">Divide</option>
                            </select>
                            <select id="levelSelect" className="hsSelect">
                                <option className="calcOption" value="all">All</option>
                                <option className="calcOption" value="3">Lvl 3</option>
                                <option className="calcOption" value="2">Lvl 2</option>
                                <option className="calcOption" value="1">Lvl 1</option>
                            </select>
                            <button type="submit" id="searchButton"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        </div>
                    </form>
                </div>
                <div id='tableDiv'>
                    <table id='hiscoreTable'>
                        <tbody id='hiscoreBody'>
                            <tr>
                                <th className='hiscoreTh'>Rank</th>
                                <th className='hiscoreTh'>User</th>
                                <th id='hiscoreScoreTh'>Hiscore</th>
                            </tr>
                            {hiscoreUsers.map((user, i) => 
                                <tr 
                                    key={user._id} 
                                    className={i % 2 === 0 
                                    ? 'hiscoreTr2' 
                                    : 'hiscoreTr1'
                                }>
                                    <td className='hiscoreRankTd'>{i + 1 === 1 
                                        ? <FontAwesomeIcon color='gold' icon={faMedal} /> 
                                        : i + 1 === 2 
                                        ? <FontAwesomeIcon color='silver' icon={faMedal} /> 
                                        : i + 1 === 3 
                                        ? <FontAwesomeIcon color='rgb(205, 127, 50)' icon={faMedal} /> 
                                        : `#${i+1}`}</td>
                                    <td className='hiscoreTd'><Link to={{
                                        pathname: `/profiles/${user.user}`,
                                    }}>{user.user}</Link></td>
                                    <td className='hiscoreScoreTd'>{user[searchRef.current]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Hiscores;