import React from "react";

import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { authAction } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { replacemail, updateMail } from "../store/mailActions";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const show = useSelector((state) => state.auth.isLoggedIn);
  const unReadMessage = useSelector((state) => state.mail.unReadMessage);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentMail = useSelector((state) => state.mail.mailData);

  const logoutHandler = () => {
    dispatch(authAction.logout());
    navigate("/");
  };
  const loggedEmail = localStorage.getItem("email");

  let intervalId = setInterval(() => {
    if (isLoggedIn) {
      const loggedEmail = localStorage.getItem("email");
      const emailUrl = loggedEmail.replace("@", "").replace(".", "");
      dispatch(updateMail(emailUrl, loggedEmail, currentMail));
      if (true) {
        clearInterval(intervalId);
      }
    }
  }, 20000);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {show && (
              <NavLink
                style={{ fontWeight: "bold", padding: 5 + "px" }}
                to="/compose"
              >
                Compose Email
              </NavLink>
            )}
            {show && (
              <NavLink
                style={{ fontWeight: "bold", padding: 5 + "px" }}
                to="/inbox"
              >
                Inbox Email {unReadMessage}
              </NavLink>
            )}
            {show && (
              <NavLink
                style={{ fontWeight: "bold", padding: 5 + "px" }}
                to="/sent"
              >
                Sent Email
              </NavLink>
            )}
          </Nav>
          {show && (
            <Button onClick={logoutHandler} className="float-right mr-3">
              Logout
            </Button>
          )}
          <div>{loggedEmail}</div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
