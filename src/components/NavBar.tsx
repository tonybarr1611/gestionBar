import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./../assets/logo.svg";

function InventoryNavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo del establecimiento bar Bam"
            width="70"
            height="70"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/inventario">Inventario</Nav.Link>
            <NavDropdown title="Proveedores" id="basic-nav-dropdown">
              <NavDropdown.Item href="/proveedores">
                Proveedores
              </NavDropdown.Item>
              <NavDropdown.Item href="/cotizaciones">
                Cotizaciones
              </NavDropdown.Item>
              <NavDropdown.Item href="/pedidos">Pedidos</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/mesas">Mesas</Nav.Link>
            <Nav.Link href="/facturacion">Facturación</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default InventoryNavBar;
