import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import flash from '../../assets/flash.png'

function Layout(props) {

    return (
        <div>
            <Navbar sticky="top" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="Logo"
                            src={flash}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        /> 
                        &nbsp;&nbsp;CS2&nbsp;Nade&nbsp;Guide
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/tool">Tool</Nav.Link>
                        <Nav.Link as={Link} to="https://github.com/njyeung/cs2-nade-guide">Github</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ backgroundColor:'rgb(17,24,39)', padding: "1rem", minHeight:'100vh' }}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;