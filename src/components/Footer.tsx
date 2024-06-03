import { Navbar } from "react-bootstrap";

function Footer() {
  return (
    <Navbar
      fixed="bottom"
      expand="lg"
      className="bg-body-secondary"
      data-bs-theme="dark"
    >
      <Navbar.Brand className="text-muted">&copy; 2021 Bam Bar</Navbar.Brand>
    </Navbar>
  );
}

export default Footer;
