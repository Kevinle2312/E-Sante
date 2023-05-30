import { useState } from "react";
import { useForm } from "react-hook-form";

import User from "../../model/User";


import axios from "axios";
import {Box, Button, Container, TextField, Typography} from "@mui/material";


const URL = "https://fake-health-data-api.shrp.dev";

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
    const user = {
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname
    }



    try {
      setLoading(true);
      const response = await axios.post(URL+`/auth/signup`, null,{
        auth : { email: data.email,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname}
      });

      if (response.status === 204) {
        setUser(bUser);
      }
      console.log(response.status)

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
          Compte créé pour <b>{`${user.firstname} ${user.lastname}`}</b> (
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
              id="firstname"
              label="Prénom"
              {...register('firstname', { required: true })}
            />
            {errors.first_name && <Typography color="error">Ce champ est obligatoire</Typography>}

            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Nom"
              {...register('lastname', { required: true })}
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
