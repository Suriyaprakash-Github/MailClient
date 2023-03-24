import React, { useRef, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoginContext from "../../store/Login/login-context";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const authCtx = useContext(LoginContext);
  const redirect = useNavigate();

  const [isSignedUp, setIsSignedUp] = useState(false);

  const emailEntered = useRef();
  const passwordEntered = useRef();
  const confirmPasswordEntered = useRef();

  const loginSwitch = () => {
    setIsSignedUp((prev) => !prev);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (!isSignedUp) {
      // signup component
      if (
        passwordEntered.current.value === confirmPasswordEntered.current.value
      ) {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2XjADYcrnfw9qqGIKde6iiGsMWPJN8hY",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailEntered.current.value,
              password: passwordEntered.current.value,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.ok) {
              alert("Signup Successful");
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = "Authentication failed!";
                console.log(data);
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            authCtx.login(data.idToken, data.email, data.localId);

            redirect("/");
          });

        emailEntered.current.value = "";
        passwordEntered.current.value = "";
        confirmPasswordEntered.current.value = "";
      } else return alert("Password Does Not Match");
    } else {
      // login component
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2XjADYcrnfw9qqGIKde6iiGsMWPJN8hY",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailEntered.current.value,
            password: passwordEntered.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            console.log("Login Successful from signup comp");

            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = data.error.message;
              alert(errorMessage);
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          authCtx.login(data.idToken, data.email, data.localId);
          redirect("/");
        });

      //reset input
      emailEntered.current.value = "";
      passwordEntered.current.value = "";
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailEntered}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordEntered}
          />
        </Form.Group>
        {!isSignedUp && (
          <Form.Group className="mb-3" controlId="formBasicPasswordReEnter">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-Enter your Password"
              ref={confirmPasswordEntered}
            />
          </Form.Group>
        )}
        {!isSignedUp ? (
          <Button variant="primary" type="submit">
            SignUp
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Login
          </Button>
        )}
        {!isSignedUp && (
          <button onClick={loginSwitch}>Already Have an Account?</button>
        )}
        {isSignedUp && (
          <>
            <button onClick={loginSwitch}>First time Here?</button>
            {/* 
            <a href="/reset">
              <button>Forgot Password?</button>
            </a> */}
          </>
        )}
      </Form>
    </>
  );
};

export default SignUp;
