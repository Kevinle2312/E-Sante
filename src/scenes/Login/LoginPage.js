import React from "react";
import { Button, TextField } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";

function LoginPage({ onLogin }) {
  const handleLogin = (username, password) => {
    // handle login logic here
  };

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default LoginPage;
