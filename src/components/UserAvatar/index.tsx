import { Avatar, Badge, Box, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useImageSrc } from '../../hooks/useImageSrc';
import { useAppContext } from '../../store';
import { UserData } from '../../types/User';
import OnlineIdentifier from './OnlineIdentifier';
import UploadAvatar from './UploadAvatar';

interface IProps extends Pick<UserData, '_id' | 'photo'> {
  online: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '2rem',
    height: '30vh',
  },
  avatar: {
    backgroundColor: '#ffffff',
    border: '1px solid',
    borderRadius: '50%',
    transform: 'translateY(35%)',
  },
}));

function UserAvatar({ _id, photo, online }: IProps) {
  const {
    state: { isAuth, user },
  } = useAppContext();
  const classes = useStyles();
  const isMe = user._id === _id;

  const avatarSrc = useImageSrc((isMe ? user.photo : photo) || '');

  return (
    <Box className={classes.box}>
      <Badge
        className={classes.avatar}
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={isAuth && (isMe ? <UploadAvatar /> : <OnlineIdentifier online={online} />)}
      >
        <Avatar
          src={avatarSrc}
          alt="user-photo"
          sx={{ width: 224, height: 224 }}
          imgProps={{
            loading: 'lazy',
          }}
        />
      </Badge>
    </Box>
  );
}

export default UserAvatar;
