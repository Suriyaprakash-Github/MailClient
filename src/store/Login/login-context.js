import React from "react";

const LoginContext = React.createContext({
  token: "",
  isLoggedIn: false,
  email: "",
  localId: "",
  login: (token) => {},
  logout: () => {},
});

export default LoginContext;
