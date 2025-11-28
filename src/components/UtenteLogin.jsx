import Form from "react-bootstrap/Form";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UtenteLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const endpoint = "http://localhost:5000/auth/login";
  const rolecontrol2 = useSelector((state) => state.main.role);

  if (rolecontrol2) return <Navigate to="/" />;

  const Login = async (payload) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          setErrors(errorData.messages);
        } else if (response.status === 401) {
          setErrors({ form: "Email or Password are incorrect" });
        } else {
          setErrors({ form: "unknown Error" });
        }
        return;
      }
      const data = await response.json();
      console.log("DATI LOGIN", data);
      localStorage.setItem("token", data.token);
      console.log("Token salvato:", data.token);
      localStorage.setItem("role", data.role);
      dispatch({ type: "SET_ROLE", payload: data.role });

      console.log(data);
      navigate("/");
    } catch (error) {
      setErrors({
        form: "Credentials not found on our database! Try again.",
        error,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { email, password };
    Login(payload);
  };

  useEffect(() => {
    setErrors({});
  }, [email, password]);

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center my-5">
          <Col
            xs={12}
            lg={6}
            className="g1 justify-content-center align-content-center bg-transparent">
            <h1 className="justify-content-start align-center my-2 purple">
              Enter your Email and Password!
            </h1>
            <Form onSubmit={handleSubmit}>
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
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
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
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </Form.Group>

              <Button
                variant="danger"
                type="submit"
                className="g1 d-block mb-2 mx-auto my-2 rounded-0">
                Submit
              </Button>
              {errors.form && (
                <div className="alert alert-danger">{errors.form}</div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UtenteLogin;
