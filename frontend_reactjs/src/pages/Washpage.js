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
  const [washTypes, setWashTypes] = useState([]);
  const [postResult,setPostResult] = useState(null);

  // const washTypeId = useRef();

  useEffect(() => { 
    (async () => {
    try {
      const res = await axios
        .get("http://localhost:8086/api/sizecar/getall")
        .then(function (response) {
          setCarSize(response.data);
          console.log(response.data);
        });

      const res2 = await axios
        .get("http://localhost:8086/api/washtype/getall")
        .then(function (response) {
          setWashTypes(response.data);
          console.log(response.data);
        });

        priceHandler();

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
     console.log(sizeId);
  priceHandler(washTypeId,event.target.value);
  }

  const washTypeIdHandler = event => {
     setWashTypeId(event.target.value);
    // console.log(washTypeId.current);
    priceHandler(event.target.value, sizeId);
  }

  const priceHandler = async (wtid,scid) => {
    try {
      console.log(
        "http://localhost:8086/api/price/getselected/" + wtid + "/" + scid
      );
      if (
        wtid !== "" &&
        scid !== "" &&
        wtid !== "Open this select menu" &&
        scid !== "Open this select menu"
      ) {
        const res2 = await axios

          .get(
            "http://localhost:8086/api/price/getselected/" + wtid + "/" + scid
          )
          .then(function (response) {
            // setWashTypes(response.data);
            
            console.log(response.data[0].price);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                <Form.Control
                  type="text"
                  placeholder="ใส่ทะเบียนรถ"
                  onChange={licenseNameHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLicenseCity">
                <Form.Label>จังหวัด</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ใส่ทะเบียนจังหวัด"
                  onChange={cityHandler}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>รูปรถ</Form.Label>
                <Form.Control type="file" accept="image/*" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formLicenseName">
                <Form.Label>ขนาดรถ</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={sizeId}
                  onChange={sizeIdHandler}
                >
                  <option>Open this select menu</option>
                  {carSizes.map((opt) => (
                    <option value={opt.id}>{opt.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLicenseCity">
                <Form.Label>บริการ</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={washTypeId}
                  onChange={washTypeIdHandler}
                >
                  <option>Open this select menu</option>
                  {washTypes.map((opt) => (
                    <option value={opt.id}>{opt.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button variant="primary" onClick={postdata}>
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
