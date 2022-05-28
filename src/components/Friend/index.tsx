import { ListItem, ListItemAvatar, Avatar, Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

function Friend() {
  return (
    <ListItem
      sx={{
        cursor: 'pointer',
        '&:hover': {
          background: '#F6F8FF',
        },
      }}
    >
      <ListItemAvatar sx={{ marginRight: '5%' }}>
        <Avatar sx={{ width: 90, height: 90 }} />
      </ListItemAvatar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h4">Aleksey Lenchenko</Typography>
        <IconButton>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </Box>
    </ListItem>
  );
}

export default Friend;
