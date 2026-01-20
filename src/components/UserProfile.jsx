import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import jintatBg from "../assets/jintatoo.png";
import { useDispatch } from "react-redux";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Gestisce eventuali errori
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        "Errore nel caricamento profilo, Hai effettuato la registrazione e il login?",
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
          `Errore nella cancellazione profilo, status: ${response.status} `,
        );
      }

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      dispatch({ type: "SET_ROLE", payload: "" });
      navigate("/register");

      console.log("profilo eliminato correttamente");
    } catch (error) {
      console.log("Errore nella delete", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch({ type: "SET_ROLE", payload: "" });
    navigate("/login");
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Container>
      <h1 className="justify-content-start align-center my-5 purple">
        My profile
      </h1>
      <Row className="d-flex justify-content-center my-5 flex-xs-column flex-lg-row">
        <Col
          xs={12}
          lg={6}
          className="g1 justify-content-center align-content-center bg-transparent">
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
            <div
              style={{
                backgroundImage: `url(${jintatBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
              <Card className="">
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Text>Email: {user.email}</Card.Text>
                  <Card.Text>Role: {user.role}</Card.Text>
                  <Button
                    variant="dark"
                    className="g1 d-block mb-2 mx-auto my-2 px-2"
                    onClick={() => navigate(`/edit-me`)}>
                    Edit profile
                  </Button>
                  <Button
                    variant="danger"
                    className="g1 d-block mb-2 mx-auto my-2 px-2 text-black"
                    onClick={DeleteMyProfile}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          )}
        </Col>
        <Col xs={12} lg={6} className="d-flex justify-content-center my-2">
          {" "}
          <div className="d-flex align-content-center align-items-center my-4 flex-column justify-content-evenly">
            <Button
              className=" bg-light text-info bg-transparent border-info"
              onClick={logout}>
              {" "}
              Log out{" "}
            </Button>

            <div className=" m-3">
              <h6> "Skill issue!" </h6>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
