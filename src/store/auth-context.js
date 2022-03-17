import React, { useState } from "react";

const AuthContext = React.createContext();

export const ContextProvider = (props) => {
  const getToken = localStorage.getItem("token");

  const [token, setToken] = useState(getToken);
  const isLogIn = !!token;

  const [email, setEmail] = useState(null);
  const isEmail = !!email;

  const emailHandler = (email) => {
    setEmail(email);
  };
  const changeEmail = () => {
    setEmail(null);
  };

  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  const values = {
    token: token,
    isLogedIn: isLogIn,
    login: loginHandler,
    logout: logoutHandler,
    email: emailHandler,
    isEmail: isEmail,
    falseEmail: changeEmail,
  };
  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
