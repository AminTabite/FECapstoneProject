import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-dark text-light">
      <Container>
        <Navbar.Brand href="#home" className="text-light">
          TEKKEN DB 👊
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="text-light">
              Home
            </Nav.Link>
            <Nav.Link href="#link" className="text-light">
              Link
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
