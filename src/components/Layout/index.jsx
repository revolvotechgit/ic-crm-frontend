import React from "react";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box 
      className="flex" 
      sx={{ 
        bgcolor: 'background.default',
        minHeight: '100vh'
      }}
    >
      {children}
    </Box>
  );
};

export default Layout; 