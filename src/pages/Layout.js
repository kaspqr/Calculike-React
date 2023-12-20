import { useState, useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"

import axios from "../api/axios"
import useAuth from "../hooks/useAuth"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faGear, faBars } from "@fortawesome/free-solid-svg-icons"

const Layout = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()

  const [hidden, setHidden] = useState(true)
  const [menuHidden, setMenuHidden] = useState(true)
  const [showMenu, setShowMenu] = useState(false)

  const LOGOUT_URL = '/logout'

  const handleLogout = async () => {
    await axios.get(LOGOUT_URL,
      { withCredentials: true })
      .then(() => {
        setAuth(null)
        setHidden(true)
      })
      .catch(err => {
        console.log(err)
      })
    navigate('/')
  }

  if (auth?.user) {
    document.addEventListener('click', function (e) {
      if (document.getElementById('settings-button')) {
        const div = document.getElementById('settings-button')
        if (!div.contains(e.target)) {
          setHidden(true)
        }
      }
    })
  }

  document.addEventListener('click', function (e) {
    if (document.getElementById('menu-bars')) {
      const div = document.getElementById('menu-bars')
      if (!div.contains(e.target)) {
        setMenuHidden(true)
      }
    }
  })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setShowMenu(true)
      else {
        setShowMenu(false)
        setMenuHidden(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <>
    <nav id="layout-navbar">
      <ul className="button-list">
        {showMenu
          ? <>
            <li
              id="menu-bars"
              onClick={() => setMenuHidden(!menuHidden)}
              className="nav-button"
            >
              <FontAwesomeIcon icon={faBars} />
            </li>
            {auth?.user
              ? <li
                onClick={() => setHidden(!hidden)}
                id="settings-button"
                className="nav-button"
              >
                {auth.user} <FontAwesomeIcon icon={faGear} />
              </li>
              : <>
                <li id="login-button" className="nav-button">
                  <Link to="/login">Login</Link>
                </li>
                <li id="register-button" className="nav-button">
                  <Link to="/register">Register</Link>
                </li>
              </>
            }
          </>
          : <><li id="home-icon" className="nav-button">
            <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
          </li>
            <li id="hiscore-button" className="nav-button">
              <Link to="/hiscores">Hiscores</Link>
            </li>
            <li id="train-button" className="nav-button">
              <Link to="/train">Play</Link>
            </li>
            <li id="rules-button" className="nav-button">
              <Link to="/about">Rules</Link>
            </li>
            <li id="usersButton" className="nav-button">
              <Link to="/users">Users</Link>
            </li>
            {auth?.user
              ? <li
                onClick={() => setHidden(!hidden)}
                id="settings-button"
                className="nav-button"
              >
                {auth.user} <FontAwesomeIcon icon={faGear} />
              </li>
              : <>
                <li id="login-button" className="nav-button">
                  <Link to="/login">Login</Link>
                </li>
                <li id="register-button" className="nav-button">
                  <Link to="/register">Register</Link>
                </li>
              </>
            }
          </>
        }
      </ul>
    </nav>
    <div style={hidden ? { display: "none" } : { display: "block" }} id="settings-select">
      {auth?.user
        ? <>
          <Link to="/settings">
            <p className="select-p">
              Profile Settings
            </p>
          </Link>
          <hr />
          <p onClick={handleLogout} className="select-p">
            Logout
          </p>
        </>
        : <>
          <Link to="/register">
            <p className="select-p">
              Register
            </p>
          </Link>
          <Link to="/login">
            <p className="select-p">
              Login
            </p>
          </Link>
        </>
      }
    </div>
    <div
      className="menu-select"
      style={menuHidden ? { display: "none" } : { display: "block" }}
      id="logged-in-menu"
    >
      <Link to="/"><p className="select-p">Home</p></Link>
      <hr />
      <Link to="/hiscores"><p className="select-p">Hiscores</p></Link>
      <hr />
      <Link to="/train"><p className="select-p">Play</p></Link>
      <hr />
      <Link to="/about"><p className="select-p">Rules</p></Link>
      <hr />
      <Link to="/users"><p className="select-p">Users</p></Link>
    </div>
    <Outlet />
  </>
}

export default Layout
