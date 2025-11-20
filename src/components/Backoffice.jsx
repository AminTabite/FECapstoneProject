import { Container, Col, Row, Card, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Backoffice = () => {
  const [users, setUsers] = useState([]); //array verra' riempito con tutti gli users
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // token per vedere se lo user e' admin
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const endpoint = "http://localhost:5000/utenti";

  const Getusers = async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Errore, status: ${response.status}`);
      }
      const data = await response.json();

      setUsers(data.content);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log("errore nella fetch utenti", error);
    }
  };

  useEffect(() => {
    Getusers();
  }, [refresh]);

  const DeleteUser = async (id) => {
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Errore nella cancellazione utente, status: ${response.status}`
        );
      }
      console.log("utente cancellato con successo");
      setRefresh((prev) => !prev); //ritorna allo stato precedente senza la mossa cancellata
    } catch (error) {
      console.log("Errore nella delete", error);
    }
  };

  return (
    <Container>
      <h1>Utenti registrati nel sito</h1>
      <Row>
        <Col xs={12} lg={6} className="d-flex justify-content-center">
          {loading ? (
            <div className="d-flex justify-content-center align-content-center">
              <Spinner animation="grow" className="text-info text-center" />
              <Spinner animation="grow" className="text-info text-center" />
              <Spinner animation="grow" className="text-info text-center" />
              <Spinner animation="grow" className="text-info text-center" />
            </div>
          ) : (
            users.map((user, id) => (
              <Card key={id} className=" my-2 p-2 g-2 flex-grow-1">
                <Card.Img
                  variant="top"
                  src={"./assets/tekken-1-kazuya-smile.webp"}
                />
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                  <Card.Text>{user.role}</Card.Text>
                  <div>
                    <Button
                      className="bg-danger m1 p-1"
                      onClick={() => {
                        DeleteUser(user.id);
                      }}>
                      {" "}
                      Delete{" "}
                    </Button>

                    <Button
                      key={user.id}
                      className="m1- p-1 "
                      onClick={() => {
                        navigate(`/edit-user/${user.id}`);
                      }}>
                      {" "}
                      Update details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Backoffice;
