import { useEffect, useRef, useState } from "react";
import { Card, Row, Col, Button } from "reactstrap";

import { axiosPrivate } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { alerts } from "../feedback/alerts";

const CalculatorField = () => {
  const { auth } = useAuth();

  const [firstNum, setFirstNum] = useState(null);
  const [secondNum, setSecondNum] = useState(null);
  const [answerValue, setAnswerValue] = useState(null);
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(null);
  const [startButtonClicked, setStartButtonClicked] = useState(false);
  const [selectValue, setSelectValue] = useState("combo");
  const [level, setLevel] = useState("All");
  const [answerLevel, setAnswerLevel] = useState(1);
  const [counterVisible, setCounterVisible] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [startVisible, setStartVisible] = useState(true);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [falseAnswer, setFalseAnswer] = useState(false);

  const finalSelectRef = useRef("");
  const multiplierRef = useRef();

  useEffect(() => {
    if (!auth?.id)
      alerts.warningAlert(
        "You are not logged in, therefore your hiscores will not be shown on the leaderboard."
      );
  }, []);

  useEffect(() => {
    if (startButtonClicked) {
      if (level === "One") setCounter(30);
      else if (level === "Two") setCounter(60);
      else if (level === "Three") setCounter(90);
      else if (level === "All") setCounter(180);
      generateRandomQuestion();
    }
  }, [startButtonClicked, level]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (counter === 0) {
        setCounter(180);
        clearInterval(intervalId);
        setCounterVisible(false);
        setQuestionVisible(false);
        setAnswerVisible(false);
        setStartVisible(true);
        setStartButtonClicked(false);
        if (auth?.id) {
          const response = await axiosPrivate.get(`/users/${auth?.id}`);
          const currentUser = response.data;
          const gameLevel = selectValue + level;
          if (score > currentUser[gameLevel]) {
            await axiosPrivate.put(`/users/${auth?.id}`, {
              id: currentUser._id,
              gameLevel,
              score,
            });
          }
        }
      } else setCounter(counter - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter, auth?.id, level, score, selectValue]);

  const generateRandomQuestion = async () => {
    if (selectValue === "combo") {
      const random = Math.floor(Math.random() * 4) + 1;
      if (random === 1) {
        finalSelectRef.current = "+";
      } else if (random === 2) {
        finalSelectRef.current = "-";
      } else if (random === 3) {
        finalSelectRef.current = "*";
      } else if (random === 4) {
        finalSelectRef.current = "/";
      }
    } else if (selectValue === "add") {
      finalSelectRef.current = "+";
    } else if (selectValue === "subtract") {
      finalSelectRef.current = "-";
    } else if (selectValue === "multiply") {
      finalSelectRef.current = "*";
    } else if (selectValue === "divide") {
      finalSelectRef.current = "/";
    }
    if (level === "All") {
      if (finalSelectRef.current === "+" || finalSelectRef.current === "-") {
        if (counter > 150) {
          multiplierRef.current = 10;
          setAnswerLevel(1);
        } else if (counter > 90) {
          multiplierRef.current = 720;
          setAnswerLevel(2);
        } else if (counter <= 90) {
          multiplierRef.current = 66000;
          setAnswerLevel(3);
        }
      } else if (
        finalSelectRef.current === "*" ||
        finalSelectRef.current === "/"
      ) {
        if (counter > 150) {
          multiplierRef.current = 10;
          setAnswerLevel(1);
        } else if (counter > 90) {
          multiplierRef.current = 25;
          setAnswerLevel(2);
        } else if (counter <= 90) {
          multiplierRef.current = 65;
          setAnswerLevel(3);
        }
      }
    } else if (level === "Three") {
      if (finalSelectRef.current === "+" || finalSelectRef.current === "-") {
        multiplierRef.current = 66000;
      } else if (
        finalSelectRef.current === "*" ||
        finalSelectRef.current === "/"
      ) {
        multiplierRef.current = 65;
      }
    } else if (level === "Two") {
      if (finalSelectRef.current === "+" || finalSelectRef.current === "-") {
        multiplierRef.current = 720;
      } else if (
        finalSelectRef.current === "*" ||
        finalSelectRef.current === "/"
      ) {
        multiplierRef.current = 25;
      }
    } else if (level === "One") {
      multiplierRef.current = 10;
    }

    const num1 = Math.floor(Math.random() * multiplierRef.current) + 1;
    const num2 = Math.floor(Math.random() * multiplierRef.current) + 1;

    if (finalSelectRef.current === "+" || finalSelectRef.current === "*") {
      setFirstNum(num1);
      setSecondNum(num2);
    } else if (finalSelectRef.current === "-") {
      setFirstNum(Math.max(num1, num2));
      setSecondNum(Math.min(num1, num2));
    } else if (finalSelectRef.current === "/") {
      setFirstNum(num1 * num2);
      setSecondNum(num2);
    }
  };

  const handleDigitClick = (e) => {
    if (startButtonClicked === true) {
      const digit = e.target.innerHTML;
      setAnswerValue(answerValue + digit);
    }
  };

  const checkAnswer = () => {
    if (finalSelectRef.current === "+") {
      return firstNum + secondNum;
    } else if (finalSelectRef.current === "-") {
      return firstNum - secondNum;
    } else if (finalSelectRef.current === "*") {
      return firstNum * secondNum;
    } else if (finalSelectRef.current === "/") {
      return firstNum / secondNum;
    }
  };

  const handleSubmitClick = async () => {
    if (startButtonClicked === true) {
      if (parseInt(answerValue) === checkAnswer() && counter > 0) {
        if (finalSelectRef.current === "/") {
          if (level === "One" || (level === "All" && answerLevel === 1)) {
            if (firstNum % 10 === 0 || firstNum < 10) {
              setScore(score + 5);
            } else if (firstNum % 5 === 0) {
              setScore(score + 7);
            } else if (firstNum > 50) {
              setScore(score + 13);
            } else if (firstNum > 20) {
              setScore(score + 10);
            } else {
              setScore(score + 8);
            }
          } else if (
            level === "Two" ||
            (level === "All" && answerLevel === 2)
          ) {
            if (firstNum % 10 === 0 || firstNum < 10) {
              setScore(score + 50);
            } else if (firstNum % 5 === 0) {
              setScore(score + 70);
            } else if (firstNum > 50) {
              setScore(score + 130);
            } else if (firstNum > 20) {
              setScore(score + 100);
            } else {
              setScore(score + 85);
            }
          } else if (
            level === "Three" ||
            (level === "All" && answerLevel === 3)
          ) {
            setScore(score + 10 * (firstNum + secondNum));
          }
        } else if (finalSelectRef.current === "*") {
          if (level === "One" || (level === "All" && answerLevel === 1)) {
            if (firstNum % 10 === 0 || secondNum % 10 === 0) {
              setScore(score + 5);
            } else if (firstNum % 5 === 0 || secondNum % 5 === 0) {
              setScore(score + 7);
            } else {
              setScore(score + (firstNum + secondNum));
            }
          } else if (
            level === "Two" ||
            (level === "All" && answerLevel === 2)
          ) {
            if (firstNum % 10 === 0 || secondNum % 10 === 0) {
              setScore(score + 50);
            } else {
              setScore(score + 25 * (firstNum + secondNum));
            }
          } else if (
            level === "Three" ||
            (level === "All" && answerLevel === 3)
          ) {
            if (firstNum % 10 === 0 || secondNum % 10 === 0) {
              setScore(score + 25 * (firstNum + secondNum));
            } else {
              setScore(score + 100 * (firstNum + secondNum));
            }
          }
        } else setScore(Math.ceil(score + (firstNum + secondNum) / 2));
        setAnswerValue("");
        generateRandomQuestion();
      } else if (counter > 0) {
        setSubmitButtonDisabled(true);
        setFalseAnswer(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setFalseAnswer(false);
        setSubmitButtonDisabled(false);
        setAnswerValue("");
        generateRandomQuestion();
      }
    }
  };

  return (
    <Row style={{ marginTop: "-90px" }}>
      <Col />
      <Col md="8">
        <Card
          className="p-2"
          id="calculator-content"
          style={
            falseAnswer
              ? {
                  animationName: "wronganswer",
                  animationPlayState: "running",
                  height: "100vh",
                }
              : { animationName: "none", height: "100vh" }
          }
        >
          <Row
            className="m-0 p-0 justify-content-center"
            style={{ height: "5vh", fontSize: "4vh" }}
          >
            <div style={{ width: "calc(36vh + 1rem)", color: "black" }}>
              Score: {score}
            </div>
          </Row>
          <Row
            className="m-0 p-0 justify-content-center"
            style={{
              height: "5vh",
              fontSize: "4vh",
              display: counterVisible ? null : "none",
            }}
          >
            <div
              style={{
                width: "calc(36vh + 1rem)",
                color: "black",
                display: counterVisible ? "block" : "none",
              }}
            >
              {counter}s
            </div>
          </Row>
          <Row
            className="m-0 p-0 justify-content-center"
            style={{
              height: "5vh",
              fontSize: "4vh",
              display: questionVisible ? null : "none",
            }}
          >
            <div
              style={{
                width: "calc(36vh + 1rem)",
                color: "black",
                display: questionVisible ? "block" : "none",
              }}
            >
              {firstNum} {finalSelectRef.current} {secondNum} =
            </div>
          </Row>
          <Row
            className="m-0 mb-3 p-0 justify-content-center"
            style={{
              height: "5vh",
              fontSize: "4vh",
              display: answerVisible ? null : "none",
            }}
          >
            <div
              style={{
                width: "calc(36vh + 1rem)",
                color: "black",
                display: answerVisible ? "block" : "none",
              }}
            >
              {answerValue}
            </div>
          </Row>
          <div
            style={startVisible ? { display: "block" } : { display: "none" }}
            id="start-div"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCounter(180);
                setStartVisible(false);
                setCounterVisible(true);
                setQuestionVisible(true);
                setAnswerVisible(true);
                setScore(0);
                setAnswerValue("");
                setStartButtonClicked(true);
              }}
            >
              <Row className="m-0 p-0 mb-2 justify-content-center">
                <label className="off-screen" htmlFor="calc-select">
                  Choose Calculation Type
                </label>
                <select
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  name="calc-select"
                  style={{ width: "calc(18vh + 0.25rem)", height: "7vh" }}
                  className="mr-2 pl-1"
                >
                  <option className="calcOption" value="combo">
                    Combo
                  </option>
                  <option className="calcOption" value="add">
                    Add
                  </option>
                  <option className="calcOption" value="subtract">
                    Subtract
                  </option>
                  <option className="calcOption" value="multiply">
                    Multiply
                  </option>
                  <option className="calcOption" value="divide">
                    Divide
                  </option>
                </select>
                <label className="off-screen" htmlFor="level-select">
                  Choose Level
                </label>
                <select
                  name="level-select"
                  value={level}
                  className="pl-1"
                  style={{ width: "calc(18vh + 0.25rem)", height: "7vh" }}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option className="calcOption" value="All">
                    All
                  </option>
                  <option className="calcOption" value="Three">
                    Lvl 3
                  </option>
                  <option className="calcOption" value="Two">
                    Lvl 2
                  </option>
                  <option className="calcOption" value="One">
                    Lvl 1
                  </option>
                </select>
              </Row>
              <div className="text-center">
                <Button
                  type="submit"
                  color="success"
                  style={{
                    height: "7vh",
                    fontSize: "2.5vh",
                    lineHeight: "3.5vh",
                    width: "calc(36vh + 1rem)",
                  }}
                >
                  Start
                </Button>
              </div>
            </form>
          </div>
          <div className="text-center m-0 mb-2">
            <Button
              className="m-0 mr-2"
              style={{ fontSize: "3vh", height: "12vh", width: "12vh" }}
              onClick={handleDigitClick}
            >
              7
            </Button>
            <Button
              className="m-0 mr-2"
              style={{ fontSize: "3vh", height: "12vh", width: "12vh" }}
              onClick={handleDigitClick}
            >
              8
            </Button>
            <Button
              className="m-0"
              style={{ fontSize: "3vh", height: "12vh", width: "12vh" }}
              onClick={handleDigitClick}
            >
              9
            </Button>
          </div>
          <div className="text-center m-0 mb-2">
            <Button
              className="m-0 mr-2"
              style={{ fontSize: "3vh", height: "12vh", width: "12vh" }}
              onClick={handleDigitClick}
            >
              4
            </Button>
            <Button
              className="m-0 mr-2"
              style={{ fontSize: "3vh", height: "12vh", width: "12vh" }}
              onClick={handleDigitClick}
            >
              5
            </Button>
            <Button
              className="m-0"
              style={{ fontSize: "3vh", height: "12vh", width: "12vh" }}
              onClick={handleDigitClick}
            >
              6
            </Button>
          </div>
          <div className="text-center m-0 mb-2">
            <Button
              className="m-0 mr-2"
              style={{ fontSize: "3vh", height: "12vh", width: "12vh" }}
              onClick={handleDigitClick}
            >
              1
            </Button>
            <Button
              className="m-0 mr-2"
              style={{ fontSize: "3vh", height: "12vh", width: "12vh" }}
              onClick={handleDigitClick}
            >
              2
            </Button>
            <Button
              className="m-0"
              style={{ fontSize: "3vh", height: "12vh", width: "12vh" }}
              onClick={handleDigitClick}
            >
              3
            </Button>
          </div>
          <div className="text-center m-0 mb-2">
            <Button
              className="m-0 mr-2"
              style={{ fontSize: "3vh", height: "12vh", width: "12vh" }}
              onClick={handleDigitClick}
            >
              0
            </Button>
            <Button
              className="m-0 px-0"
              disabled={submitButtonDisabled}
              onClick={handleSubmitClick}
              color="success"
              style={{
                fontSize: "2.5vh",
                height: "12vh",
                width: "calc(24vh + 0.5rem)",
              }}
            >
              Submit
            </Button>
          </div>
          <div className="text-center m-0">
            <Button
              className="m-0 mr-2 px-0"
              color="warning"
              style={{
                fontSize: "2.5vh",
                height: "12vh",
                width: "calc(18vh + 0.25rem)",
              }}
              onClick={() => {
                if (startButtonClicked === true) {
                  setAnswerValue(answerValue.slice(0, answerValue.length - 1));
                }
              }}
            >
              Del
            </Button>
            <Button
              className="m-0 px-0"
              color="danger"
              style={{
                fontSize: "2.5vh",
                height: "12vh",
                width: "calc(18vh + 0.25rem)",
              }}
              onClick={() => {
                if (startButtonClicked === true) setAnswerValue("");
              }}
            >
              Clear
            </Button>
          </div>
        </Card>
      </Col>
      <Col />
    </Row>
  );
};

export default CalculatorField;
