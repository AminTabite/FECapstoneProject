import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-dark text-light">
      <Container>
        <Navbar.Brand href="#home" className="text-light">
          👊
        </Navbar.Brand>

        <Nav className="me-auto">
          <Link to={"/"} className="nav-link text-light">
            Home
          </Link>
          <Link to={"/lab"} className="nav-link text-light">
            Moves to Lab
          </Link>
          <Link to={"/edit-me/:id"} className="nav-link text-light">
            My profile
          </Link>
          <NavDropdown
            title="More"
            id="basic-nav-dropdown "
            className="bg-dark">
            <NavDropdown.Item as={Link} to="/register" className="text-light">
              Registrati
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/login" className="text-light">
              Login
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/backoffice" className="text-light">
              Management
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
