import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useWallet } from '../context/WalletContext';
import contractService from '../services/contractService';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { account } = useWallet();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await contractService.getProduct(id);
        setProduct(product);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product details');
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      await contractService.deleteProduct(id);
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product');
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Created': 'default',
      'InTransit': 'warning',
      'Delivered': 'success',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading product details...</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography>Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Details
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="subtitle2">ID</Typography>
                <Typography>{product.id}</Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant="subtitle2">Name</Typography>
                <Typography>{product.name}</Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant="subtitle2">Description</Typography>
                <Typography>{product.description}</Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant="subtitle2">Manufacturer</Typography>
                <Typography>{product.manufacturer}</Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant="subtitle2">Status</Typography>
                <Chip
                  label={product.status}
                  color={getStatusColor(product.status)}
                  size="small"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Product History
            </Typography>
            <List>
              {product.history?.map((event, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={event.action}
                      secondary={`By: ${event.actor} at ${new Date(event.timestamp * 1000).toLocaleString()}`}
                    />
                  </ListItem>
                  {index < product.history.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/transfer-product/${id}`)}
        >
          Transfer Product
        </Button>
        {account === product.currentOwner && (
          <Button
            variant="contained"
            color="error"
            onClick={() => setDeleteDialogOpen(true)}
            disabled={loading}
          >
            Delete Product
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={() => navigate('/products')}
        >
          Back to Products
        </Button>
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this product? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductDetails; 