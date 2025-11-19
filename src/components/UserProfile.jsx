import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Gestisce eventuali errori
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const endpoint = "http://localhost:5000/utenti/me";

  const getProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Errore, status: ${response.status}`);
      }
      const data = await response.json();
      setUser(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setError(
        "Errore nel caricamento profilo, Hai effettuato la registrazione e il login?"
      );
      setUser(null);
      setLoading(false);
    }
  };

  const DeleteMyProfile = async () => {
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error(
          `Errore nella cancellazione profilo, status: ${response.status} `
        );
      }
      localStorage.removeItem("token");
      navigate("/register");
      console.log("profilo eliminato correttamente");
    } catch (error) {
      console.log("Errore nella delete", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Container>
      <Row className="d-flex justify-content-center my-5">
        <Col
          xs={12}
          lg={6}
          className="g1 justify-content-center align-content-center bg-info">
          <h1 className="justify-content-start align-center my-2 purple">
            My profile
          </h1>
          {loading ? (
            <div className="d-flex justify-content-center align-content-center">
              <Spinner animation="grow" className="text-info text-center" />
              <Spinner animation="grow" className="text-info text-center" />
              <Spinner animation="grow" className="text-info text-center" />
              <Spinner animation="grow" className="text-info text-center" />
            </div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : !user ? (
            <div>Profilo non trovato</div>
          ) : (
            <Card>
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Ruolo: {user.role}</Card.Text>
                <Button
                  variant="primary"
                  className="g1 d-block mb-2 mx-auto my-2"
                  onClick={() => navigate(`/edit-user/${user.id}`)}>
                  Modifica profilo
                </Button>
                <Button
                  variant="secondary"
                  className="g1 d-block mb-2 mx-auto my-2"
                  onClick={DeleteMyProfile}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
