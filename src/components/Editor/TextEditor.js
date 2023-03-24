import React, { useRef, useState, useContext } from "react";
import LoginContext from "../../store/Login/login-context";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const TextEditor = () => {
  const authCtx = useContext(LoginContext);

  const _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw); // ContentState JSON it has style details also

  const Enteredemail = useRef();
  const Enteredsubject = useRef();

  const editorSubmitHandler = (e) => {
    e.preventDefault();

    // console.log(
    //   Enteredemail.current.value,
    //   Enteredsubject.current.value,
    //   contentState.blocks[0].text
    // );
    fetch(
      `https://mailclient-5d600-default-rtdb.firebaseio.com/${authCtx.localId}/sent.json`,
      {
        method: "POST",
        body: JSON.stringify({
          sentTo: Enteredemail.current.value,
          subject: Enteredsubject.current.value,
          text: contentState.blocks[0].text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("Email Sent");

        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = data.error.message;
          alert(errorMessage);
          throw new Error(errorMessage);
        });
      }
    });
    Enteredemail.current.value = "";
    Enteredsubject.current.value = "";
    setContentState("");
  };
  return (
    <>
      <div>
        <Form onSubmit={editorSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={Enteredemail}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Subject"
              ref={Enteredsubject}
            />
          </Form.Group>
          <Form.Label>message</Form.Label>
          <Editor
            defaultContentState={contentState}
            onContentStateChange={setContentState}
          />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default TextEditor;
