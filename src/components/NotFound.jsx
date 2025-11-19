import { Container, Col, Row, Card, Button } from "react-bootstrap";
import Mygif from "../assets/armorking-giantswing-tekken2.gif";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center" xs={12}>
          <div className="d-flex flex-column align-items-center justify-content-center my-5">
            <img
              src={Mygif}
              alt="gif no autorizzazione"
              style={{ maxWidth: "100%" }}
            />
            <h5>Are you Lost? </h5>
            <h6>error 404: not found!</h6>
            <Button
              onClick={() => navigate("/")}
              className="m-2 p-2 rounded-0 text-info bg-danger w-25 mx-auto">
              Back to HomePage
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
