import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { login } from '../../api/userApi';
import { useStylesIndex } from 'src/common/useStyles';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';


const LoginView = props => {
  const classes = useStylesIndex();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    username: '',
    password: ''
  };

  const handleSubmit = async e => {
    let username = e.target.username.value;
    let password = e.target.password.value;
    e.preventDefault();
    if (username != '' && password != '') {
      let result = await login(username, password);
      if (result.isLogged) {
        sessionStorage.setItem('user', JSON.stringify(result.user));
        dispatch({ type: 'ADD_USER', payload: result.user });
        navigate('/app/tasks', { replace: true });
      }
      alert(result.message);
    } else {
      return alert('Morate popuniti sva polja!');
    }
  };

  return (
    <Page
      className={classes.root}
      title="Login"
      style={{
        backgroundImage: "url('http://localhost:3000/aa.png')",
        backgroundSize: 'contain'
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .max(255)
                .required('Username is required'),
              password: Yup.string()
                .max(255)
                .required('Password is required')
            })}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              touched,
              values
            }) => (
              <form
                onSubmit={handleSubmit}
                style={{ background: 'white', padding: '10px' }}
              >
                <Box>
                  <Typography color="textPrimary" align="center" variant="h2">
                    Sign in
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="TextField"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  placeholder=""
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{' '}
                  <Link component={RouterLink} to="/register" variant="h4">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
