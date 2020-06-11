import React, { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import useFetch from 'use-http';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import food_waste from '../static/food_waste2.jpg';

const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password_confirm, setPasswordConfirm] = useState();
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const api = useFetch('/api', {
    cachePolicy: 'no-cache',
  });
  const theme = isLightTheme ? light : dark;

  const { get, post, response, loading, error } = api;

  async function addUser(e, email, password, password_confirm) {
    e.preventDefault();
    await post('/accounts/register/', { email, password, password_confirm });
    window.location.pathname = "/login"
    return false;
  }

  return (
    <div>
      <Grid container justify="center" alignItems="center" direction="row" spacing={1}>
        <Grid item xs={12} md={6} lg={3}>
          <Card style={{ maxHeight: '850px', maxWidth: '550px', marginTop: '1em' }}>
            <CardActionArea>
              <CardMedia component="img" alt="Food Waste Infographic" image={food_waste} />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card
            style={{ margin: '0.5em', padding: '1em', background: theme.bg, color: theme.syntax }}
          >
            <Grid container direction="row" justify="center">
              <Grid item xs={7} md={4}>
                <h5 style={{ margin: '1em 0 0', textAlign: 'right' }}>Already a user?</h5>
              </Grid>
              <Grid item xs={3} md={3}>
                <Button style={{ marginTop: '1.1em' }} href="/login" color="secondary">
                  Login
                </Button>
              </Grid>
            </Grid>
            <form onSubmit={(e) => addUser(e, email, password, password_confirm)}>
              <FormGroup>
                <TextField
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  variant="outlined"
                  margin="normal"
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  variant="outlined"
                  margin="normal"
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  id="password_confirm"
                  label="Confirm Password"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  type="password"
                  value={password_confirm}
                  variant="outlined"
                  margin="normal"
                />
              </FormGroup>
              <center>
                <Button
                  type="submit"
                  style={{ marginTop: '1em' }}
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </center>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
