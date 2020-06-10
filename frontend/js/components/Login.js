import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import uuid from 'uuid/v1';
import useFetch from 'use-http';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;
  const api = useFetch('http://127.0.0.1:8000', {
    cachePolicy: 'no-cache',
  });

  const { get, post, response, loading, error } = api;

  async function login_user(e, login, password) {
    e.preventDefault();
    await post('/api/accounts/login/', { login, password });
    if (response.ok) window.location.pathname = '/';
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} md={5}>
        <Card style={{ marginTop: "20px", background: theme.bg, color: theme.syntax }}>
          <Grid container direction="row" justify="center">
            <Grid item xs={6} md={4}>
              <h5 style={{ margin: '1em 0 0', textAlign:"right" }}>Not a user yet?</h5>
            </Grid>
            <Grid item xs={4} md={3}>
              <Button style={{ marginTop: '1.1em'}} href="/register" color="secondary">
                Register
              </Button>
            </Grid>
          </Grid>
          <form onSubmit={(e) => login_user(e, email, password)}>
            <FormGroup>
              <TextField
                
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <center>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginRight: '0.5em' }}
              >
                Login
              </Button>
            </center>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
