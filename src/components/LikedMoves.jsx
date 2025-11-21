import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const LikedMoves = () => {
  const [likedMove, setLikedMove] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const endpoint = "http://localhost:5000/favorites";
  const token = localStorage.getItem("token");

  const GetLikedMoves = async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Errore, status: ${response.status}`);
      }
      const data = await response.json();

      setLikedMove(data);
      setLoading(false);
      console.log(data);

      //mosse preferite
    } catch (error) {
      console.log("Errore nella fetch mosse", error);
    }
  };

  const DeleteFavoriteMove = async (id) => {
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
          `Errore nella cancellazione, status: ${response.status}`
        );
      }
      console.log("Mossa preferita cancellata con successo");
      setRefresh((prev) => !prev); //ritorna allo stato precedente senza la mossa cancellata
    } catch (error) {
      console.log("Errore nella delete", error);
    }
  };

  useEffect(() => {
    GetLikedMoves();
  }, [refresh]);

  return (
    <Container>
      <Row>
        <Col xs={12} lg={12} className="justify-content-center">
          <ListGroup>
            {loading ? (
              <div className="d-flex justify-content-center align-content-center">
                <Spinner animation="grow" className="text-danger text-center" />
                <Spinner animation="grow" className="text-danger text-center" />
                <Spinner animation="grow" className="text-danger text-center" />
                <Spinner animation="grow" className="text-danger text-center" />
              </div>
            ) : (
              likedMove.map((move, id) => (
                <ListGroup.Item key={id} className="my-2">
                  <div>
                    <strong> Name :</strong> {move.characterName}
                  </div>
                  <div>
                    <strong>input :</strong> {move.moveInput}
                  </div>
                  <div>
                    <strong>on Hit :</strong> {move.onHit}
                  </div>
                  <div>
                    <strong>on Block :</strong> {move.onBlock}
                  </div>
                  <div>
                    <strong> Recovery :</strong> {move.recovery}
                  </div>
                  <div>
                    <strong> Start up :</strong> {move.startup}
                  </div>
                  <div>
                    <strong>Hit Level :</strong> {move.hitLevel}
                  </div>
                  <div>
                    <Button
                      className="p1 m1 rounded-3 bg-black"
                      onClick={() => {
                        DeleteFavoriteMove(move.id, token);
                      }}>
                      ✖️
                    </Button>
                  </div>

                  {move.notes && (
                    <pre style={{ whiteSpace: "pre-wrap" }}>{move.notes}</pre>
                  )}
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default LikedMoves;
