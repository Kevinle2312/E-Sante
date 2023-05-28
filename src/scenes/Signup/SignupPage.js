import { useState } from "react";
import { useForm } from "react-hook-form";

import User from "../../data/User";


import axios from "axios";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

const axiosInstance = axios.create({
  baseURL: "https://fruits.shrp.dev",
  timeout: 3000,
  headers: {},
});

function SignupPage() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  async function onSubmitSignUpForm(data) {
    const aUser = new User(
      data.first_name,
      data.last_name,
      data.email,
      data.password
    );

    try {
      setLoading(true);
      const response = await axiosInstance.post(`/users`, aUser);

      if (response.status === 204) {
        setUser(aUser);
      }

      setLoading(false);
      setError(false);
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="Signup">
      {loading === false && error === false && user !== null && (
        <p>
          Compte créé pour <b>{`${user.first_name} ${user.last_name}`}</b> (
          {user.email})
        </p>
      )}
      {loading === true && <p>Chargement...</p>}
      {error === true && <p>Une erreur s'est produite</p>}
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmitSignUpForm)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="Prénom"
              {...register('first_name', { required: true })}
            />
            {errors.first_name && <Typography color="error">Ce champ est obligatoire</Typography>}

            <TextField
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Nom"
              {...register('last_name', { required: true })}
            />
            {errors.last_name && <Typography color="error">Ce champ est obligatoire</Typography>}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse mail"
              type="email"
              {...register('email', { required: true })}
            />
            {errors.email && <Typography color="error">Ce champ est obligatoire</Typography>}

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Mot de passe"
              type="password"
              {...register('password', { required: true })}
            />
            {errors.password && <Typography color="error">Ce champ est obligatoire</Typography>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: 'white',
                color: 'black',
                '&:hover': {
                  bgcolor: 'white',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
                },
              }}
            >
              Création de compte
            </Button>

          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default SignupPage;
