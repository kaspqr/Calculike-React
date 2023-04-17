import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGear, faBars } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

function Layout() {

    const { auth, setAuth } = useAuth()

    const navigate = useNavigate()

    const LOGOUT_URL = '/logout'

    const [hidden, setHidden] = useState(true)
    const [menuHidden, setMenuHidden] = useState(true)
    const [showMenu, setShowMenu] = useState(false)

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

    function showSelect() {
        if (hidden === true) {
            document.getElementById('settingsSelect').style.display = 'block'
            setHidden(false)
        } else {
            document.getElementById('settingsSelect').style.display = 'none'
            setHidden(true)
        }
    }

    if (auth?.user) {
        document.addEventListener('click', function (e) {
            if (document.getElementById('settingsButton')) {
                const div = document.getElementById('settingsButton')
                if (!div.contains(e.target)) {
                    document.getElementById('settingsSelect').style.display = 'none'
                    setHidden(true)
                }
            }
        })
    }

    document.addEventListener('click', function (e) {
        if (document.getElementById('menuBars')) {
            const div = document.getElementById('menuBars')
            if (!div.contains(e.target)) {
                document.querySelector('.menuSelect').style.display = 'none'
                setMenuHidden(true)
            }
        }
    })

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 768) { 
                setShowMenu(true);
            } else {
                setShowMenu(false);
                document.querySelector('.menuSelect').style.display = 'none'
                setMenuHidden(true)
            }
        }

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);


    function handleMenu() {
        if (menuHidden === true) {
            document.querySelector('.menuSelect').style.display = 'block'
            setMenuHidden(false)
        } else {
            document.querySelector('.menuSelect').style.display = 'none'
            setMenuHidden(true)
        }
    }

    return (
        auth?.user
        ?
        <>
            <nav id="layoutNavbar">
                <ul className="buttonList">
                    { showMenu 
                    ? <li id="menuBars" onClick={handleMenu} className="navButton"><FontAwesomeIcon icon={faBars}/></li>
                    : <><li id="homeIcon" className="navButton"><Link to="/"><FontAwesomeIcon icon={faHome} /></Link></li>
                        <li id="hiscoreButton" className="navButton"><Link to="/hiscores">Hiscores</Link></li>
                        <li id="trainButton" className="navButton"><Link to="/train">Play</Link></li>
                        <li id="rulesButton" className="navButton"><Link to="/about">Rules</Link></li>
                        <li id="usersButton" className="navButton"><Link to="/users">Users</Link></li></>
                    }
                    
                    <li onClick={showSelect} id="settingsButton" className="navButton">{auth.user} <FontAwesomeIcon icon={faGear} /></li>
                </ul>
            </nav>
            <div style={{display: "none"}} id="settingsSelect">
            <Link to="/settings"><p className="selectP">Profile Settings</p></Link>
                <hr />
                <p onClick={handleLogout} className="selectP">Logout</p>
            </div>
            <div className="menuSelect" style={{display: "none"}} id="loggedInMenu">
            <Link to="/"><p className="selectP">Home</p></Link>
                <hr />
            <Link to="/hiscores"><p className="selectP">Hiscores</p></Link>
                <hr />
            <Link to="/train"><p className="selectP">Play</p></Link>
                <hr />
            <Link to="/about"><p className="selectP">Rules</p></Link>
                <hr />
            <Link to="/users"><p className="selectP">Users</p></Link>
            </div>

            <Outlet />
        </>
        :
        <>
            <nav id="layoutNavbar">
                <ul className="buttonList">
                    { showMenu 
                        ? <li id="menuBars" onClick={handleMenu} className="navButton"><FontAwesomeIcon icon={faBars}/></li>
                        : <>
                        <li id="homeIcon" className="navButton"><Link to="/"><FontAwesomeIcon icon={faHome} /></Link></li>
                        <li id="hiscoreButton" className="navButton"><Link to="/hiscores">Hiscores</Link></li>
                        <li id="rulesButton" className="navButton"><Link to="/about">Rules</Link></li>
                        <li id="usersButton" className="navButton"><Link to="/users">Users</Link></li></> 
                    }
                    <li id="loginButton" className="navButton"><Link to="/login">Login</Link></li>
                    <li id="registerButton" className="navButton"><Link to="/register">Register</Link></li>
                </ul>
            </nav>
            <div className="menuSelect" style={{display: "none"}} id="loggedOutMenu">
            <Link to="/"><p className="selectP">Home</p></Link>
                <hr />
            <Link to="/hiscores"><p className="selectP">Hiscores</p></Link>
                <hr />
            <Link to="/about"><p className="selectP">Rules</p></Link>
                <hr />
            <Link to="/users"><p className="selectP">Users</p></Link>
            </div>

            <Outlet />
        </>
    );
}

export default Layout;
