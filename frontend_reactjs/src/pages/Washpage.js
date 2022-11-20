import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useState,useEffect } from "react";
import axios from "axios";

function Washpage() {
  const [licensename,setLicensename] = useState('');
  const [city,setCity] = useState('');
  const [sizeId,setSizeId] = useState('');
  const [washTypeId,setWashTypeId] = useState('');
  const [carSizes,setCarSize] = useState([]);
  const [postResult,setPostResult] = useState(null);

  useEffect(() => { 
    (async () => {
    try {
      const res = await axios.get("http://localhost:8086/api/sizecar/getall").then(function (response) {
        setCarSize(response.data);
        console.log(response.data);
      });

    } catch (err) {
      setPostResult(fortmatResponse(err.response?.data || err));
    }
  })();
},[]);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  const licenseNameHandler = event => {
    setLicensename(event.target.value);
  }

  const cityHandler = event => {
    setCity(event.target.value);
  }
  
  const sizeIdHandler = event => {
    setSizeId(event.target.value);
  }

  const washTypeIdHandler = event => {
    setWashTypeId(event.target.value);
  }

  const postdata = async () => {
    const postData = {
      licensename: licensename,
      city: city,
      sizeId: sizeId,
      washTypeId: washTypeId
    };

    console.log(postData);

    try {
      const res = await axios.post("http://localhost:8086/api/washcar/create", postData, {
        headers: {
          "x-access-token": "token-value",
        },
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(fortmatResponse(err.response?.data || err));
    }
  }

  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col className="text-center">
            <h1>Washpage</h1>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formLicenseName">
                <Form.Label>ทะเบียนรถ</Form.Label>
                <Form.Control type="text" placeholder="ใส่ทะเบียนรถ" onChange={licenseNameHandler}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLicenseCity" >
                <Form.Label>จังหวัด</Form.Label>
                <Form.Control type="text" placeholder="ใส่ทะเบียนจังหวัด" onChange={cityHandler}/>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>รูปรถ</Form.Label>
                <Form.Control type="file" accept="image/*" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formLicenseName">
                <Form.Label>ขนาดรถ</Form.Label>
                <Form.Select aria-label="Default select example" onChange={sizeIdHandler}>
                <option>Open this select menu</option>
                {carSizes.map(opt => (
                  <option value={opt.id}>{opt.name}</option>
                ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLicenseCity">
                <Form.Label>บริการ</Form.Label>
                <Form.Select aria-label="Default select example" onChange={washTypeIdHandler}>
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" onClick={postdata} >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
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

export default Washpage;
