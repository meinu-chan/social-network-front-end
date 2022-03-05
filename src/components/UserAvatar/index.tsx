import { Avatar, Badge, Box, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useImageSrc } from '../../hooks/useImageSrc';
import { useAppContext } from '../../store';
import UploadAvatar from './UploadAvatar';

const useStyles = makeStyles((theme: Theme) => ({
  box: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  avatar: {
    border: '1px solid',
    borderRadius: '50%',
  },
}));

function UserAvatar() {
  const {
    state: { currentUser, user },
  } = useAppContext();
  const classes = useStyles();
  const avatarSrc = useImageSrc(currentUser.photo);

  const isMe = user._id === currentUser._id;

  return (
    <Box className={classes.box}>
      <Badge
        className={classes.avatar}
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={isMe && <UploadAvatar />}
      >
        <Avatar src={avatarSrc} alt="user-photo" sx={{ width: 224, height: 224 }} />
      </Badge>
    </Box>
  );
}

export default UserAvatar;
