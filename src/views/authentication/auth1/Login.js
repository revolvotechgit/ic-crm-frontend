import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/backgrounds/login-bg.svg';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from '../authForms/AuthLogin';

const Login = () => (
  <PageContainer title="Login" description="this is Login page">
    <Grid container spacing={0} sx={{ overflowX: 'hidden' }}>
      <Grid
        size={{ xs: 12, sm: 12, lg: 7, xl: 8 }}
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
        size={{ xs: 12, sm: 12, lg: 5, xl: 4 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box p={4}>
          <AuthLogin
            title="Welcome to CRM"
            subtext={
              <Typography variant="subtitle1" color="textSecondary" mb={1}>
                Your Admin Dashboard
              </Typography>
            }
            subtitle={
              <Stack spacing={2} mt={3}>
                <Stack direction="row" spacing={1}>
                  <Typography color="textSecondary" variant="h6" fontWeight="500">
                    Don't have an account?
                  </Typography>
                  <Link
                    to="/auth/register"
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="500"
                      sx={{
                        color: 'primary.main',
                        cursor: 'pointer',
                      }}
                    >
                      Create an account
                    </Typography>
                  </Link>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography color="textSecondary" variant="h6" fontWeight="500">
                    Having trouble logging in?
                  </Typography>
                  <Link
                    to="/auth/forgot-password"
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="500"
                      sx={{
                        color: 'primary.main',
                        cursor: 'pointer',
                      }}
                    >
                      Reset password
                    </Typography>
                  </Link>
                </Stack>
              </Stack>
            }
          />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default Login;
