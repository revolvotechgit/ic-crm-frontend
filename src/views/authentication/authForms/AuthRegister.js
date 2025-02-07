import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Alert, AlertTitle, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
// import AuthSocialButtons from './AuthSocialButtons';  // Commented out social buttons

const API = 'http://localhost:3000';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: '',
    role: 'agent',
  });

  const [registerStatus, setRegisterStatus] = useState({
    success: false,
    error: false,
    message: '',
  });

  const handleInput = (event) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
    // Clear any previous status when user starts typing
    setRegisterStatus({ success: false, error: false, message: '' });
  };

  const validateForm = () => {
    const errors = [];

    if (!register.username || register.username.length < 3) {
      errors.push('Username must be at least 3 characters');
    }

    if (!register.email || !register.email.includes('@')) {
      errors.push('Please enter a valid email address');
    }

    if (!register.password || register.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }

    if (errors.length > 0) {
      setRegisterStatus({
        success: false,
        error: true,
        message: errors.join('. '),
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${API}/api/register`, register);
      console.log(response.data);
      setRegisterStatus({
        success: true,
        error: false,
        message: 'Registration successful! Redirecting to login...',
      });

      // Delay navigation to show success message
      setTimeout(() => {
        navigate('/auth/login', { replace: true });
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterStatus({
        success: false,
        error: true,
        message: error.response?.data?.message || 'Registration failed. Please try again.',
      });
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      {/* Commented out social buttons section */}
      {/* <AuthSocialButtons title="Sign up with" />
      <Box mt={3}>
        <Divider>
          <Typography component="span" color="textSecondary" variant="h6" fontWeight="400" px={2}>
            or sign up with
          </Typography>
        </Divider>
      </Box> */}

      <Stack spacing={2} mb={3}>
        {registerStatus.error && (
          <Alert severity="error">
            <AlertTitle>Registration failed</AlertTitle>
            {registerStatus.message}
          </Alert>
        )}
        {registerStatus.success && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {registerStatus.message}
          </Alert>
        )}
        {!registerStatus.error && !registerStatus.success && (
          <Alert severity="info">
            <AlertTitle>Welcome</AlertTitle>
            Please fill in your information to create an account
          </Alert>
        )}
      </Stack>

      <Stack component="form" onSubmit={handleSubmit}>
        <Box>
          <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
          <CustomTextField
            id="username"
            name="username"
            variant="outlined"
            fullWidth
            value={register.username}
            onChange={handleInput}
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
          <CustomTextField
            id="email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            value={register.email}
            onChange={handleInput}
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={register.password}
            onChange={handleInput}
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}></Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={registerStatus.success}
          >
            Sign Up
          </Button>
        </Box>
      </Stack>
      {subtitle}
    </>
  );
};

export default AuthRegister;
