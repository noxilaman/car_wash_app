import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

function Header() {


  const navigate = useNavigate()

  const tokenkey = localStorage.getItem("token");
  const shop_id = localStorage.getItem("shop_id");

  console.log(tokenkey);

  const logoutHandler = ()=> {
    localStorage.setItem("token","");
    localStorage.setItem("shop_id", "");
    navigate("/login");
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Car Wash App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {tokenkey !== null &&
            tokenkey.length > 0 &&
            shop_id !== null &&
            shop_id.length > 0 && (
              <Nav className="me-auto">
                <Nav.Link href="/dashboardpage">Dashboard</Nav.Link>
                <Nav.Link href="/washpage">ล้างรถ</Nav.Link>
                <Nav.Link href="/listpage">รายการ</Nav.Link>
                <NavDropdown title="Base Data" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/admin/user/list">
                    พนักงาน
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/carsize/list">
                    ขนาดรถ
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/washtype/list">
                    บริการ
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/price/list">
                    ราคาบริการ
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" onClick={logoutHandler}>
                  Logout
                </Nav.Link>
              </Nav>
            )}
          {(tokenkey === null || tokenkey.length === 0) && (
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          )}
          {(shop_id === null || shop_id.length === 0) && (
            <Nav className="me-auto">
              <Nav.Link href="/">เลือกร้าน</Nav.Link>
              <Nav.Link href="#" onClick={logoutHandler}>
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
