import { useState, useEffect, useRef } from "react";
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
import useAuth from "../../hooks/useAuth";
import { alerts } from "../feedback/alerts";

const Settings = () => {
  const { auth } = useAuth();
  const effectRan = useRef(false);
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const USERS_URL = `/users/${auth.userId}`;
  const passwordRegex = /^[a-zA-Z\d!@#$%^&*()_+={};:<>?~.-]{6,20}$/;
  const regex = "!@#$%^&*()_+={};:<>?~.-";

  const fetchData = async () => {
    const response = await axiosPrivate.get(USERS_URL);
    if (response.data.bio !== undefined) setBio(response.data.bio);
  };

  useEffect(() => {
    if (effectRan.current === false) {
      fetchData();
      return () => (effectRan.current = true);
    }
  }, []);

  return (
    <Row style={{ marginTop: "-90px" }}>
      <Col />
      <Col md="8">
        <Card>
          <CardHeader>
            <h1>Settings</h1>
          </CardHeader>
          <CardBody>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (newPassword.length && newPassword !== confirmNewPassword) {
                  alerts.errorAlert("New passwords do not match");
                } else if (
                  newPassword.length &&
                  !passwordRegex.test(newPassword)
                ) {
                  alerts.errorAlert(
                    "Password must be 6-20 characters long and may only contain numbers, " +
                      "letters of the English alphabet and the following symbols: " +
                      `${regex}`
                  );
                } else {
                  const response = await axiosPrivate.patch(USERS_URL, {
                    id: auth.userId,
                    password,
                    newPassword,
                    bio,
                  });
                  if (response.data) {
                    alerts.successAlert("Profile updated");
                  } else {
                    alerts.errorAlert("The password you entered was incorrect");
                  }
                  setPassword("");
                  setNewPassword("");
                  setConfirmNewPassword("");
                }
              }}
            >
              <Row>
                <Col style={{ maxWidth: "400px" }}>
                  <label htmlFor="current-password">Current Password*</label>
                  <Input
                    required
                    type="password"
                    name="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="mt-4" htmlFor="new-password">
                    New Password
                  </label>
                  <Input
                    type="password"
                    name="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label className="mt-4" htmlFor="confirm-new-password">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    name="confirm-new-password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  <label className="mt-4" htmlFor="bio">
                    Bio
                  </label>
                  <Input
                    required
                    maxLength="150"
                    minLength="1"
                    autoComplete="off"
                    type="textarea"
                    name="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <Button
                    style={{ width: "100%" }}
                    type="submit"
                    color="warning"
                    className="mt-4"
                  >
                    Update Settings
                  </Button>
                </Col>
              </Row>
            </form>
          </CardBody>
        </Card>
      </Col>
      <Col />
    </Row>
  );
};

export default Settings;
