import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col } from "react-bootstrap";

const CharactersMovelist = () => {
  const params = useParams();
  const endpoint = `https://tekkendocs.com/api/t8/${params.name}/framedata`;

  const Getmovelist = async () => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Errore, status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Errore nella fetch", error);
    }
  };

  useEffect(() => {
    Getmovelist();
  }, [params.name]); // Esegue alla prima volta e quando params.name cambia

  return (
    <Container>
      <Row>
        <Col xs={6} lg={12} className="justify-content-center">
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CharactersMovelist;
