import RosterArray from "../roster.js/arrayroster";
import { Container, Col, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomeRoster = () => {
  const roster = RosterArray;

  const navigate = useNavigate();

  console.log(roster);

  return (
    <Container>
      <h1 className="text-start">
        Seleziona il personaggio e scopri la sua movelist e le sue mosse!
      </h1>
      <Row className="justify-content-center, m-auto">
        {roster.map((character) => (
          <Col
            xs={2}
            lg={3}
            key={character.name}
            className="g-2 m-1 flex-grow-0 justify-content-evenly">
            <Card className="cardwidth cardheight">
              <div
                className="bg-dark"
                onClick={() => {
                  navigate(`/character/${character.name}`);
                }}>
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
