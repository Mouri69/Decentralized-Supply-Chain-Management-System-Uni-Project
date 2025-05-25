import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const TransferProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    toAddress: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product details');
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(`http://localhost:3001/api/products/${id}/transfer`, formData);
      navigate(`/products/${id}`);
    } catch (error) {
      console.error('Error transferring product:', error);
      setError(error.response?.data?.message || 'Failed to transfer product');
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <Container>
        <Typography>Loading product details...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transfer Product
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Product: {product.name}
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Recipient Address"
            name="toAddress"
            value={formData.toAddress}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="0x..."
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Recipient Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              label="Recipient Role"
            >
              <MenuItem value="Manufacturer">Manufacturer</MenuItem>
              <MenuItem value="Distributor">Distributor</MenuItem>
              <MenuItem value="Retailer">Retailer</MenuItem>
              <MenuItem value="Consumer">Consumer</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Transferring...' : 'Transfer Product'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(`/products/${id}`)}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default TransferProduct; 