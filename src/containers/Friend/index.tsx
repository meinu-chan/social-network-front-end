import { Box, Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import Friend from '../../components/Friend';
import { useNavigate } from 'react-router-dom';

function Friends() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ height: `calc(100vh - ${document.getElementsByTagName('header')[0].clientHeight}px)` }}
    >
      <Box sx={{ margin: '0 5%', bgcolor: 'background.paper', height: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          <IconButton
            sx={{ '&:hover': { bgcolor: 'background.paper' } }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <Typography variant="h3" sx={{ padding: '2% 1%' }}>
            Friends
          </Typography>
        </Box>
        <Grid container sx={{ padding: '0 5%' }}>
          <Grid item md={6}>
            <Friend />
          </Grid>
          <Grid item md={6}>
            <Friend />
          </Grid>
          <Grid item md={6}>
            <Friend />
          </Grid>
          <Grid item md={6}>
            <Friend />
          </Grid>
          <Grid item md={6}>
            <Friend />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Friends;
