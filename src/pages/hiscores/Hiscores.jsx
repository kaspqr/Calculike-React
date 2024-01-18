import { useRef, useState } from "react";
import Select from "react-select";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";

import { axiosPrivate } from "../../api/axios";
import HiscoreUser from "./HiscoreUser";
import { LEVEL_OPTIONS, TYPE_OPTIONS } from "../consts";
import { alerts } from "../feedback/alerts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Hiscores = () => {
  const searchRef = useRef("");

  const [hiscoreUsers, setHiscoreUsers] = useState([]);
  const [levelType, setLevelType] = useState(undefined);
  const [level, setLevel] = useState(undefined);
  const [levelTypeLabel, setLevelTypeLabel] = useState(undefined);
  const [levelLabel, setLevelLabel] = useState(undefined);
  const [resultsLabel, setResultsLabel] = useState(undefined);

  const USERS_URL = "/users";

  const fetchData = async () => {
    const response = await axiosPrivate.get(USERS_URL);
    const filteredResponse = response.data.filter(
      (user) => user[searchRef.current] > 0
    );
    const activeResponse = filteredResponse.filter(
      (user) => user.active === true
    );
    const finalResponse = activeResponse.sort(
      (a, b) => b[searchRef.current] - a[searchRef.current]
    );
    const finalResult = finalResponse.slice(0, 10);
    setHiscoreUsers(finalResult);
    if (finalResult?.length === 0) {
      alerts.warningAlert(
        "There are no hiscores for the level of this gamemode yet."
      );
    }
  };

  const handleHiscoreSearch = (e) => {
    e.preventDefault();
    searchRef.current = levelType + level;
    setResultsLabel(`${levelTypeLabel} Level ${levelLabel}`);
    fetchData();
  };

  return (
    <Row style={{ marginTop: "-90px" }}>
      <Col />
      <Col md="8">
        <Card>
          <CardHeader>
            <h1>Hiscores</h1>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleHiscoreSearch}>
              <Row style={{ maxWidth: "400px" }}>
                <Col>
                  <label htmlFor="calc-select">Type</label>
                  <Select
                    options={TYPE_OPTIONS}
                    onChange={(newValue) => {
                      if (newValue) {
                        setLevelType(newValue.value);
                        setLevelTypeLabel(newValue.label);
                      }
                    }}
                    name="calc-select"
                  />
                </Col>
              </Row>
              <Row className="mt-4" style={{ maxWidth: "400px" }}>
                <Col>
                  <label htmlFor="level-select">Level</label>
                  <Select
                    onChange={(newValue) => {
                      if (newValue) {
                        setLevel(newValue.value);
                        setLevelLabel(newValue.label);
                      }
                    }}
                    name="level-select"
                    options={LEVEL_OPTIONS}
                  />
                </Col>
              </Row>
              <Row className="mt-4" style={{ maxWidth: "400px" }}>
                <Col>
                  <Button color="success" type="submit">
                    View <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Button>
                </Col>
              </Row>
            </form>
            {hiscoreUsers?.length > 0 && (
              <Row className="mt-4">
                <Col>
                  <Card>
                    <CardHeader>{resultsLabel}</CardHeader>
                    <CardBody>
                      {hiscoreUsers.map((user, i) => (
                        <HiscoreUser
                          key={i}
                          user={user}
                          searchRef={searchRef}
                          i={i}
                        />
                      ))}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
          </CardBody>
        </Card>
      </Col>
      <Col />
    </Row>
  );
};

export default Hiscores;
