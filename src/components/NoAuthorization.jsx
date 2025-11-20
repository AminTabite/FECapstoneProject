import { Container, Col, Row, Card, Button } from "react-bootstrap";
import Mygif from "../assets/2379e26ec290f8b64d533acad52a710b79e4f5fcr1-400-225_hq.gif";
import { useNavigate } from "react-router-dom";

const NoAuthorization = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-0">
      <Row>
        <Col className="d-flex justify-content-center" xs={12}>
          <div className="d-flex flex-column align-items-center justify-content-center my-5">
            <img
              src={Mygif}
              alt="gif no autorizzazione"
              style={{ maxWidth: "100%" }}
            />
            <h5>non hai le autorizzazioni per accedere a questa pagina</h5>
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

export default NoAuthorization;
