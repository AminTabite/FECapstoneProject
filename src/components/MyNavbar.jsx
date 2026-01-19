import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/Senza titolo-2.png";

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-dark text-light">
      <Container>
        <Navbar.Brand href="#home" className="text-light">
          <img
            style={{ width: "40px", height: "40px", margin: "10px" }}
            src={logo}
          />
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
          <Link to={"/searchingMove"} className="nav-link text-light">
            Search
          </Link>
          <NavDropdown
            title="More"
            id="basic-nav-dropdown "
            className="totaldark">
            <NavDropdown.Item
              as={Link}
              to="/guide"
              className="text-light totaldark">
              Guide
            </NavDropdown.Item>

            <NavDropdown.Item
              as={Link}
              to="/register"
              className="text-light totaldark ">
              Register
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/login"
              className="text-light totaldark">
              Login
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/backoffice"
              className="text-light totaldark">
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
