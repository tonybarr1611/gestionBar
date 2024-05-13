import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./../assets/logo.svg";

function InventoryNavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            alt="Logo del establecimiento bar Bam"
            width="70"
            height="70"
          />
          Sistema de inventario
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Inventario</Nav.Link>
            <NavDropdown title="Solicitudes externas" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Cotizaciones
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Pedidos</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#link">Proveedores</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default InventoryNavBar;
