import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

function Dashboardpage() {
  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col className="text-center">
            <h1>Dashboardpage</h1>
          </Col>
        </Row>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboardpage;
