import React, { useState } from 'react';
import { Box, Button, Stack, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        // Store email for the reset code page
        sessionStorage.setItem('resetEmail', email);
        navigate('/auth/reset-code');
      } else {
        setError(data.message || 'Failed to send reset code');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Box>
          <CustomTextField
            fullWidth
            id="email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            disabled={loading}
          />
        </Box>
        {error && <FormHelperText error>{error}</FormHelperText>}
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Code'}
        </Button>
      </Stack>
    </form>
  );
};

export default AuthForgotPassword;
