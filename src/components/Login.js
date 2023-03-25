import React, { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../store/authSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();

  const loginSwappingHandler = () => {
    setLogin((prev) => !prev);
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    let url;
    if (!login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGBcrwT3iArdRi0VI2hGt4fQBsSPKUBiU";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGBcrwT3iArdRi0VI2hGt4fQBsSPKUBiU";
    }

    if (!login) {
      if (
        inputPasswordRef.current.value !== inputConfirmPasswordRef.current.value
      ) {
        return;
      }
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: inputEmailRef.current.value,
          password: inputPasswordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(authAction.login());
        localStorage.setItem("idToken", data.idToken);
        localStorage.setItem("email", data.email);
        inputEmailRef.current.value = "";
        inputPasswordRef.current.value = "";
        if (!login) {
          inputConfirmPasswordRef.current.value = "";
          alert("sign up successfully");
        } else {
          alert("Login SuccessFully");
          navigate("/home");
        }
      } else {
        const data = await res.json;
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-main">
      <Form onSubmit={loginHandler}>
        <h2>{login ? "Login" : "Sign Up"}</h2>
        <Form.Group className="mb-3" htmlFor="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={inputEmailRef}
            id="email"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" htmlFor="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={inputPasswordRef}
            id="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {!login && (
          <Form.Group className="mb-3" htmlFor="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              ref={inputConfirmPasswordRef}
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          {login ? "Login" : "Sign In"}
        </Button>
      </Form>
      <Button
        onClick={loginSwappingHandler}
        style={{
          backgroundColor: "whitesmoke",
          fontWeight: "bold",
          marginTop: 20 + "px",
          marginBottom: 20 + "px",
          width: 90 + "%",
        }}
        variant=""
      >
        {login ? "Click Here To Sign In" : "Click Here to Log In"}
      </Button>
    </div>
  );
};

export default Login;
