import React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import Logo from 'src/layouts/full/shared/logo/Logo';
import PageContainer from 'src/components/container/PageContainer';
import AuthResetPassword from '../authForms/AuthResetPassword';

const ResetPassword = () => (
  <PageContainer title="Reset Password" description="this is Reset Password page">
    <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={4}
        xl={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
          <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
            <Logo />
          </Box>
          <Typography variant="h4" fontWeight="700" mb={1}>
            Set New Password
          </Typography>
          <Typography color="textSecondary" mb={4}>
            Please enter your new password
          </Typography>
          <AuthResetPassword />
        </Card>
      </Grid>
    </Grid>
  </PageContainer>
);

export default ResetPassword; 