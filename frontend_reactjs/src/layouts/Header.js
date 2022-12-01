import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Car Wash App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
              <NavDropdown.Item href="#action/3.3">รายการล้าง</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
