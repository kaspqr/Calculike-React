import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";

import { axiosPrivate } from "../../api/axios";
import { alerts } from "../feedback/alerts";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [user, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const usernameRegex = /^[a-z0-9]{4,12}$/;
  const passwordRegex = /^[a-zA-Z\d!@#$%^&*()_+={};:<>?~.-]{6,20}$/;
  const regex = "!@#$%^&*()_+={};:<>?~.-";
  const REGISTER_URL = "/register";
  const LOGIN_URL = "/auth";

  const validateInput = (inputValue, regex) => {
    return regex.test(inputValue);
  };

  useEffect(() => {
    if (auth?.username) {
      navigate("/");
    }
  }, [auth?.username, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const lowercaseUsername = user.toLowerCase();

    const isValidUsername = validateInput(lowercaseUsername, usernameRegex);
    const isValidPassword = validateInput(password, passwordRegex);

    if (password === passwordCheck && isValidPassword && isValidUsername) {
      const newUser = { username: lowercaseUsername, password };
      try {
        await axiosPrivate.post(REGISTER_URL, newUser);
        setUsername("");
        setPassword("");
        setPasswordCheck("");

        const loginResponse = await axiosPrivate.post(LOGIN_URL, {
          username: lowercaseUsername,
          password,
        });

        const accessToken = loginResponse?.data?.accessToken;

        if (accessToken) {
          const decoded = jwtDecode(accessToken)

          const {
            username,
            bio,
            userId
          } = decoded.UserInfo

          setAuth({ username, bio, userId, accessToken });

          navigate("/");
        } else {
          alerts.errorAlert("Something went wrong")
        }
      } catch (err) {
        if (!err?.response) {
          console.error("No server response");
          alerts.errorAlert("No server response");
        } else if (err.response?.status === 409) {
          console.error("Username taken");
          alerts.errorAlert("Username taken");
        } else {
          console.error("Registration failed");
          alerts.errorAlert("Registration failed");
        }
      }
    } else {
      if (password !== passwordCheck) {
        alerts.errorAlert("Passwords do not match");
      } else if (!isValidUsername) {
        alerts.errorAlert(
          "Username must be 4-12 characters long and may only contain " +
            "numbers and lowercase characters of the English alphabet"
        );
      } else if (!isValidPassword) {
        alerts.errorAlert(
          "Password must be 6-20 characters long and may only contain numbers, " +
            "letters of the English alphabet and the following symbols: " +
            `${regex}`
        );
      }
    }
  };

  return (
    <Row style={{ marginTop: "-90px" }}>
      <Col />
      <Col md="8">
        <Card>
          <CardHeader>
            <h1>Register</h1>
          </CardHeader>
          <CardBody>
            <Row>
              <Col style={{ maxWidth: "400px" }}>
                <form onSubmit={handleRegister}>
                  <label htmlFor="username">Username</label>
                  <Input
                    required
                    autoFocus
                    autoComplete="off"
                    type="text"
                    name="username"
                    value={user}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className="mt-4" htmlFor="password">
                    Password
                  </label>
                  <Input
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="mt-4" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <Input
                    required
                    type="password"
                    name="confirm-password"
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                  />
                  <Button
                    style={{ width: "100%" }}
                    className="mt-4"
                    color="success"
                    type="submit"
                  >
                    Register
                  </Button>
                  <div className="mt-4 text-center">
                    Already have an account?
                    <u
                      className="ml-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </u>
                  </div>
                </form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col />
    </Row>
  );
};

export default Register;
