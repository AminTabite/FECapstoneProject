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
    <Container className="p-0 footer bg-black text-danger" fluid>
      <Row className="my-2 ms-2">
        <Col className="mt-5">
          <h6>
            A special thanks to{" "}
            <a
              href="https://tekkendocs.com"
              target="_blank"
              className="mt-3  p-0 text-danger text-decoration-none">
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
              className=" mx-2 text-danger text-decoration-none"
              href="https://github.com/AminTabite"
              target="_blank">
              <BsGithub />
            </a>
          </div>

          <div className=" text-light my-2 ">
            <a
              className=" mx-2 text-danger text-decoration-none"
              href="https://www.linkedin.com/in/amin-tabite/"
              target="_blank">
              <BsLinkedin />
            </a>
          </div>
          <div className=" text-light my-2 ">
            <a
              className=" mt-5 text-decoration-none text-danger "
              href="mailto:aminepicode13@gmail.com">
              aminepicode13@gmail.com
            </a>
          </div>
        </Col>
      </Row>

      <Row className="mt-2  ms-2 customMargin">
        <Col>Epicode'S Capstone, Year {getYear} </Col>
      </Row>
    </Container>
  );
};

export default MyFooter;
