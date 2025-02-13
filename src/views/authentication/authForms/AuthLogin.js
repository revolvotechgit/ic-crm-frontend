import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Alert,
  AlertTitle,
} from '@mui/material';
import axios from 'axios';
import useAuth from '../../../guards/authGuard/UseAuth';

import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

const API = 'http://localhost:3000';

const AuthLogin = () => {
  const { login: authLogin } = useAuth();
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  const [loginStatus, setLoginStatus] = useState({
    success: false,
    error: false,
    message: '',
  });

  const handleInput = useCallback((event) => {
    const { name, value } = event.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
    setLoginStatus({ success: false, error: false, message: '' });
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const response = await axios.post(`${API}/api/login`, login);
        const { token } = response.data;

        // Update both localStorage and auth context
        localStorage.setItem('token', token);
        authLogin(token);

        setLoginStatus({
          success: true,
          error: false,
          message: 'Login successful! Redirecting...',
        });

        setTimeout(() => {
          window.location.href = '/dashboards/modern';
        }, 1500);
      } catch (error) {
        console.error('Login error:', error);
        setLoginStatus({
          success: false,
          error: true,
          message: error.response?.data?.message || 'Invalid credentials',
        });
      }
    },
    [login, authLogin],
  );

  return (
    <Stack spacing={3}>
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

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
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
              type="password"
              value={login.password}
              onChange={handleInput}
              variant="outlined"
              fullWidth
            />
          </Box>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
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
        </Stack>
      </form>
    </Stack>
  );
};

export default AuthLogin;
