import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { axiosPrivate } from '../api/axios';
import { useState } from 'react';

const Users = () => {

    const USERS_URL = `/users`
    const [searchParam, setSearchParam] = useState('')
    const usernameRegex = /^[a-z0-9]{4,12}$/

    function validateInput(inputValue, regex) {
        return regex.test(inputValue);
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const lowercaseSearch = searchParam.toLowerCase()
        document.getElementById('userSearchTBody').innerHTML = ''
        document.getElementById('userSearchLength').style.display = 'none'
        document.getElementById('userSearch404').style.display = 'none'
        if (searchParam.length < 4) {
            document.getElementById('userSearchLength').style.display = 'block'
        } else if (!validateInput(lowercaseSearch, usernameRegex)) {
            document.getElementById('userSearchLength').style.display = 'block'
        } else {
            const response = await axiosPrivate.get(USERS_URL) 
            const filteredResponse = response.data.filter(user => user.user.includes(lowercaseSearch))
            const activeFiltered = filteredResponse.filter(user => user.active === true)
            if (!activeFiltered.length) {
                document.getElementById('userSearch404').style.display = 'block'
            } else {
                activeFiltered.map(user => {
                    document.getElementById('userSearchTBody').innerHTML += `<tr class="userSearchTr"><td><a class="userSearchLink" href="/profiles/${user.user}">${user.user}</a></td></tr>`
                })
            }
        }
    }

    return (
        <div className='profileContent'>
            <form id='userSearchForm' onSubmit={handleSubmit}>
                <div id='insideForm'>
                    <input 
                        onChange={(e) => { setSearchParam(e.target.value) }} 
                        value={searchParam} 
                        id='userSearchInput' 
                        type="text" 
                        placeholder='Search username' 
                    />
                    <button id='searchButton' type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>
                <div style={{ display: 'none' }} id='userSearchLength' className='errMsg'>
                    Length of the searched username must be at least 4 characters long and only contain 
                    numbers and/or letters of the English alphabet.
                </div>
                <div style={{ display: 'none' }} id='userSearch404' className='errMsg'>
                    The user you searched for does not exist.
                </div>
            </form>
            <table id='userSearchTable'>
                <tbody id='userSearchTBody'></tbody>
            </table>
        </div>
    )
}

export default Users
