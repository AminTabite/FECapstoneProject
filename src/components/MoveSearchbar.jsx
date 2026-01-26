import { useState } from "react";
import { Container, Col, Row, Button, Alert, Spinner } from "react-bootstrap";
import RosterArray from "../roster.js/arrayroster";
import Form from "react-bootstrap/Form";
import { FaSearch } from "react-icons/fa";

const MoveSearchbar = () => {
  const token = localStorage.getItem("token");
  const [characterName, setCharacter] = useState("");
  const [moveInput, setMoveinput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [duplicateMoveIndex, setDuplicateMoveIndex] = useState(null);
  const endpoint = `https://capstone-project-t8-be-production.up.railway.app/proxy/tekken/${characterName}`;
  const endpoint1 =
    "https://capstone-project-t8-be-production.up.railway.app/favorites";

  const normalizeCommand = (cmd) => {
    if (!cmd) return "";
    let normalized = cmd.trim().toLowerCase();

    // Rimuove spazi, virgole, slash, :
    normalized = normalized.replace(/[\s,/:]+/g, "");

    // Comprime SOLO direzioni+numero pensato per mosse come 1+2/ 3+4 etc
    normalized = normalized.replace(/([fdbu]+(?:f|b)?)\+([1234])/g, "$1$2");

    return normalized;
  };

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
      const endpoint = `http://localhost:5000/proxy/tekken/${characterName}`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }
      const data = await response.json();
      const frames = data.framesNormal || [];

      // ← QUI usi la funzione normalizzata
      const userquery = normalizeCommand(moveInput);
      const found = frames.find(
        (move) => normalizeCommand(move.command) === userquery,
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
      <Row className="d-flex justify-content-center mt-3 align-items-end">
        <Col xs={5} lg={5} className="pe-2">
          <Form.Select
            aria-label="Select character"
            value={characterName}
            onChange={(e) => setCharacter(e.target.value)}
            className="h-100">
            <option value="">Select a character</option>
            {RosterArray.map((char) => (
              <option key={char.name} value={char.name}>
                {char.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={5} lg={5} className="">
          <Form.Control
            type="text"
            placeholder="(es: f,f+2 or d/f+1)."
            value={moveInput}
            onChange={(e) => setMoveinput(e.target.value)}
            className="h-100"
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <div className="d-flex justify-content-center ">
          <Button
            className="dan bg-light text-primary px-3 py-1 my-4"
            onClick={GetSpecificMove}
            disabled={loading}
            size="m">
            {loading ? (
              <>
                <Spinner size="sm" className="me-1" />
                <span className="d-none d-md-inline">loading...</span>
              </>
            ) : (
              <FaSearch size={16} />
            )}
          </Button>
        </div>
        {/*se e' un errore*/}
        {error && (
          <Alert variant="danger" className="mt-3 text-center">
            {error}
          </Alert>
        )}
        {/*se e' corretto*/}
        {result && (
          <div className="mt-4 p-3 border rounded bg-light text-black m-1 d-flex flex-column justify-content-between mb-3">
            <div>
              <strong>Command ➡️ :</strong> {result.command}
            </div>
            <div>
              <strong>Damage ⚡ :</strong> {result.damage}
            </div>
            <div>
              <strong>Startup 🕙 :</strong> {result.startup}
            </div>
            <div>
              <strong>Block 🛡️ :</strong> {result.block}
            </div>
            <div>
              <strong>Recovery ❗ :</strong> {result.recovery}
            </div>
            <div>
              <strong>Hit 💥 :</strong> {result.hit}
            </div>
            <div>
              <strong>Hit Level 💫 :</strong> {result.hitLevel}
            </div>

            <div
              className="justify content center align-content-center"
              onClick={addToFavorites}>
              <Button className="p2 m2 bg bg-danger rounded-0">
                Add To List
              </Button>
            </div>
            {characterName && moveInput === characterName && moveInput && (
              <div className="alert alert-danger mt-2 text-center">
                Move already present!
              </div>
            )}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default MoveSearchbar;
