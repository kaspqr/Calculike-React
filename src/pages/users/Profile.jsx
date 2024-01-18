import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";

import { axiosPrivate } from "../../api/axios";
import { ALL_LEVELS } from "../consts";
import { getScoreLevel } from "../utils";

import Novice from "../../images/novice.png";
import Apprentice from "../../images/apprentice.png";
import Practitioner from "../../images/practitioner.png";
import Mathematician from "../../images/mathematician.png";
import Prodigy from "../../images/prodigy.png";
import Expert from "../../images/expert.png";
import Grandmaster from "../../images/grandmaster.png";
import Archimedes from "../../images/archimedes.png";
import Pythagoras from "../../images/pythagoras.png";

const Profile = () => {
  const effectRan = useRef(false);
  const params = useParams();

  const [user, setUser] = useState({});
  const [isResponse, setIsResponse] = useState(true);

  const USERS_URL = `users/profiles/${params.id}`;
  const validLevels = ALL_LEVELS.filter((level) => user[level] > 0);

  const fetchData = async () => {
    const response = await axiosPrivate.get(USERS_URL);
    const active = response?.data?.active;
    if (active) {
      setUser(response.data);
    } else setIsResponse(false);
  };

  useEffect(() => {
    if (effectRan.current === false) {
      fetchData();
      return () => (effectRan.current = true);
    }
  }, []);

  if (!isResponse) {
    return (
      <div style={{ textAlign: "center" }} className="profile-content">
        Error 404: User not found
      </div>
    );
  }

  return (
    <Row style={{ marginTop: "-90px" }}>
      <Col />
      <Col md="8">
        <Card>
          <CardBody>
            <div className="m-0 p-0 text-center">
              <h1>{user.username}</h1>
            </div>
            <div className="m-0 p-0 text-center">
              <img
                style={{ height: "50px" }}
                src={
                  user.rankScore < 100
                    ? Novice
                    : user.rankScore < 1000
                    ? Apprentice
                    : user.rankScore < 10000
                    ? Practitioner
                    : user.rankScore < 50000
                    ? Mathematician
                    : user.rankScore < 100000
                    ? Prodigy
                    : user.rankScore < 150000
                    ? Expert
                    : user.rankScore < 200000
                    ? Grandmaster
                    : user.rankScore < 250000
                    ? Archimedes
                    : Pythagoras
                }
                alt="badge"
              />
            </div>
            <div className="m-0 p-0 text-center">
              <b>{user.rankName}</b>
            </div>
            <div className="m-0 p-0 text-center">
              {Math.floor(user.rankScore)}
            </div>
            <div className="m-0 p-0 text-center">
              <i>{user.bio}</i>
            </div>
            {validLevels.length > 0 && (
              <Row className="m-0 p-0 mt-4">
                <h2>Scores</h2>
              </Row>
            )}
            {validLevels.map((level) => (
              <Row key={level}>
                <Col>{getScoreLevel({ level })}</Col>
                <Col className="text-right">{user[level]}</Col>
              </Row>
            ))}
          </CardBody>
        </Card>
      </Col>
      <Col />
    </Row>
  );
};

export default Profile;
