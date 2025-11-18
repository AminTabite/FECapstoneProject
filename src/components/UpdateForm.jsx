import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const UpdateForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [successMsg, setSuccessMsg] = useState(""); //avverte utente della modifica
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const endpoint = `http://localhost:5000/utenti/${id}`;

  const getOldUser = async () => {
    setLoading(true);

    try {
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Errore, status: ${response.status}`);
      }
      const data = await response.json();

      setUsername(data.username);
      setEmail(data.email);
      setPassword(data.password);
      setRole(data.role);
      setLoading(false);
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
    const payload = {
      username,
      email,
      password,
      role,
    };

    const UpdateNewUser = async (payload) => {
      try {
        const response = await fetch(endpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setSuccessMsg("Updated successfully!");

        // Optionally, delay navigation to let user see success message
        setTimeout(() => navigate("/backoffice"), 1500);
      } catch (error) {
        console.log("errore nel aggiornamento del profilo selezionato", error);
      }
    };

    UpdateNewUser(payload);
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
          {loading ? (
            <div className="d-flex justify-content-center align-content-center">
              <Spinner animation="grow" className="text-info text-center" />
              <Spinner animation="grow" className="text-info text-center" />
              <Spinner animation="grow" className="text-info text-center" />
              <Spinner animation="grow" className="text-info text-center" />
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
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

              <Form.Group className="mb-3" controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => {
                    console.log("Ruolo selezionato:", e.target.value);
                    setRole(e.target.value);
                  }}>
                  <option value="">Seleziona ruolo...</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </Form.Select>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="g1 d-block mb-2 mx-auto my-2">
                Save changes!
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateForm;
