import React from "react";
import { Button, TextField } from "@mui/material";
import { useState } from 'react';

import {
  Avatar, Box,
  Button,
  Container,
  CssBaseline, Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
// import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// export default LoginPage;

function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  // const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [error, setError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the form from refreshing the page

    if (username === "admin" && password === "password") {
      navigate("/dashboard"); // redirect to the dashboard
    } else {
      setIsSnackbarOpen(true); // show a message to the user
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    setError("Failed to log in");
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="Invalid username or password"
          />
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;

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
