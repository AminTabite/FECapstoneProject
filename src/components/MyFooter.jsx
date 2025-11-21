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
  const getYear = new Date().getFullYear();

  return (
    <footer className="foote mt-auto mb-auto">
      <Container className="p-0- mb-5" fluid>
        <Row className="my-2 ms-2">
          <Col className="mt-5">
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

        <Row className="my-2  ms-2">
          <h6 className="">Contacts :</h6>
          <Col className="d-flex justify-content-start g-2 align-content-center flex-column">
            <div className=" text-light my-2 ">
              <a
                className=" mx-2"
                href="https://github.com/AminTabite"
                target="_blank">
                <BsGithub />
              </a>
            </div>

            <div className=" text-light my-2 ">
              <a
                className=" mx-2"
                href="www.linkedin.com/in/amin-tabite-9889b7217"
                target="_blank">
                <BsLinkedin />
              </a>
            </div>
            <div className=" text-light my-2 ">
              <a className=" mt-5" href="mailto:aminepicode13@gmail.com">
                aminepicode13@gmail.com
              </a>
            </div>
          </Col>
        </Row>

        <Row className="mt-2  ms-2 customMargin">
          <Col>Epicode'S Capstone, Year {getYear} </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
