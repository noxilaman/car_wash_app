
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

function Jobspage() {
  const [WashList, setWashList] = useState([]);
  

  useEffect(() => {
    (async () => {
      try {
        const res = await axios
          .get("http://localhost:8086/api/activities/list")
          .then(function (response) {
            setWashList(response.data);
            response.data.map((opt) => {
              console.log(opt);
            });
          });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  setInterval(async () => {
    try {
      const res = await axios
        .get("http://localhost:8086/api/activities/list")
        .then(function (response) {
          setWashList(response.data);
          response.data.map((opt) => {
            console.log(opt);
          });
        });
    } catch (err) {
      console.log(err);
    }
  }, 50000);
  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col className="text-center">
            <h1>รายการล้างรถ</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>วันเวลา</th>
                  <th>ทะเบียนรถ</th>
                  <th>ขนาดรถ</th>
                  <th>ประเภท</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {WashList.map((opt) => (
                  <tr>
                    <td>{moment(opt.createdate).format("YYYY-MM-DD hh:mm")}</td>
                    <td>
                      {opt.licensecode} - {opt.licensecity}
                    </td>
                    <td>{opt.carsize}</td>
                    <td>{opt.washtype}</td>
                    <td>{opt.washstatus}</td>
                    <td>
                        <a href={
                          process.env.REACT_APP_WEB_URL +
                          "/staff/activitiesjob/" +
                          opt.id
                        }>
                      <QRCodeCanvas
                        value={
                          process.env.REACT_APP_WEB_URL +
                          "/staff/activitiesjob/" +
                          opt.id
                        }
                      />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Jobspage;
