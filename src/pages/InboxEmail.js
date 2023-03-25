import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Col, Button } from "react-bootstrap";

import MailData from "../components/MailData";
import { useDispatch } from "react-redux";
import { deleteMail } from "../store/mailActions";

const InboxEmail = () => {
  const dispatch = useDispatch();
  const deleteMailHandler = (mail) => {
    dispatch(deleteMail(mail));
  };

  const mails = useSelector((state) => state.mail.mailData);
  console.log("Inside inbox mails", mails);
  const email = localStorage.getItem("email");
  const inboxMail = mails.filter((mail) => mail.to === email);

  const mailItem = inboxMail.map((mail) => (
    <div>
      {" "}
      <MailData key={mail.id} mail={mail} toorFrom="From" />
      {/* <Col xs={2}>
       <Button mail={mail} onClick={deleteMailHandler(mail)} variant="danger">Delete</Button>
     </Col> */}
    </div>
  ));

  return <div>{mailItem}</div>;
};

export default InboxEmail;
