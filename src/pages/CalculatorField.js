import { useEffect, useRef, useState } from "react"
import { axiosPrivate } from "../api/axios"
import useAuth from "../hooks/useAuth"

const CalculatorField = () => {

    const { auth } = useAuth()

    useEffect(() => {
        if (!auth?.id) alert("You are not logged in, therefore your hiscores will not be shown on the leaderboard.")
    }, [])

    const [firstNum, setFirstNum] = useState(null)
    const [secondNum, setSecondNum] = useState(null)
    const [answerValue, setAnswerValue] = useState(null)
    const [score, setScore] = useState(0)
    const [counter, setCounter] = useState(null)
    const [startButtonClicked, setStartButtonClicked] = useState(false)
    const [selectValue, setSelectValue] = useState('combo')
    const finalSelectRef = useRef('')
    const multiplierRef = useRef()
    const [level, setLevel] = useState('all')
    const [answerLevel, setAnswerLevel] = useState(1)
    const [counterVisible, setCounterVisible] = useState(false)
    const [questionVisible, setQuestionVisible] = useState(false)
    const [answerVisible, setAnswerVisible] = useState(false)
    const [startVisible, setStartVisible] = useState(true)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)
    const [falseAnswer, setFalseAnswer] = useState(false)

    useEffect(() => {
        if (startButtonClicked) {

            if (level === '1') setCounter(30)
            else if (level === '2') setCounter(60)
            else if (level === '3') setCounter(90)
            else if (level === 'all') setCounter(180)

            generateRandomQuestion()
        }
    }, [startButtonClicked, level])

    const generateRandomQuestion = async () => {
        if (selectValue === 'combo') {
            const random = Math.floor(Math.random() * 4) + 1

            if (random === 1) { finalSelectRef.current = '+'} 
            else if (random === 2) { finalSelectRef.current = '-' } 
            else if (random === 3) { finalSelectRef.current = '*' } 
            else if (random === 4) { finalSelectRef.current = '/' }
        } else if (selectValue === 'add') { finalSelectRef.current = '+' } 
        else if (selectValue === 'subtract') { finalSelectRef.current = '-' } 
        else if (selectValue === 'multiply') { finalSelectRef.current = '*' } 
        else if (selectValue === 'divide') { finalSelectRef.current = '/' }

        if (level === 'all') {
            if (finalSelectRef.current === '+' || finalSelectRef.current === '-') {
                if (counter > 150) { 
                    multiplierRef.current = 10 
                    setAnswerLevel(1)
                } else if (counter > 90) { 
                    multiplierRef.current = 720 
                    setAnswerLevel(2)
                } else if (counter <= 90) { 
                    multiplierRef.current = 66000 
                    setAnswerLevel(3)
                }
            } else if (finalSelectRef.current === '*' || finalSelectRef.current === '/') {
                if (counter > 150) { 
                    multiplierRef.current = 10
                    setAnswerLevel(1) 
                }
                else if (counter > 90) { 
                    multiplierRef.current = 25 
                    setAnswerLevel(2)
                }
                else if (counter <= 90) { 
                    multiplierRef.current = 65 
                    setAnswerLevel(3)
                }
            }
        } else if (level === '3') {
            if (finalSelectRef.current === '+' || finalSelectRef.current === '-') {
                multiplierRef.current = 66000
            } else if (finalSelectRef.current === '*' || finalSelectRef.current === '/') {
                multiplierRef.current = 65
            } 
        } else if (level === '2') {
            if (finalSelectRef.current === '+' || finalSelectRef.current === '-') {
                multiplierRef.current = 720
            } else if (finalSelectRef.current === '*' || finalSelectRef.current === '/') {
                multiplierRef.current = 25
            } 
        } else if (level === '1') {
            multiplierRef.current = 10
        } 

        // Final random numbers for the equation
        const num1 = Math.floor(Math.random() * multiplierRef.current) + 1
        const num2 = Math.floor(Math.random() * multiplierRef.current) + 1

        // Any order with adding and multiplying
        // Bigger number first with subtracting and dividing
        if (finalSelectRef.current === '+' || finalSelectRef.current === '*') { 
            setFirstNum(num1)
            setSecondNum(num2)
        } else if (finalSelectRef.current === '-') {
            setFirstNum(Math.max(num1, num2))
            setSecondNum(Math.min(num1, num2))
        } else if (finalSelectRef.current === '/') { 
            setFirstNum(num1 * num2) // To ensure it is divideable, num1 cannot be random as it is in subtraction
            setSecondNum(num2)
        }
    }


    // Counter once the start button has been hit
    useEffect(() => {
        
        const intervalId = setInterval(async () => {
            // Change display and save new hiscore when time runs out
            if (counter === 0) {
                setCounter(180)
                clearInterval(intervalId)
                setCounterVisible(false)
                setQuestionVisible(false)
                setAnswerVisible(false)
                setStartVisible(true)
                setStartButtonClicked(false)

                if (auth?.id) {
                    const response = await axiosPrivate.get(`/users/${auth?.id}`)
                    const currentUser = response.data
                    const gameLevel = selectValue + level

                    if (score > currentUser[gameLevel]) {
                        await axiosPrivate.put(`/users/${auth?.id}`, { "id": currentUser._id, "gameLevel": gameLevel, "score": score })
                    }
                }

            } else {
                setCounter(counter - 1)
            }
        }, 1000) // 1 second

        return () => {
            clearInterval(intervalId)
        }
    }, [counter, auth?.id, level, score, selectValue])



    const handleStartClick = (e) => {
        e.preventDefault()
        setCounter(180)
        setStartVisible(false)
        setCounterVisible(true)
        setQuestionVisible(true)
        setAnswerVisible(true)
        setScore(0)
        setAnswerValue('')
        setStartButtonClicked(true)
    }

    
    const handleDigitClick = (e) => {
        if (startButtonClicked === true) {
            const digit = e.target.innerHTML
            setAnswerValue(answerValue + digit)
        }
    }


    const handleDelClick = () => {
        if (startButtonClicked === true) { setAnswerValue(answerValue.slice(0, answerValue.length - 1)) }
    }


    const handleClearClick = () => {
        if (startButtonClicked === true) { setAnswerValue('') }
    }


    const checkAnswer = () => {
        if (finalSelectRef.current === '+') { return firstNum + secondNum }
        else if (finalSelectRef.current === '-') { return firstNum - secondNum }
        else if (finalSelectRef.current === '*') { return firstNum * secondNum }
        else if (finalSelectRef.current === '/') { return firstNum / secondNum }
    }


    const handleSubmitClick = async () => {
        if (startButtonClicked === true) {

            if (parseInt(answerValue) === checkAnswer() && counter > 0) {
                if (finalSelectRef.current === '/') {
                    // Calculate score for the correct lvl 1 division answer
                    if (level === '1' || (level === 'all' && answerLevel === 1)) {
                        if (firstNum % 10 === 0 || firstNum < 10) { setScore(score + 5) }
                        else if (firstNum % 5 === 0) { setScore(score + 7) }
                        else if (firstNum > 50) { setScore(score + 13) }
                        else if (firstNum > 20) { setScore(score + 10) }
                        else { setScore(score + 8) }
                    } else if (level === '2' || (level === 'all' && answerLevel === 2)) { // lvl 2
                        if (firstNum % 10 === 0 || firstNum < 10) { setScore(score + 50) }
                        else if (firstNum % 5 === 0) { setScore(score + 70) }
                        else if (firstNum > 50) { setScore(score + 130) }
                        else if (firstNum > 20) { setScore(score + 100) }
                        else { setScore(score + 85) }
                    } else if (level === '3' || (level === 'all' && answerLevel === 3)) { // lvl 3
                        setScore(score + 10 * (firstNum + secondNum)) 
                    }
                } else if (finalSelectRef.current === '*') {
                    // Calculate score for the correct lvl 1 multiply answer
                    if (level === '1' || (level === 'all' && answerLevel === 1)) {
                        if (firstNum % 10 === 0 || secondNum % 10 === 0) { setScore(score + 5) }
                        else if (firstNum % 5 === 0 || secondNum % 5 === 0) { setScore(score + 7) }
                        else { setScore(score + (firstNum + secondNum)) }
                    } else if (level === '2' || (level === 'all' && answerLevel === 2)) { // lvl 2
                        if (firstNum % 10 === 0 || secondNum % 10 === 0) { setScore(score + 50) }
                        else { setScore(score + 25 * (firstNum + secondNum)) }
                    } else if (level === '3' || (level === 'all' && answerLevel === 3)) { // lvl 3
                        if (firstNum % 10 === 0 || secondNum % 10 === 0) { setScore(score + 25 * (firstNum + secondNum)) }
                        else { setScore(score + 100 * (firstNum + secondNum)) }
                    }
                } else { // Set score for the correct add or subtract answer
                    setScore(Math.ceil(score + ((firstNum + secondNum) / 2)))
                }

                // Clear input and give the user a new question
                setAnswerValue('')
                generateRandomQuestion()
            } else if (counter > 0) { // Red background animation for wrong answer
                setSubmitButtonDisabled(true)
                setFalseAnswer(true)

                // 2 second fine
                await new Promise(resolve => {
                    setTimeout(resolve, 2000)
                })

                // Clear animation for next time use, enable submit button
                setFalseAnswer(false)
                setSubmitButtonDisabled(false)

                // Clear input and give the user a new question
                setAnswerValue('')
                generateRandomQuestion()
            }
        }
    }


    // HTML

    return <div className="page-content" style={falseAnswer 
        ? { animationName: "wronganswer", animationPlayState: "running" } 
        : { animationName: "none" }}
    >
        <div id="calculator-field">

            <div id="score-div">
                Score: {score}
            </div>

            <div style={counterVisible ? { display: 'block' } : { display: 'none' }} id="counter-div">
                {counter}s
            </div>

            <div style={questionVisible ? { display: 'block' } : { display: 'none' }} id="question-div">
                {firstNum} {finalSelectRef.current} {secondNum} =
            </div>

            <div style={answerVisible ? { display: 'block' } : { display: 'none' }} id="answer-div">
                {answerValue}
            </div>

            <div style={startVisible ? { display: 'block' } : { display: 'none' }} id="start-div">
                <form onSubmit={handleStartClick}>

                    <label className="off-screen" htmlFor="calc-select">
                        Choose Calculation Type
                    </label>

                    <select 
                        value={selectValue} 
                        onChange={(e) => setSelectValue(e.target.value)} 
                        name="calc-select" 
                        id="calc-select" 
                        className="calc-select"
                    >
                        <option className="calcOption" value="combo">Combo</option>
                        <option className="calcOption" value="add">Add</option>
                        <option className="calcOption" value="subtract">Subtract</option>
                        <option className="calcOption" value="multiply">Multiply</option>
                        <option className="calcOption" value="divide">Divide</option>
                    </select>

                    <label className="off-screen" htmlFor="level-select">
                        Choose Level
                    </label>

                    <select 
                        name="level-select" 
                        id="level-select" 
                        className="calc-select"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option className="calcOption" value="all">All</option>
                        <option className="calcOption" value="3">Lvl 3</option>
                        <option className="calcOption" value="2">Lvl 2</option>
                        <option className="calcOption" value="1">Lvl 1</option>
                    </select>

                    <button type="submit" id="start-button">
                        Start
                    </button>

                </form>
            </div>

            <table id="calculator-table">
                <tbody>

                    <tr>

                        <td className="digit">
                            <button className="td-button" onClick={handleDigitClick} >7</button>
                        </td>

                        <td className="digit">
                            <button className="td-button" onClick={handleDigitClick} >8</button>
                        </td>

                        <td className="digit">
                            <button className="td-button" onClick={handleDigitClick} >9</button>
                        </td>

                    </tr>

                    <tr>

                        <td className="digit">
                            <button className="td-button" onClick={handleDigitClick} >4</button>
                        </td>

                        <td className="digit">
                            <button className="td-button" onClick={handleDigitClick} >5</button>
                        </td>

                        <td className="digit">
                            <button className="td-button" onClick={handleDigitClick} >6</button>
                        </td>

                    </tr>

                    <tr>

                        <td className="digit">
                            <button className="td-button" onClick={handleDigitClick} >1</button>
                        </td>

                        <td className="digit">
                            <button className="td-button" onClick={handleDigitClick} >2</button>
                        </td>

                        <td className="digit">
                            <button className="td-button" onClick={handleDigitClick} >3</button>
                        </td>

                    </tr>

                    <tr>

                        <td className="digit">
                            <button className="td-button" onClick={handleDigitClick} >0</button>
                        </td>

                        <td className="digit" colSpan={2} id="submit-td">
                            <button 
                                disabled={submitButtonDisabled} 
                                id="submitButton" 
                                className="td-button" 
                                onClick={handleSubmitClick}
                            >
                                Submit
                            </button>
                        </td>

                    </tr>

                    <tr>

                        <td className="digit" id="del-button">
                            <button onClick={handleDelClick} className="td-button">Del</button>
                        </td>

                        <td className="digit" id="clear-button" colSpan={2}>
                            <button onClick={handleClearClick} className="td-button">Clear</button>
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}

export default CalculatorField
