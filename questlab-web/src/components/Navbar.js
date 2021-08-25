import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function NavbarComp({user}) {
  return (
    <div>
      <Navbar bg="dark" variant={"dark"} expand="lg" fixed="top">
        <Navbar.Brand href="#home">QuestLab</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={`/home/${user}`}>Home</Nav.Link>
            <Nav.Link href={`/${user}/create`}>Create lab</Nav.Link>
            <Nav.Link href="#link">Profile</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComp;
