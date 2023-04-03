import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Home() {

    const { auth } = useAuth()
    const navigate = useNavigate()

    const goTrainHandler = () => {
        navigate('/train')
    }
    const goLoginHandler = () => {
        navigate('/login')
    }

    const homePageContent = () => {
        if (auth?.user) {
            return <button onClick={goTrainHandler} id="goButton">Go Train</button>
        } else {
            return <button onClick={goLoginHandler} id="goButton">Login</button>
        }
    }

    return (
        <div className="profileContent">
            <div id="homePage">
            <div id="homePageContent">
                
                <div id="newsfeed">
                    <h2 className="homeH2">Newsfeed</h2>
                    <h3 className="homeH3">April 2nd, 2023</h3>
                    <p className="homeP">
                        Users (search) page added.
                    </p>
                    <h3 className="homeH3">March 31st, 2023</h3>
                    <p className="homeP">
                        Ranks have been introduced to the game.
                    </p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Home;