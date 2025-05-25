import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'View Products',
      description: 'Browse all products in the supply chain',
      action: () => navigate('/products'),
    },
    {
      title: 'Add Product',
      description: 'Register a new product in the supply chain',
      action: () => navigate('/add-product'),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Supply Chain DApp
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          A blockchain-based solution for tracking products through the supply chain
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {quickActions.map((action, index) => (
          <Grid key={index} xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {action.title}
                </Typography>
                <Typography color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={action.action}>
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 