import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../api/userApi';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {}
});

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    if (values.password != values.confirm) {
      alert("Password confirmation doesn't match Password!");
      setValues('');
      document.getElementsByName('password')[0].value = '';
      document.getElementsByName('confirm')[0].value = '';
      return null;
    } else {
      let response = await changePassword(values.password);
      if (response.isChanged) {
        navigate('/app/dashboard', { replace: true });
      }
      alert(response.message);
    }
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
