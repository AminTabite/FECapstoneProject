import { Col, Row, Container, Button } from "react-bootstrap";
import inputs from "../assets/Notation.webp";
import { useNavigate } from "react-router-dom";
const Guide = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="px-3">
      <Row>
        <h2 className="my-3 text-center">
          Here's a quick guide to Tekken's inputs!
        </h2>
        <Col
          className="d-flex justify-content-center flex-grow-1"
          xs={12}
          lg={8}>
          <div className="d-flex flex-column align-items-center g-4 my-4">
            <div className="my-3 bg-body-tertiary">
              {" "}
              <img
                src={inputs}
                alt="inputs guide"
                style={{ maxHeight: "100%" }}
              />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p>
                {" "}
                HE/ H = Heat, in heat every character gets enhanced or new moves
                available. You can activate heat by pressing 2+3!
              </p>
              <p>
                RA = Rage art! Rage it's a state where the player has only few
                HP left, all moves deal more damage and you get a special
                unblockable attack! the less hp You have the more dmg It deals
                but its -18 , be careful!{" "}
              </p>
            </div>

            <Button
              onClick={() => navigate("/")}
              className="m-2 p-2 rounded-0 text-light bg-danger w-25 mx-auto">
              Back to HomePage
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Guide;
