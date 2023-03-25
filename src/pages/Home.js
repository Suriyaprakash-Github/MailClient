import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { replacemail, updateMail } from "../store/mailActions";

const Home = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const firstTime = useSelector((state) => state.mail.firstTime);
  const currentMail = useSelector((state) => state.mail.mailData);
  console.log(isLoggedIn);
  console.log(firstTime);

  if (isLoggedIn && firstTime) {
    const loggedEmail = localStorage.getItem("email");
    const emailUrl = loggedEmail.replace("@", "").replace(".", "");
    dispatch(replacemail(emailUrl, loggedEmail));
  }

  // setInterval(()=>{
  //   if(isLoggedIn){
  //     const loggedEmail = localStorage.getItem('email');
  //     const emailUrl = loggedEmail.replace("@","").replace(".","")
  //     dispatch(updateMail(emailUrl , loggedEmail , currentMail))
  //   }
  // } , 2000)

  return <h1>Welcome To Mail Box</h1>;
};

export default Home;
