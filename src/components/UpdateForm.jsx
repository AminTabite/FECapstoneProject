import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const UpdateForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const endpoint = `http://localhost:5000/utenti/${id}`;

  const getOldUser = async ({ id }) => {
    setLoading(true);

    try {
      const response = await fetch(endpoint, {
        headers: { Authorizazion: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Errore, status: ${response.status}`);
      }
      const data = await response.json();

      setUsername(data.username);
      setEmail(data.email);
      setPassword(data.password);
      setRole(data.role);
      console.log(data);
    } catch (error) {
      console.log("errore nella get utente ", error);
    }
  };

  useEffect(() => {
    getOldUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // logica submit qui
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center my-5">
        <Col
          xs={12}
          lg={6}
          className="g1 justify-content-center align-content-center bg-info">
          <h1 className="justify-content-start align-center my-2 purple">
            Update User's details
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {/* Aggiungi il campo per role se serve */}

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
  );
};

export default UpdateForm;
