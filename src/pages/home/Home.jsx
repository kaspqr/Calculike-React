import { Card, CardHeader, Row, Col, CardBody } from 'reactstrap'

const Home = () => {
  return (
    <Row style={{ marginTop: '-90px' }}>
      <Col />
      <Col md="8">
        <Card>
          <CardHeader>
            <h1>Newsfeed</h1>
          </CardHeader>
          <CardBody>
            <h3>September 19th, 2023</h3>
            <p>
              Visitors are now able to play the game without logging in.
            </p>
            <h3>May 23rd, 2023</h3>
            <p>
              Styling changed.
            </p>
            <h3>April 17th, 2023</h3>
            <p>
              Bugs fixed, styling changed.
            </p>
            <h3>April 4th, 2023</h3>
            <p>
              Calculike deployed for public use.
            </p>
          </CardBody>
        </Card>
      </Col>
      <Col />
    </Row>
  )
}

export default Home
