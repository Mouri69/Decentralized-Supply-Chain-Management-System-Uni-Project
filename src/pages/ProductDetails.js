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
} from '@mui/material';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

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

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">ID</Typography>
                <Typography>{product.id}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Name</Typography>
                <Typography>{product.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Description</Typography>
                <Typography>{product.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Manufacturer</Typography>
                <Typography>{product.manufacturer}</Typography>
              </Grid>
              <Grid item xs={12}>
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

        <Grid item xs={12} md={6}>
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
        <Button
          variant="outlined"
          onClick={() => navigate('/products')}
        >
          Back to Products
        </Button>
      </Box>
    </Container>
  );
};

export default ProductDetails; 