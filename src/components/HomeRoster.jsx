import RosterArray from "../roster.js/arrayroster";
import { Container, Col, Row, Card } from "react-bootstrap";

const HomeRoster = () => {
  const roster = RosterArray;

  console.log(roster);

  return (
    <Container>
      <Row className="justify-content-center, m-2">
        {roster.map((character) => (
          <Col xs={2} lg={3} key={character.name} className="g-2 m-1">
            <Card>
              <div className="bg-dark">
                <Card.Img variant="top" src={character.picture} />
              </div>
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeRoster;
