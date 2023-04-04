import { useEffect, useRef, useState } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "../hooks/useAuth";

function CalculatorField() {

    const { auth } = useAuth();

    const [firstNum, setFirstNum] = useState();
    const [secondNum, setSecondNum] = useState();
    const [answerValue, setAnswerValue] = useState();
    const [score, setScore] = useState(0);
    const [counter, setCounter] = useState();
    const [startButtonClicked, setStartButtonClicked] = useState(false);
    const [selectValue, setSelectValue] = useState('')
    const finalSelectRef = useRef('')
    const multiplierRef = useRef()
    const counterRef = useRef()
    const [level, setLevel] = useState()
    const [answerLevel, setAnswerLevel] = useState(1)

    useEffect(() => {
        if (startButtonClicked) {
            counterRef.current = false
            if (level === '1') { setCounter(30) }
            else if (level === '2') { setCounter(60) }
            else if (level === '3') { setCounter(90) }
            else if (level === 'all') { 
                setCounter(180) 
                counterRef.current = false
            }
            generateRandomQuestion()
        }
    }, [startButtonClicked])

    async function generateRandomQuestion() {

        if (selectValue === 'combo') {
            let random = Math.floor(Math.random() * 4) + 1;

            if (random === 1) { finalSelectRef.current = '+'} 
            else if (random === 2) { finalSelectRef.current = '-' } 
            else if (random === 3) { finalSelectRef.current = '*' } 
            else if (random === 4) { finalSelectRef.current = '/' }
        } else if (selectValue === 'add') { finalSelectRef.current = '+' } 
        else if (selectValue === 'subtract') { finalSelectRef.current = '-' } 
        else if (selectValue === 'multiply') { finalSelectRef.current = '*' } 
        else if (selectValue === 'divide') { finalSelectRef.current = '/' }

        if (level === 'all') {
            if (counterRef.current === false) { multiplierRef.current = 10 }
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

        const num1 = Math.floor(Math.random() * multiplierRef.current) + 1;
        const num2 = Math.floor(Math.random() * multiplierRef.current) + 1;

        
        if (finalSelectRef.current === '+' || finalSelectRef.current === '*') { 
            setFirstNum(num1)
            setSecondNum(num2)
        } else if (finalSelectRef.current === '-') { 
            setFirstNum(Math.max(num1, num2))
            setSecondNum(Math.min(num1, num2))
        } else if (finalSelectRef.current === '/') { 
            setFirstNum(num1 * num2)
            setSecondNum(num2)
        }
    }


    useEffect(() => {
        
        const intervalId = setInterval(async () => {
            if (counter === 0) {
                setCounter(180)
                clearInterval(intervalId);
                document.querySelector('#counterDiv').style.display = 'none';
                document.querySelector('#questionDiv').style.display = 'none';
                document.querySelector('#answerDiv').style.display = 'none';
                document.querySelector('#startDiv').style.display = 'block';
                setStartButtonClicked(false);
                const response = await axiosPrivate.get(`/users/${auth?.id}`)
                const currentUser = response.data
                const gameLevel = selectValue + level

                if (score > currentUser[gameLevel]) {
                    await axiosPrivate.put(`/users/${auth?.id}`, { "id": currentUser._id, "gameLevel": gameLevel, "score": score })
                }
            } else {
                setCounter(counter - 1);
            }
        }, 1000);
        return () => {
            clearInterval(intervalId)
        }
    }, [counter]);


    // All the onClick functions

    function handleStartClick(e) {
        e.preventDefault();
        setSelectValue(document.getElementById('calcSelect').value);
        setLevel(document.getElementById('levelSelect').value);
        document.querySelector('#startDiv').style.display = 'none';
        document.querySelector('#counterDiv').style.display = 'block';
        document.querySelector('#questionDiv').style.display = 'block';
        document.querySelector('#answerDiv').style.display = 'block';
        setScore(0);
        setAnswerValue('');
        setStartButtonClicked(true);
    }

    function handleDigitClick(event) {
        if (startButtonClicked === true) {
            const digit = event.target.innerHTML;
            setAnswerValue(answerValue + digit);
        }
    }


    function handleDelClick() {
        if (startButtonClicked === true) { setAnswerValue(answerValue.slice(0, answerValue.length - 1)); }
    }


    function handleClearClick() {
        if (startButtonClicked === true) { setAnswerValue(''); }
    }

    function checkAnswer() {
        if (finalSelectRef.current === '+') { return firstNum + secondNum }
        else if (finalSelectRef.current === '-') { return firstNum - secondNum }
        else if (finalSelectRef.current === '*') { return firstNum * secondNum }
        else if (finalSelectRef.current === '/') { return firstNum / secondNum }
    }

    async function handleSubmitClick() {
        if (startButtonClicked === true) {

            if (parseInt(answerValue) === checkAnswer() && counter > 0) {
                if (finalSelectRef.current === '/') {
                    if (level === '1' || (level === 'all' && answerLevel === 1)) {
                        if (firstNum % 10 === 0 || firstNum < 10) { setScore(score + 5) }
                        else if (firstNum % 5 === 0) { setScore(score + 7) }
                        else if (firstNum > 50) { setScore(score + 13) }
                        else if (firstNum > 20) { setScore(score + 10) }
                        else { setScore(score + 8) }
                    } else if (level === '2' || (level === 'all' && answerLevel === 2)) {
                        if (firstNum % 10 === 0 || firstNum < 10) { setScore(score + 50) }
                        else if (firstNum % 5 === 0) { setScore(score + 70) }
                        else if (firstNum > 50) { setScore(score + 130) }
                        else if (firstNum > 20) { setScore(score + 100) }
                        else { setScore(score + 85) }
                    } else if (level === '3' || (level === 'all' && answerLevel === 3)) { setScore(score + 10 * (firstNum + secondNum)) }
                } else if (finalSelectRef.current === '*') {
                    if (level === '1' || (level === 'all' && answerLevel === 1)) {
                        if (firstNum % 10 === 0 || secondNum % 10 === 0) { setScore(score + 5) }
                        else if (firstNum % 5 === 0 || secondNum % 5 === 0) { setScore(score + 7) }
                        else { setScore(score + (firstNum + secondNum)) }
                    } else if (level === '2' || (level === 'all' && answerLevel === 2)) {
                        if (firstNum % 10 === 0 || secondNum % 10 === 0) { setScore(score + 50) }
                        else { setScore(score + 25 * (firstNum + secondNum)) }
                    } else if (level === '3' || (level === 'all' && answerLevel === 3)) { 
                        if (firstNum % 10 === 0 || secondNum % 10 === 0) { setScore(score + 25 * (firstNum + secondNum)) }
                        else { setScore(score + 100 * (firstNum + secondNum)) }
                    }
                } else {
                    setScore(Math.ceil(score + ((firstNum + secondNum) / 2)))
                }
                setAnswerValue('')
                generateRandomQuestion()
            } else if (counter > 0) {
                document.getElementById('submitButton').disabled = true
                document.querySelector('.pageContent').style.animationName = 'wronganswer'
                document.querySelector('.pageContent').style.animationPlayState = 'running'
                await new Promise(resolve => {
                    setTimeout(resolve, 2000)
                })
                document.querySelector('.pageContent').style.animationName = 'none'
                document.getElementById('submitButton').disabled = false
                setAnswerValue('')
                generateRandomQuestion()
            }
        }
    }


    // HTML

    return <div className="pageContent">
        <div id="calculatorField">
            <div id="scoreDiv">
                Score: {score}
            </div>
            <div style={{ display: 'none' }} id="counterDiv">
                {counter}s
            </div>
            <div style={{display: 'none'}} id="questionDiv">
                {firstNum} {finalSelectRef.current} {secondNum} =
            </div>
            <div style={{ display: 'none' }} id="answerDiv">
                {answerValue}
            </div>
            <div id="startDiv">
                <form onSubmit={handleStartClick}>
                    <select id="calcSelect" className="calcSelect">
                        <option className="calcOption" value="combo">Combo</option>
                        <option className="calcOption" value="add">Add</option>
                        <option className="calcOption" value="subtract">Subtract</option>
                        <option className="calcOption" value="multiply">Multiply</option>
                        <option className="calcOption" value="divide">Divide</option>
                    </select>
                    <select id="levelSelect" className="calcSelect">
                        <option className="calcOption" value="all">All</option>
                        <option className="calcOption" value="3">Lvl 3</option>
                        <option className="calcOption" value="2">Lvl 2</option>
                        <option className="calcOption" value="1">Lvl 1</option>
                    </select>
                    <button type="submit" id="startButton">Start</button>
                </form>
            </div>
            <table id="calculatorTable">
                <tbody>
                    <tr>
                        <td className="digit">
                            <button className="tdButton" onClick={handleDigitClick} >7</button>
                        </td>
                        <td className="digit">
                            <button className="tdButton" onClick={handleDigitClick} >8</button>
                        </td>
                        <td className="digit">
                            <button className="tdButton" onClick={handleDigitClick} >9</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="digit">
                            <button className="tdButton" onClick={handleDigitClick} >4</button>
                        </td>
                        <td className="digit">
                            <button className="tdButton" onClick={handleDigitClick} >5</button>
                        </td>
                        <td className="digit">
                            <button className="tdButton" onClick={handleDigitClick} >6</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="digit">
                            <button className="tdButton" onClick={handleDigitClick} >1</button>
                        </td>
                        <td className="digit">
                            <button className="tdButton" onClick={handleDigitClick} >2</button>
                        </td>
                        <td className="digit">
                            <button className="tdButton" onClick={handleDigitClick} >3</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="digit">
                            <button className="tdButton" onClick={handleDigitClick} >0</button>
                        </td>
                        <td className="digit" colSpan={2} id="submitTd">
                            <button id="submitButton" className="tdButton" onClick={handleSubmitClick}>Submit</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="digit" id="delButton">
                            <button onClick={handleDelClick} className="tdButton">Del</button>
                        </td>
                        <td className="digit" id="clearButton" colSpan={2}>
                            <button onClick={handleClearClick} className="tdButton">Clear</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}

export default CalculatorField;