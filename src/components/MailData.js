import React from "react";
import { Fragment } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { deleteMail } from "../store/mailActions";

const MailData = (props) => {
  const dispatch = useDispatch();

  const deleteMailHandler = () => {
    dispatch(deleteMail(props.mail));
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <NavLink to={`/${props.mail.id}`}>
            {props.toorFrom === "From" && !props.mail.read && (
              <Col xs={1}>
                <iconify-icon
                  icon="ri:checkbox-blank-circle-fill"
                  style={{ color: "blue" }}
                ></iconify-icon>
              </Col>
            )}
            <Col xs={1}>{props.toorFrom}</Col>
            <Col xs={3}>
              <b>
                {props.toorFrom === "From" ? props.mail.from : props.mail.to}
              </b>
            </Col>
          </NavLink>
          <Col xs={5}>{props.mail.title}</Col>
          <Col xs={2}>
            <Button onClick={deleteMailHandler} variant="danger">
              Delete
            </Button>
          </Col>
          <hr />
        </Row>
      </Container>
    </Fragment>
  );
};

export default MailData;
