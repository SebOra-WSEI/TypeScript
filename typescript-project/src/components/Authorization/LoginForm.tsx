import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import React from "react";
import { LoginBody } from "../../types/login";

interface LoginFormProps {
  loginBody: LoginBody;
  setLoginBody: (value: LoginBody) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  loginBody,
  setLoginBody,
  onSubmit
}) => {
  const { login, password } = loginBody;

  return (
    <Box sx={styles.box} component='form' onSubmit={onSubmit}>
      <Card sx={styles.card}>
        <CardContent>
          <>
            <h3 style={styles.header}>Log in</h3>
            <TextField
              label='Login'
              variant='standard'
              type='text'
              autoComplete='login'
              autoFocus
              value={login}
              fullWidth
              onChange={(evt) =>
                setLoginBody({
                  ...loginBody,
                  login: evt.target.value
                })
              }
            />
            <TextField
              label='Password'
              variant='standard'
              type='password'
              autoComplete='password'
              value={password}
              fullWidth
              onChange={(evt) =>
                setLoginBody({
                  ...loginBody,
                  password: evt.target.value
                })
              }
            />
          </>
          <CardActions>
            <Button type='submit' variant='contained' sx={styles.button}>
              Log in
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box >
  );
}

const styles = {
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    padding: '2rem',
    borderRadius: '1.5rem',
  },
  card: {
    width: '23rem',
    borderRadius: '0.5rem',
    boxShadow: '0.5rem 1rem 1rem rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    margin: '1rem 0 0.2rem 0',
    borderRadius: '0.5rem',
  }
};
