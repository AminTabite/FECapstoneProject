import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Container, Col, Row } from "react-bootstrap";

const UtenteLogin = () => {
  return (
    <>
      <Container>
        <Row>
          <Col
            xs={12}
            lg={6}
            className="g1 justify-content-center align-content-center bg-info">
            <h1 className="justify-content-start align-center my-2 purple">
              Effettua il login per accedere al sito
            </h1>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3 my-4 p-2">
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="my-4 p-2">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UtenteLogin;
