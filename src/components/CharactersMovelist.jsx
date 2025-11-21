import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const CharactersMovelist = () => {
  const [moves, setMoves] = useState([]); // Inizializza come array
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const token = localStorage.getItem("token"); //mi serve il token per inserire mosse nei preferiti

  const endpoint = `http://localhost:5000/proxy/tekken/${params.name}`;

  const Getmovelist = async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Errore, status: ${response.status}`);
      }
      const data = await response.json();

      //  data e' un array di mosse

      setMoves(data.framesNormal);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log("Errore nella fetch", error);
    }
  };

  const endpoint1 = "http://localhost:5000/favorites";

  const PostFavoriteMove = async (token, payload) => {
    try {
      const response = await fetch(endpoint1, {
        method: "POST",
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
    } catch (error) {
      console.log("errore nell' aggiunta mosse", error);
    }
  };

  useEffect(() => {
    Getmovelist();
  }, [params.name]);

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
              moves.map((move, index) => {
                const favoritePayload = {
                  moveInput: move.command,
                  characterName: params.name,
                  damage: move.damage,
                  startup: move.startup,
                  onBlock: move.block,
                  onHit: move.hit,
                  hitLevel: move.hitLevel,
                  recovery: move.recovery,
                };

                return (
                  <ListGroup.Item key={index} className="my-2">
                    <h5>{move.name}</h5>
                    <div>
                      <strong>Command ➡️ :</strong> {move.command}
                    </div>
                    <div>
                      <strong>Damage ⚡ :</strong> {move.damage}
                    </div>
                    <div>
                      <strong>Startup 🕙 :</strong> {move.startup}
                    </div>
                    <div>
                      <strong>Block 🛡️ :</strong> {move.block}
                    </div>

                    <div>
                      <strong>Recovery ❗ :</strong> {move.recovery}
                    </div>
                    <div>
                      <strong>Hit 💥 :</strong> {move.hit}
                    </div>
                    <div>
                      <strong>Hit Level 💫 :</strong> {move.hitLevel}
                    </div>

                    {move.notes && (
                      <pre style={{ whiteSpace: "pre-wrap" }}>{move.notes}</pre>
                    )}
                    <div
                      className="justify content center align-content-center"
                      onClick={() => {
                        PostFavoriteMove(token, favoritePayload);
                      }}>
                      <Button className="p2 m2 bg bg-danger rounded-0">
                        {" "}
                        Add To List
                      </Button>
                    </div>
                  </ListGroup.Item>
                );
              })
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CharactersMovelist;
