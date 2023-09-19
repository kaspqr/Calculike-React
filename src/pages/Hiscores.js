import React, { useEffect, useRef, useState } from 'react'
import { axiosPrivate } from '../api/axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Hiscores = () => {
    const effectRan = useRef(false)
    const USERS_URL = '/users'
    const searchRef = useRef('comboall')
    const [hiscoreUsers, setHiscoreUsers] = useState([])
    const [levelType, setLevelType] = useState('combo')
    const [level, setLevel] = useState('all')

    const fetchData = async () => {
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

    const handleHiscoreSearch = (e) => {
        e.preventDefault()
        searchRef.current = (levelType + level)
        fetchData()
    }

    return (
        <div className='profile-content'>
            <div id='hiscore-content'>
                <div id='searchDiv'>
                    <form onSubmit={handleHiscoreSearch}>
                        <div id='inside-form'>

                            <label className='off-screen' htmlFor="calc-select">
                                Select Type of Calculation
                            </label>

                            <select 
                                value={levelType} 
                                onChange={(e) => setLevelType(e.target.value)} 
                                name='calc-select' 
                                id="calc-select" 
                                className="hs-select"
                            >
                                <option className="calcOption" value="combo">Combo</option>
                                <option className="calcOption" value="add">Add</option>
                                <option className="calcOption" value="subtract">Subtract</option>
                                <option className="calcOption" value="multiply">Multiply</option>
                                <option className="calcOption" value="divide">Divide</option>
                            </select>

                            <label className='off-screen' htmlFor="level-select">
                                Select Level
                            </label>

                            <select 
                                value={level} 
                                onChange={(e) => setLevel(e.target.value)} 
                                name='level-select' 
                                id="level-select" 
                                className="hs-select"
                            >
                                <option className="calcOption" value="all">All</option>
                                <option className="calcOption" value="3">Lvl 3</option>
                                <option className="calcOption" value="2">Lvl 2</option>
                                <option className="calcOption" value="1">Lvl 1</option>
                            </select>

                            <button type="submit" id="search-button">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>

                        </div>
                    </form>
                </div>

                <div>
                    <table id='hiscore-table'>
                        <tbody>
                            <tr>
                                <th className='hiscore-th'>
                                    Rank
                                </th>

                                <th className='hiscore-th'>
                                    User
                                </th>

                                <th id='hiscore-score-th'>
                                    Hiscore
                                </th>

                            </tr>
                            {hiscoreUsers.map((user, i) => 
                                <tr 
                                    key={user._id} 
                                    className={i % 2 === 0 
                                        ? 'hiscore-tr-2' 
                                        : 'hiscore-tr-1'
                                    }
                                >
                                    <td className='hiscore-rank-td'>{i <= 2 
                                        ? <FontAwesomeIcon 
                                            color={i === 0 ? 'gold' : i === 1 ? 'silver' : 'rgb(205, 127, 50)'} 
                                            icon={faMedal} 
                                        /> 
                                        : `#${i+1}`
                                        }
                                    </td>

                                    <td className='hiscore-td'>
                                        <Link to={`/profiles/${user.user}`}>
                                            {user.user}
                                        </Link>
                                    </td>

                                    <td className='hiscore-score-td'>
                                        {user[searchRef.current]}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Hiscores
