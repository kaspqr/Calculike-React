import { useState } from "react";
import Select from "react-select";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";

import { axiosPrivate } from "../../api/axios";
import HiscoreUser from "./HiscoreUser";
import { LEVEL_OPTIONS, TYPE_OPTIONS } from "../consts";
import { alerts } from "../feedback/alerts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Hiscores = () => {
  const [hiscores, setHiscores] = useState([]);
  const [levelType, setLevelType] = useState(undefined);
  const [level, setLevel] = useState(undefined);
  const [levelTypeLabel, setLevelTypeLabel] = useState(undefined);
  const [levelLabel, setLevelLabel] = useState(undefined);
  const [resultsLabel, setResultsLabel] = useState(undefined);

  const fetchData = async (url) => {
    const response = await axiosPrivate.get(url);

    const scores = response?.data?.scores

    setHiscores(scores);

    if (scores === 0) {
      alerts.warningAlert("There are no hiscores for the level of this gamemode yet.")
    }
  };

  const handleHiscoreSearch = (e) => {
    e.preventDefault();

    const HISCORES_URL = `/hiscores/${levelType + level}`;

    setResultsLabel(`${levelTypeLabel} Level ${levelLabel}`);

    fetchData(HISCORES_URL);
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
            {hiscores?.length <= 0 ? null : (
              <Row className="mt-4">
                <Col>
                  <Card>
                    <CardHeader>{resultsLabel}</CardHeader>
                    <CardBody>
                      {hiscores.map((hiscore, i) => (
                        <HiscoreUser
                          key={hiscore}
                          user={hiscore?.user}
                          gameType={levelType + level}
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
