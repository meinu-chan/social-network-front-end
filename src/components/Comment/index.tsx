import { Avatar, colors, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';

function Comment() {
  return (
    <ListItem>
      <ListItemAvatar sx={{ alignSelf: 'flex-start' }}>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary="Full name"
        secondary={
          'Aute cupidatat eu minim magna adipisicing veniam consequat. Lorem et cupidatat irure esse. Deserunt magna sunt commodo laborum sint non ad. Sint sunt sint nostrud tempor ut nulla culpa ex eu sunt ullamco cupidatat eiusmod. Incididunt cillum excepteur ullamco aute et tempor adipisicing aliquip laboris culpa esse proident ea cupidatat.'
        }
        primaryTypographyProps={{ sx: { color: colors.grey[900] } }}
        secondaryTypographyProps={{ variant: 'body1', sx: { color: colors.grey[800] } }}
      />
    </ListItem>
  );
}

export default Comment;
