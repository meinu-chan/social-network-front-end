import { Avatar, Badge, Box, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useImageSrc } from '../../hooks/useImageSrc';
import { useAppContext } from '../../store';
import { UserData } from '../../types/User';
import UploadAvatar from './UploadAvatar';

type Props = Pick<UserData, '_id' | 'photo'>;

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  avatar: {
    backgroundColor: '#ffffff',
    border: '1px solid',
    borderRadius: '50%',
    transform: 'translate(0, 20%)',
  },
}));

function UserAvatar({ _id, photo }: Props) {
  const {
    state: { user },
  } = useAppContext();
  const classes = useStyles();
  const avatarSrc = useImageSrc(photo || '');

  const isMe = user._id === _id;

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
