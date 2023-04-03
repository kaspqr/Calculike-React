import React from 'react'
import Novice from '../images/novice.png'
import Apprentice from '../images/apprentice.png'
import Practitioner from '../images/practitioner.png'
import Mathematician from '../images/mathematician.png'
import Prodigy from '../images/prodigy.png'
import Expert from '../images/expert.png'
import Grandmaster from '../images/grandmaster.png'
import Archimedes from '../images/archimedes.png'
import Pythagoras from '../images/pythagoras.png'

const About = () => {
    return (
        <div id='aboutPage' className='profileContent'>
            
            <h3 id='aboutTopH3' className='aboutH3'>Introduction</h3>
            <br />
            <p className='aboutP'>
                The development of Calculite was initially started as 
                a practice project. 
                It is a one-man project designed for users to better their 
                skills at calculating by heart. 
            </p>
            <br />
            <p className='aboutP'>
                If you practice daily, the 
                improvement will be significant. In order to keep good track 
                of your progress, we have all of your hiscores listed on your 
                profile page. You can also see other users' hiscores when 
                visiting their profile.
            </p>
            <br />
            <p className='aboutP'>
                For extra motivation, each user also has a rank. If you 
                play any game with a level 'All' and get a new hiscore, 
                it will raise the points counting towards a rank, which 
                is displayed on your profile page.
            </p>
            <br />
            <p className='aboutP'>
                To compare yourself with the best, there is a page 
                for hiscores, which display the top 10 players of each 
                gamemode's each level.
            </p>
            <hr />
            <br />
            <br />
            <h3 className='aboutH3'>Rules</h3>
            <br />
            <h5 className='aboutH5'>
                Please make sure you have read and understood everything in this section. 
                Failure to comply with rules may lead to having your account permanently banned 
                and your scores cleared.
            </h5>
            <br />
            <p className='aboutP'>
                Do not pick a username or bio that is either political, 
                controversial, rude, contains swearwords, etc.
            </p>
            <br />
            <p className='aboutP'>
                "Academic honesty" - do not use a calculator to get a higher 
                score
            </p>
            <br />
            <p className='aboutP'>
                Scripting is not allowed. Using a program to insert answers 
                automatically may get your account banned if we have reason 
                to believe you have done so.
            </p>
            <hr />
            <br />
            <br />
            <h3 className='aboutH3'>Understand The Game</h3>
            <br />
            <h5 className='aboutH5'>
                You can pick between 5 different gamemodes: Add, 
                Subtract, Multiply, Divide and Combo.
            </h5>
            <br />
            <p className='aboutP'>
                Add only contains '+' questions, such as '2 + 2'
            </p>
            <br />
            <p className='aboutP'>
                Subtract only contains '-' questions, such as '3 - 1'
            </p>
            <br />
            <p className='aboutP'>
                Multiply only contains '*' questions, such as '3 * 4'
            </p>
            <br />
            <p className='aboutP'>
                Divide only contains '/' questions, such as '10 / 5'
            </p>
            <br />
            <p className='aboutP'>
                Combo contains questions from all of the above gamemodes, 
                generated at random each time.
            </p>
            <br />
            <br />
            <h5 className='aboutH5'>
                Each gamemode has 4 different levels
            </h5>
            <br />
            <p className='aboutP'>
                Level 1 lasts for 30 seconds and only has the easiest questions.
            </p>
            <br />
            <p className='aboutP'>
                Level 2 lasts for 60 seconds and only has questions with 
                medium difficulty.
            </p>
            <br />
            <p className='aboutP'>
                Level 3 lasts for 90 seconds and only has the hardest questions.
            </p>
            <br />
            <p className='aboutP'>
                Level All lasts for 180 seconds and contains all of the above, 
                starting with level 1, which lasts for 30 seconds, then level 2, 
                which lasts for 60 seconds, and, you guessed it, level 3, which 
                lasts for 90 seconds.
            </p>
            <br />
            <br />
            <h5 className='aboutH5'>How to Play</h5>
            <br />
            <p className='aboutP'>
                Once you are registered and logged in, you can choose 'Train' 
                from the navigation bar at the top of your screen. If you are 
                playing on a mobile or any other devide with a viewport that's 
                narrower than 768 pixels, you can find it under the drop down 
                menu marked with 3 lines at the top left corner of your screen.
            </p>
            <br />
            <p className='aboutP'>
                Pick a gamemode and a level you wish to play. The counter starts 
                as soon as you click on the 'Start' button, so be ready!
            </p>
            <br />
            <p className='aboutP'>
                You will then be presented with a question involving 2 randomly 
                generated numbers. When it comes to 'Divide' gamemode, the first 
                randomly generated number is multiplied with the second number 
                and the sum reassigned as the first number, so you would never 
                receive a question which has an answer with a decimal point. 
                Similar story for the 'Subtract' gamemode: the larger number of 
                the two numbers will always be the first one, so your answer 
                would never have to be negative.
            </p>
            <br />
            <p className='aboutP'>
                To enter your answer, simply click on the relevant digits on 
                the calculator field. If you wish to delete the last digit you 
                entered, simply click on the 'Del' button. If you wish to clear 
                your entire answer, click on the 'Clear' button. And lastly, 
                to submit your answer, click on the 'Submit' button.
            </p>
            <br />
            <p className='aboutP'>
                If your answer is correct, your score will increase and you 
                will immediately be presented with a new question.
            </p>
            <br />
            <p className='aboutP'>
                If your answer is incorrect, your score will stay the same 
                and the background color of the page will go red. Simultaneously, 
                the 'Submit' button will be disabled for the next 2 seconds. 
                When the 2 seconds is over, the page's background color will 
                turn back to normal and you will be presented with a new 
                question.
            </p>
            <br />
            <p className='aboutP'>
                If you do not enter any digits into your answer and click 'Submit,' 
                you are submitting an empty answer and the result will be the same 
                as entering an incorrect answer.
            </p>
            <br />
            <p className='aboutP'>
                Tip! Submitting an empty answer may sometimes be beneficial. For 
                example, if you are presented with a difficult equation, such as 
                '34 * 23' and you only have 10 seconds left, it might be better 
                to sacrifice another 2 seconds in hopes of getting an easier 
                equation to solve in the last 8 seconds, which could be '20 * 20' 
                instead.
            </p>
            <br />
            <p className='aboutP'>
                Your score will only be submitted if the counter has reached 0 and 
                you are no longer being presented with new questions. If you have 
                surpassed your hiscore, but go to another page while the counter 
                is still running, that score will not override your current hiscore, 
                so be wary!
            </p>
            <br />
            <p className='aboutP'>
                If the counter has reached 0 and you have beaten your previous 
                hiscore, it will instantly be updated on the 'Hiscores' page. 
                Simultaneously, if the new hiscore was on level 'All,' your 
                points counting towards a rank will also be updated on your 
                profile. Read more about ranks in the next section.
            </p>
            <br />
            <br />
            <h5 className='aboutH5'>Ranks</h5>
            <br />
            <p className='aboutP'>
                When going to a user's profile page, right under their name is 
                listed their rank. There are 9 ranks based on the average points you have 
                across all 5 gamemodes' 'All' levels' points. If you have 2000 points 
                in each gamemode's 'All' level, you have an overall average of 2000 
                points.
            </p>
            <br />
            <img className='badgePNG' src={Novice} alt="novicebadge" />
            <p className='aboutP'>
                Under 100 points average gives you a rank of '<span className='rankColor'>Novice</span>,' which is 
                what everyone starts out as when they first join the platform.
            </p>
            <br />
            <img className='badgePNG' src={Apprentice} alt="apprenticebadge" />
            <p className='aboutP'>
                Next up is '<span className='rankColor'>Apprentice</span>,' if you have 100 points or more on average.
            </p>
            <br />
            <img className='badgePNG' src={Practitioner} alt="practitionerbadge" />
            <p className='aboutP'>
                '<span className='rankColor'>Practitioner</span>' requires at least 1000 points.
            </p>
            <br />
            <img className='badgePNG' src={Mathematician} alt="mathematicianbadge" />
            <p className='aboutP'>
                '<span className='rankColor'>Mathematician</span>' requires at least 10 000 points.
            </p>
            <br />
            <img className='badgePNG' src={Prodigy} alt="Prodigybadge" />
            <p className='aboutP'>
                '<span className='rankColor'>Prodigy</span>' requires at least 50 000 points.
            </p>
            <br />
            <img className='badgePNG' src={Expert} alt="Expertbadge" />
            <p className='aboutP'>
                '<span className='rankColor'>Expert</span>' requires at least 100 000 points. If you reach this level, 
                you are in the top 1% in the World when it comes to calculating by heart.
            </p>
            <br />
            <img className='badgePNG' src={Grandmaster} alt="Grandmasterbadge" />
            <p className='aboutP'>
                '<span className='rankColor'>Grandmaster</span>' requires at least 150 000 points.
            </p>
            <br />
            <img className='badgePNG' src={Archimedes} alt="Archimedesbadge" />
            <p className='aboutP'>
                '<span className='rankColor'>Archimedes</span>' requires at least 200 000 points.
            </p>
            <br />
            <img className='badgePNG' src={Pythagoras} alt="Pythagorasbadge" />
            <p className='aboutP'>
                '<span className='rankColor'>Pythagoras</span>' requires at least 250 000 points on average. This is the 
                final level on the platform and is designed to be unreachable for everyone, 
                except a select few. If you reach this level, you are one in a million. Good luck!
            </p>
            <hr />
            <br />
            <br />
            <h3 className='aboutH3'>
                Security
            </h3>
            <br />
            <p className='aboutP'>
                When registering your account, your password will be 
                encrypted and stored safely in it's encrypted form at a secure 
                database.
            </p>
            <br />
            <p className='aboutP'>
                When logging in, the password you enter will be encrypted, 
                then compared to the encrypted password in the database, which 
                will then send a relevant response back, either logging you in if the 
                password was correct or displaying an error message if it was 
                incorrect.
            </p>
            <br />
            <p className='aboutP'>
                In order to keep you logged in, the website uses secure, HTTP-only 
                cookies, which are unavailable to hackers via scripting. Those cookies contain 
                relevant information, such as a token to keep you signed in - and 
                not your password.
            </p>
            <hr />
            <br />
            <br />
            <h3 className='aboutH3'>
                Contact
            </h3>
            <br />
            <p className='aboutP'>
                With any questions, business inquiries, suggestions, bug reports, complaints, unban appeal, etc., 
                please contact the developer via email at kasparvella@gmail.com
            </p>
        </div>
    )
}

export default About
