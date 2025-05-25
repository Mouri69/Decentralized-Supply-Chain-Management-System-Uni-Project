import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';

const Navbar = () => {
  // TODO: Get user role from context/state management
  const userRole = 'Manufacturer'; // This will be dynamic later

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Supply Chain DApp
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/products"
          >
            Products
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/add-product"
          >
            Add Product
          </Button>
          <Chip
            label={userRole}
            color="secondary"
            size="small"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 