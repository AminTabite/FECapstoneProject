import Form from "react-bootstrap/Form";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UtenteLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const endpoint = "http://localhost:5000/auth/login";

  const Login = async (payload) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Token salvato:", data.token);
      console.log(data);
    } catch (error) {
      console.error("Errore nella fetch:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { email, password };
    Login(payload);
    navigate("/");
  };

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center my-5">
          <Col
            xs={12}
            lg={6}
            className="g1 justify-content-center align-content-center bg-info">
            <h1 className="justify-content-start align-center my-2 purple">
              Inserisci i tuoi dati per registrarti al sito !
            </h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="g1 d-block mb-2 mx-auto my-2">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UtenteLogin;
