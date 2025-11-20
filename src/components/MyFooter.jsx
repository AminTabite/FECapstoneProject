import { Container, Col, Row, Button } from "react-bootstrap";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";

const MyFooter = () => {
  return (
    <footer className="footer">
      <Container className="p-0- m-0" fluid>
        <Row>
          <Col>
            <h6>
              A special thanks to{" "}
              <a
                href="https://tekkendocs.com"
                target="_blank"
                className="m-0  p-0">
                Tekken Docs
              </a>{" "}
              for their free API
            </h6>
          </Col>
        </Row>

        <Row>
          <h3>Contacts</h3>
          <Col className="d-flex justify-content-evenly">
            <div className="mx-4 px-4 text-light text-center ">
              <a href="https://github.com/AminTabite" target="_blank">
                <BsGithub />
              </a>
            </div>

            <div>
              <a
                href="www.linkedin.com/in/amin-tabite-9889b7217"
                target="_blank">
                <BsLinkedin />
              </a>
            </div>
            <div>
              <a href="mailto:aminepicode13@gmail.com">
                aminepicode13@gmail.com
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>@ {new Date().getFullYear} EPICODE</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
