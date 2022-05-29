import { Avatar, colors, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react';
import { useImageSrc } from '../../hooks/useImageSrc';
import { CommentListItem } from '../../types/Comment';

type Props = CommentListItem;

function Comment({ user, text }: Props) {
  const userAvatarSrc = useImageSrc(user.photo);
  return (
    <ListItem>
      <ListItemAvatar sx={{ alignSelf: 'flex-start' }}>
        <Avatar src={userAvatarSrc} alt={user.fullName} />
      </ListItemAvatar>
      <ListItemText
        primary={user.fullName}
        secondary={text}
        primaryTypographyProps={{ sx: { color: colors.grey[900] } }}
        secondaryTypographyProps={{
          variant: 'body1',
          sx: { color: colors.grey[800], wordBreak: 'break-word' },
        }}
      />
    </ListItem>
  );
}

export default Comment;
