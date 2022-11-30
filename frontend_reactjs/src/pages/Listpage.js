import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { format } from "date-fns";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Listpage() {
  const [WashList, setWashList] = useState([]);

   useEffect(() => {
     (async () => {
       try {
         const res = await axios
           .get("http://localhost:8086/api/activities/list")
           .then(function (response) {
             setWashList(response.data);
             console.log(response.data);
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
           console.log(response.data);
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
                    <td>{moment(opt.createdate).format("YYYY-MM-DD hh:mm")}
                    <img src="/uploads/316808739_1887571614927309_3237105989573503943_n.jpg"></img>
                    </td>
                    <td>
                      {opt.licensecode} - {opt.licensecity}
                    </td>
                    <td>{opt.carsize}</td>
                    <td>{opt.washtype}</td>
                    <td>{opt.washstatus}</td>
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

export default Listpage;
