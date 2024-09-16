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

import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
import { alerts } from "../feedback/alerts";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const usernameRegex = /^[a-z0-9]{4,12}$/;
  const passwordRegex = /^[a-zA-Z\d!@#$%^&*()_+={};:<>?~.-]{6,20}$/;
  const LOGIN_URL = "/auth";

  const validateInput = (inputValue, regex) => {
    return regex.test(inputValue);
  };

  useEffect(() => {
    if (auth?.username) navigate("/");
  }, [auth?.username, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const lowercaseUsername = user.toLowerCase();
    if (
      !validateInput(lowercaseUsername, usernameRegex) ||
      !validateInput(password, passwordRegex)
    ) {
      alerts.errorAlert("Invalid login credentials");
    } else {
      try {
        const checkActive = await axiosPrivate.get(
          `/users/profiles/${lowercaseUsername}`
        );
        const active = checkActive?.data?.active;
        if (active) {
          const response = await axiosPrivate.post(LOGIN_URL, {
            username: lowercaseUsername,
            password,
          });
          const accessToken = response?.data?.accessToken;
          if (accessToken) {
            const decoded = jwtDecode(accessToken)

            const {
              username,
              bio,
              userId
            } = decoded.UserInfo

            setAuth({ username, bio, userId, accessToken });
            
            navigate("/");
          }
        } else if (!checkActive?.data)
          alerts.errorAlert("Invalid login credentials");
        else alerts.errorAlert("This account is banned");
      } catch (error) {
        if (!error?.response) {
          console.error("No Server Response");
          alerts.errorAlert("No Server Response");
        } else if (error.response?.status === 400) {
          console.error("Missing Username or Password");
          alerts.errorAlert("Missing Username or Password");
        } else if (error.response?.status === 401) {
          console.error("Unauthorized");
          alerts.errorAlert("Invalid login credentials");
        } else {
          console.error("Login Failed");
          alerts.errorAlert("Login Failed");
        }
      }
    }
  };

  return (
    <Row style={{ marginTop: "-90px" }}>
      <Col />
      <Col md="8">
        <Card>
          <CardHeader>
            <h1>Login</h1>
          </CardHeader>
          <CardBody>
            <Row>
              <Col style={{ maxWidth: "400px" }}>
                <form onSubmit={handleLogin}>
                  <label htmlFor="username">Username</label>
                  <Input
                    autoComplete="off"
                    autoFocus
                    required
                    name="username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
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
                  <Button
                    style={{ width: "100%" }}
                    color="success"
                    type="submit"
                    className="mt-4"
                  >
                    Log In
                  </Button>
                  <div className="text-center mt-4">
                    Don't have an account?
                    <u
                      onClick={() => navigate("/register")}
                      className="ml-1"
                      style={{ cursor: "pointer" }}
                    >
                      Register
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

export default Login;
