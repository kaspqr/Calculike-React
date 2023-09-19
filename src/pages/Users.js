import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { axiosPrivate } from '../api/axios'
import { useState } from 'react'

const Users = () => {

    const USERS_URL = `/users`
    const [searchParam, setSearchParam] = useState('')
    const usernameRegex = /^[a-z0-9]{4,12}$/
    const [users, setUsers] = useState([])
    const [lengthErrVisible, setLengthErrVisible] = useState(false)
    const [notFoundErrVisible, setNotFoundErrVisible] = useState(false)

    const validateInput = (inputValue, regex) => {
        return regex.test(inputValue)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const lowercaseSearch = searchParam.toLowerCase()

        setUsers([])
        setLengthErrVisible(false)
        setNotFoundErrVisible(false)

        if (searchParam.length < 4) {
            setLengthErrVisible(true)
        } else if (!validateInput(lowercaseSearch, usernameRegex)) {
            setNotFoundErrVisible(true)
        } else {
            const response = await axiosPrivate.get(USERS_URL) 
            const filteredResponse = response.data.filter(user => user.user.includes(lowercaseSearch))
            const activeFiltered = filteredResponse.filter(user => user.active === true)
            if (!activeFiltered.length) {
                setNotFoundErrVisible(true)
            } else {
                const usersList = []
                activeFiltered.forEach(user => {
                    const href = `/profiles/${user.user}`
                    usersList.push(
                        <tr class="user-search-tr">
                            <td>
                                <a class="user-search-link" href={href}>
                                    {user.user}
                                </a>
                            </td>
                        </tr>
                    )
                })
                setUsers(usersList)
            }
        }
    }

    return (
        <div className='profile-content'>
            <form id='user-search-form' onSubmit={handleSubmit}>

                <div id='inside-form'>

                    <input 
                        onChange={(e) => setSearchParam(e.target.value)} 
                        value={searchParam} 
                        id='user-search-input' 
                        type="text" 
                        placeholder='Search username' 
                    />

                    <button id='search-button' type='submit'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>

                </div>

                <div 
                    style={lengthErrVisible ? { display: 'block' } : { display: 'none' }} 
                    id='user-search-length' 
                    className='err-msg'
                >
                    Length of the searched username must be at least 4 characters long and only contain 
                    numbers and/or letters of the English alphabet.
                </div>

                <div 
                    style={notFoundErrVisible ? { display: 'block' } : { display: 'none' }} 
                    id='user-search-404' 
                    className='err-msg'
                >
                    The user you searched for does not exist.
                </div>

            </form>

            <table id='user-search-table'>
                <tbody id='userSearchTBody'>
                    {users}
                </tbody>
            </table>

        </div>
    )
}

export default Users
