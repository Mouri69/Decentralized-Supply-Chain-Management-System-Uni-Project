import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useWallet } from '../context/WalletContext';

const Navbar = () => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

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
          {account ? (
            <Tooltip title={account}>
              <Chip
                icon={<AccountBalanceWalletIcon />}
                label={formatAddress(account)}
                color="secondary"
                onClick={disconnectWallet}
                clickable
              />
            </Tooltip>
          ) : (
            <Button
              color="inherit"
              startIcon={<AccountBalanceWalletIcon />}
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 