import { Container, Box, Typography, Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { appLinks } from './routes';

const NotFound = () => (
  <Container maxWidth="lg">
    <Box
      py={5}
      sx={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: 'calc(100vh - 80px - 64px)',
      }}
    >
      <Typography variant="h1" gutterBottom>
        Not Found
      </Typography>
      <Typography variant="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Box pt={5}>
        <Button variant="outlined" component={NavLink} to={appLinks.index.link}>
          Go to Main
        </Button>
      </Box>
    </Box>
  </Container>
);

export default NotFound;
