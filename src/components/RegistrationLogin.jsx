import Form from "react-bootstrap/Form";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegistrationLogin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch(); //funzione che mi porta un cambio di stato dentro il reducer

  const endpoint = "http://localhost:5000/auth/register";

  const DoRegistration = async (payload) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Errore nella fetch:", error);
      setErrorMsg("Error your credentials might be wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { username, email, password, role };
    DoRegistration(payload);
    dispatch({ type: "SET_ROLE", payload: role });
    setSuccessMsg("Updated successfully");
    navigate("/login");
  };

  useEffect(() => {
    setErrorMsg("");
  }, [email, password, username, role]);
  return (
    <>
      {errorMsg && (
        <div className="alert alert-danger text-center my-2">{errorMsg}</div>
      )}{" "}
      :{" "}
      {successMsg && (
        <div className="alert alter-success text-center my-2">{successMsg}</div>
      )}
      <Container fluid className=" d-flex justify-content-center ">
        <Row className="">
          <Col
            xs={12}
            lg={12}
            className="g-1 justify-content-center align-content-center bg-transparent mx-auto flex-grow-1 ">
            <h1 className="justify-content-start align-center my-2 text-danger">
              A new fighter craves Knowledge!
            </h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}>
                  <option value="">Seleziona ruolo...</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </Form.Select>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Button
                variant="danger"
                type="submit"
                className="g1 d-block mb-2 mx-auto my2 rounded-0">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationLogin;
