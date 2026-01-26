import { Container, Col, Row, Card, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import kazuyaSmile from "../assets/tekken-1-kazuya-smile.webp";
const Backoffice = () => {
  const [users, setUsers] = useState([]); //array verra' riempito con tutti gli users
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // token per vedere se lo user e' admin
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const endpoint =
    "https://capstone-project-t8-be-production.up.railway.app/utenti";

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
          `Errore nella cancellazione utente, status: ${response.status}`,
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
      <h1>Users</h1>
      <Row>
        {loading ? (
          <div className="d-flex justify-content-center align-content-center">
            <Spinner animation="grow" className="text-info text-center" />
            <Spinner animation="grow" className="text-info text-center" />
            <Spinner animation="grow" className="text-info text-center" />
            <Spinner animation="grow" className="text-info text-center" />
          </div>
        ) : (
          users.map((user, id) => (
            <Col
              xs={12}
              lg={3}
              className="d-flex justify-content-center my-3 g-3">
              <Card key={id} className=" my-2 p-2 g-2 flex-grow-1 text-dark">
                <Card.Img
                  variant="top"
                  className="imgcard2"
                  src={kazuyaSmile}
                />
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                  <Card.Text>{user.role}</Card.Text>
                  <div className="d-flex  justify-content-evenly ">
                    <Button
                      className="bg-danger m2 p-2 rounded-0"
                      onClick={() => {
                        DeleteUser(user.id);
                      }}>
                      {" "}
                      Delete{" "}
                    </Button>

                    <Button
                      key={user.id}
                      className="bg-danger m2 p-2 rounded-0"
                      onClick={() => {
                        navigate(`/edit-user/${user.id}`);
                      }}>
                      {" "}
                      Update details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Backoffice;
