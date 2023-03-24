import React, { useContext } from "react";
import Header from "../components/Layout/Header/Header";
import TextEditor from "../components/Editor/TextEditor";
import LoginContext from "../store/Login/login-context";
const Home = () => {
  const authCtx = useContext(LoginContext);
  console.log(authCtx.localId);
  return (
    <>
      <Header />
      <h1>Home Page</h1>
      <TextEditor />
    </>
  );
};

export default Home;
