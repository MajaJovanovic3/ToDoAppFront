import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { register } from '../../api/userApi';
import { useStylesIndex } from 'src/common/useStyles';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';

const RegisterView = () => {
  const classes = useStylesIndex();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    let email = e.target.email.value;
    let username = e.target.username.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;
    let policy = e.target.policy.checked;
    e.preventDefault();
    if (
      username == '' ||
      email == '' ||
      password == '' ||
      confirmPassword == ''
    ) {
      return alert('Morate popuniti sva polja!');
    }
    if (!policy) return alert('Morate prihvatiti uslove korišćenja');
    if (password === confirmPassword) {
      let result = await register(email, username, password);
      alert(result.message);
      if (result.isRegistered) navigate('/app/dashboard', { replace: true });
      else {
        document.getElementsByName('email')[0].value = null;
        document.getElementsByName('password')[0].value = null;
        document.getElementsByName('confirmPassword')[0].value = null;
      }
    } else {
      alert('Sifre se ne poklapaju');
      document.getElementsByName('password')[0].value = '';
      document.getElementsByName('confirmPassword')[0].value = '';
    }
  };

  return (
    <Page
      className={classes.root}
      title="Register"
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
              email: '',
              password: '',
              confirmPassword: '',
              policy: false
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .max(255)
                .required('Username is required'),
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string()
                .max(255)
                .required('Password is required'),
              confirmPassword: Yup.string()
                .max(255)
                .required('Confirm password is required'),
              policy: Yup.boolean().oneOf([true], 'This field must be checked')
            })}
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
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
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  fullWidth
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  label="Confirm password"
                  margin="normal"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.confirmPassword}
                  variant="outlined"
                />
                <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox
                    error={Boolean(touched.policy && errors.policy)}
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the{'  '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h4"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{' '}
                  <Link component={RouterLink} to="/login" variant="h4">
                    Sign in
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

export default RegisterView;
