import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Loginpage() {

  const navigate = useNavigate(); 
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

    const emailHandler = event => {
    setEmail(event.target.value);
  }

  const passwordHandler = event => {
     setPassword(event.target.value);
  }

  const postdata = async () => {
    const postData = {
      email: email,
      password: password
    };


    try {
      const res = await axios.post(
        "http://localhost:8086/api/user/login",
        postData,
        {
          headers: {
            "x-access-token": "token-value",
          },
        }
      );

      console.log(res.status);
      if (res.status == 200) {
        //console.log(res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/listpage");
      }
    } catch (err) {
      console.log(err);
    }
  };

    return (
      <div>
        <Header />
        <Container fluid>
          <Row>
            <Col className="text-center">
              <h1>Login</h1>
            </Col>
          </Row>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ใส่ Email"
                    onChange={emailHandler}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="ใส่ Password"
                    onChange={passwordHandler}
                  />
                </Form.Group>
                <Button variant="primary" onClick={postdata}>
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <Footer />
      </div>
    );
}

export default Loginpage;