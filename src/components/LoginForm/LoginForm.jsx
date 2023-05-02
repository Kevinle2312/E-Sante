

// export default function LoginForm() {
//   const classes = useStyles();
//
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // handle login logic here
//     console.log(`Username: ${username}, Password: ${password}`);
//   };
//
//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <form className={classes.form} onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="username">Username:</label>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="password">Password:</label>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign In
//           </Button>
//           <RouterLink to="/forgot-password">
//             Forgot password?
//           </RouterLink>
//         </form>
//       </div>
//     </Container>
//   );
// }







