import { useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import RosterArray from "../roster.js/arrayroster";
import Form from "react-bootstrap/Form";

const MoveSearchbar = () => {
  const [characterName, setCharacter] = useState("");
  const [moveInput, setMoveinput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const endpoint = `http://localhost:5000/proxy/tekken/${characterName}`;

  const GetSpecificMove = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    if (!characterName || !moveInput.trim()) {
      setError("Select a fighter and insert an input");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }
      const data = await response.json();
      const frames = data.framesNormal || [];

      //filtraggio per input scelto dal utente
      const userquery = moveInput.trim().toLowerCase();
      constfound = frames.find(
        (move) => move.command?.trim().toLowerCase() === userquery
      );

      if (found) {
        setResult(found);
      } else {
        setError("Move not found, try again");
      }
    } catch (error) {
      setError("Something went wrong! try again.");
      console.log("Errore:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (!result || !token) return;

    const payload = {
      moveInput: result.command,
      characterName: characterName,
      damage: result.damage,
      startup: result.startup,
      onBlock: result.block,
      onHit: result.hit,
      hitLevel: result.hitLevel,
      recovery: result.recovery,
    };

    const PostFavoriteMove = async (token, payload, moveIndex) => {
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
          if (response.status === 400) {
            setDuplicateMoveIndex(moveIndex);
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDuplicateMoveIndex(null);
        console.log(data);
      } catch (error) {
        console.log("errore nell' aggiunta mosse", error);
      }
    };

    PostFavoriteMove(token, payload);
    console.log("added to favorites", payload);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={5} lg={5}>
          <Form.Select
            aria-label="Select character"
            value={characterName}
            onChange={(e) => setCharacter(e.target.value)}>
            <option>Open this select menu</option>
            <option value="">Select a character</option>
            {RosterArray.map((char) => (
              <option key={char.name} value={char.name}>
                {char.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={5} lg={5} className=" m-1">
          <Form.Control type="text" placeholder="(es: f,f+2 or d/f+1)." />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Button
          className="dan bg-light text-danger"
          onClick={GetSpecificMove}
          disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Cercando...
            </>
          ) : (
            "Find the move!"
          )}
        </Button>
        //se e' un errore
        {error && (
          <Alert variant="danger" className="mt-3 text-center">
            {error}
          </Alert>
        )}
        //se e' corretto
        {result && (
          <div className="mt-4 p-3 border rounded">
            <h5>Mossa trovata!</h5>
            <div>
              <strong>Command:</strong> {result.command}
            </div>
            <div>
              <strong>Damage:</strong> {result.damage}
            </div>
            <div>
              <strong>Startup:</strong> {result.startup}
            </div>
            {/* Altri campi... */}
            <Button variant="success" className="mt-2" onClick={addToFavorites}>
              Add to Favorites
            </Button>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default MoveSearchbar;
