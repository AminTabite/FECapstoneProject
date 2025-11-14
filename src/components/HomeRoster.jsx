import RosterArray from "../roster.js/arrayroster";
import { Container, Col, Row, Card } from "react-bootstrap";

const HomeRoster = () => {
  const roster = RosterArray;

  console.log(roster);

  return (
    <Container>
      <h1 className="text-start">
        Seleziona il personaggio e scopri la sua movelist e le sue mosse!
      </h1>
      <Row className="justify-content-center, m-2">
        {roster.map((character) => (
          <Col xs={2} lg={3} key={character.name} className="g-2 m-1">
            <Card className="cardwidth cardheight">
              <div className="bg-dark">
                <Card.Img
                  className="card-img"
                  variant="top"
                  src={character.picture}
                />
              </div>
              <Card.Body className="p-0">
                <p className="text-center">{character.name}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeRoster;
