import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ color: 'text.primary' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Dashboard
      </Typography>
      {/* Add your dashboard content here */}
    </Box>
  );
};

export default Dashboard;
