import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Alert, AlertTitle, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
// import AuthSocialButtons from './AuthSocialButtons';  // Commented out social buttons
import useAuth from '../../../guards/authGuard/UseAuth';

const API_URL = 'http://localhost:3000';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'agent',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Sending registration data:', formData);

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log('Registration response:', response.data);

      if (response.data) {
        if (response.data.token) {
          login(response.data.token);
          window.location.href = '/dashboards/modern';
        } else {
          window.location.href = '/auth/login';
        }
      }
    } catch (err) {
      console.error('Registration error:', err.response || err);

      // Handle specific error cases
      if (err.response?.status === 409) {
        setError(
          'This email address is already registered. Please use a different email or try logging in.',
        );
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

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

      {/* Fixed height container for error messages */}
      <Box minHeight="60px" mb={3}>
        {' '}
        {/* Adjust height as needed */}
        {error && (
          <Alert
            severity="error"
            sx={{
              '& .MuiAlert-message': {
                width: '100%',
              },
            }}
          >
            <AlertTitle>Registration failed</AlertTitle>
            {error}
          </Alert>
        )}
      </Box>

      <Stack component="form" onSubmit={handleSubmit}>
        <Box>
          <CustomFormLabel htmlFor="firstName">First Name</CustomFormLabel>
          <CustomTextField
            id="firstName"
            name="firstName"
            variant="outlined"
            fullWidth
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="lastName">Last Name</CustomFormLabel>
          <CustomTextField
            id="lastName"
            name="lastName"
            variant="outlined"
            fullWidth
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </Button>
        </Box>
      </Stack>
      {subtitle}
    </>
  );
};

export default AuthRegister;
