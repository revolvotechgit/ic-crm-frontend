import React from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/backgrounds/login-bg.svg';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from '../authForms/AuthLogin';

const Login = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Grid container spacing={0} sx={{ overflowX: 'hidden' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
            },
          }}
        >
          <Box position="relative">
            <Box px={3}>
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={'calc(100vh - 75px)'}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              <img
                src={img1}
                alt="bg"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4}>
            <Typography variant="h4" mb={2}>
              Welcome to CRM
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={3}>
              Your Admin Dashboard
            </Typography>
            <AuthLogin />
            <Stack spacing={2} mt={3}>
              <Stack direction="row" spacing={1}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  Don't have an account?
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="500"
                  sx={{
                    color: 'primary.main',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleNavigation('/auth/register')}
                >
                  Create an account
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  Having trouble logging in?
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="500"
                  sx={{
                    color: 'primary.main',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleNavigation('/auth/forgot-password')}
                >
                  Reset password
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Login;
