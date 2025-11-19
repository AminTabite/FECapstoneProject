import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-dark text-light">
      <Container>
        <Navbar.Brand href="#home" className="text-light">
          TEKKEN DB 👊
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Nav className="me-auto">
          <Link to={"/"} className="nav-link text-light">
            Home
          </Link>
          <Link to={"/lab"} className="nav-link text-light">
            Moves to Lab
          </Link>
          <Link to={"/register"} className="nav-link text-light">
            Registrati
          </Link>
          <Link to={"/login"} className="nav-link text-light">
            Login
          </Link>
          <Link to={"/backoffice"} className="nav-link text-light">
            Management
          </Link>
          <Link to={"/edit-me/:id"} className="nav-link text-light">
            My profile
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
