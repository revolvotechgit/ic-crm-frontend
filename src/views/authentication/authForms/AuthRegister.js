import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';

const API = 'http://localhost:3000';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    username: '',
    password: '',
    role: 'agent',
  });

  const handleInput = (event) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API}/api/register`, register)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/auth/login');
      })
      .catch((error) => {
        console.log(error);
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

      <AuthSocialButtons title="Sign up with" />
      <Box mt={3}>
        <Divider>
          <Typography component="span" color="textSecondary" variant="h6" fontWeight="400" px={2}>
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <Stack component="form" onSubmit={handleSubmit}>
        <Box>
          <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
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
            variant="outlined"
            fullWidth
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
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <Typography
            component={Link}
            to="/auth/login"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Already have an account?
          </Typography>
        </Stack>
        <Box>
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            Sign Up
          </Button>
        </Box>
      </Stack>
      {subtitle}
    </>
  );
};

export default AuthRegister;
