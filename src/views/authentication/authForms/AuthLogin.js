import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Alert,
  AlertTitle,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { WindowRounded } from '@mui/icons-material';

const API = 'http://localhost:3000';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  const [loginStatus, setLoginStatus] = useState({
    success: false,
    error: false,
    message: '',
  });

  const handleInput = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
    // Clear any previous status when user starts typing
    setLoginStatus({ success: false, error: false, message: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API}/api/login`, login)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        setLoginStatus({
          success: true,
          error: false,
          message: 'Login successful! Redirecting...',
        });
        // Delay navigation to show success message
        setTimeout(() => {
          navigate('/dashboards/modern');
          window.location.href = '/dashboards/modern';
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        setLoginStatus({
          success: false,
          error: true,
          message: error.response?.data?.message || 'Invalid credentials',
        });
      });
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack spacing={2} mb={3}>
        {loginStatus.error && (
          <Alert severity="error">
            <AlertTitle>Login failed</AlertTitle>
            {loginStatus.message}
          </Alert>
        )}
        {loginStatus.success && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {loginStatus.message}
          </Alert>
        )}
        {!loginStatus.error && !loginStatus.success && (
          <Alert severity="info">
            <AlertTitle>Welcome</AlertTitle>
            Use your username and password to login
          </Alert>
        )}
      </Stack>

      <Stack component="form" onSubmit={handleSubmit}>
        <Box>
          <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
          <CustomTextField
            id="username"
            name="username"
            value={login.username}
            onChange={handleInput}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            name="password"
            value={login.password}
            onChange={handleInput}
            type="password"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loginStatus.success}
          >
            Sign In
          </Button>
        </Box>
      </Stack>
      {subtitle}
    </>
  );
};

export default AuthLogin;
