import React from "react";
import { Button, TextField } from "@mui/material";
import { useState } from 'react';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import jwt_decode from 'jwt-decode';
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
import axios from 'axios';
import User from "../../data/User";

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else
    delete axios.defaults.headers.common["Authorization"];
}


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

  usernameClicked: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },

  passwordClicked: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },

  notchedOutline: {
    borderColor: 'white',
    '&:focus': {
      borderColor: 'white',
    },
  },

}));

const axiosInstance = axios.create({
  baseURL: "https://fruits.shrp.dev",
  timeout: 3000,
  headers: {},
});


function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  // const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [error, setError] = useState("");
  const classes = useStyles();
  const [usernameClicked, setUsernameClicked] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useNavigate();


  async function onSubmitSignInForm(data) {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/auth/login`, {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const aUser = new User(null, null, data.email);

        aUser.accessToken = response.data.data.access_token;
        aUser.refreshToken = response.data.data.refresh_token;
        aUser.expires = response.data.data.expires;

        localStorage.setItem("token", aUser.accessToken);
        localStorage.setItem("token_refresh", aUser.refreshToken);

        setAuthToken(aUser.accessToken);

        const decodedPayload = jwt_decode(aUser.accessToken);

        aUser.id = decodedPayload.id;

        setLoading(true);
        const response2 = await axiosInstance.get(`/users/${aUser.id}`, {
          headers: { Authorization: `Bearer ${aUser.accessToken}` },
        });
        setLoading(false);

        if (response2.status === 200) {
          aUser.first_name = response2.data.data.first_name;
          aUser.last_name = response2.data.data.last_name;
          aUser.email = response2.data.data.email;
          aUser.status = response2.data.data.status;

          setError(false);
          setUser(aUser);
        } else {
          setError(true);
        }

        window.location.href = '/dashboard'

        reset();

      }


    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      if (error.response && error.response.status === 401) {
        // If the response status is 401 (Unauthorized), refresh the access token
        const newAccessToken = await refreshAccessToken();

        // If a new access token is obtained, retry the user data request
        if (newAccessToken) {
          const aUser = new User(null, null, data.email);


          // Update the user's access token with the new one
          aUser.accessToken = newAccessToken;

          // Retry the user data request with the new access token
          const response2 = await axiosInstance.get(`/users/${aUser.id}`, {
            headers: { Authorization: `Bearer ${aUser.accessToken}` },
          });

          // ...

          if (response2.status === 200) {
            aUser.first_name = response2.data.data.first_name;
            aUser.last_name = response2.data.data.last_name;
            aUser.email = response2.data.data.email;
            aUser.status = response2.data.data.status;

            setError(false);
            setUser(aUser);
          } else {
            // Handle other response statuses
            if (response2.status === 401) {
              // Unauthorized
              console.log('User data request unauthorized');
              // Redirect to login or show error message
              setError(true);
            } else if (response2.status === 404) {
              // User not found
              console.log('User not found');
              // Show error message or handle as needed
              setError(true);
            } else {
              // Other error statuses
              console.log('Error fetching user data');
              // Show error message or handle as needed
              setError(true);
            }
          }
        } else {
          // Handle the case when the refresh token is invalid or expired
          // Redirect to the login page or show an error message
          console.log('Unable to refresh the access token');
          setError(true);
        }
      } else {
        console.log(error);
        setIsSnackbarOpen(true); // show a message to the user
        setLoading(false);
        setError(true);
      }
    }
  }

  async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("token_refresh"); // Get the refresh token from localStorage

    try {
      const response = await axios.post(
        "https://fruits.shrp.dev/auth/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const newAccessToken = response.data.data.access_token;

      // Update the access token in localStorage
      localStorage.setItem("token", newAccessToken);

      // Set the new access token as the default Authorization header for axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

      // Return the new access token if needed
      return newAccessToken;
    } catch (error) {
      // Handle the error, e.g., redirect to the login page
      console.log(error);
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    setError("Failed to log in");
  };

  const handleUsernameClick = () => {
    setUsernameClicked(true);
  };

  const handlePasswordClick = () => {
    setPasswordClicked(true);
  };



  const usernameClasses = usernameClicked ? classes.usernameClicked : "";
  const passwordClasses = passwordClicked ? classes.passwordClicked : "";


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
        <Box component="form" onSubmit={handleSubmit(onSubmitSignInForm)} sx={{ mt: 1 }}>
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
            variant="outlined"
            onChange={handleUsernameChange}
            onClick={handleUsernameClick}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
              classes: {
                notchedOutline: classes.notchedOutline,
                // focused: usernameClasses,
                // onFocus: () => setUsernameClicked(true),
                // onBlur: () => setUsernameClicked(false)
              },
            }}
            className={usernameClasses}

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
            variant="outlined"
            onChange={handlePasswordChange}
            onClick={handlePasswordClick}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
              classes: {
                notchedOutline: classes.notchedOutline,
                // focused: passwordClasses,
                // onFocus: () => setPasswordClicked(true),
                // onBlur: () => setPasswordClicked(false)
              },
            }}
            className={passwordClasses}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3,
              mb: 2,
              bgcolor: "white", color: "black",
              '&:hover': {
                bgcolor: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
              },

            }}
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
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default LoginPage;
