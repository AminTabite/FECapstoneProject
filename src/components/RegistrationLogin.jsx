import Form from "react-bootstrap/Form";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const RegistrationLogin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const endpoint = "http://localhost:5000/auth/register";

  const DoRegistration = async (payload) => {
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
      console.log(data);
    } catch (error) {
      console.error("Errore nella fetch:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { username, email, password, role };
    DoRegistration(payload);
  };

  return (
    <Container>
      <Row>
        <Col
          xs={12}
          lg={6}
          className="g1 justify-content-center align-content-center bg-dark">
          <h1 className="justify-content-start align-center my-2 text-info">
            Inserisci i tuoi dati per registrarti al sito !
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <option value="">Seleziona ruolo...</option>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </Form.Select>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="g1 d-block mb-2 mx-auto my2">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationLogin;
