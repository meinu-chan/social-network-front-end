import { Avatar, Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useImageSrc } from '../../hooks/useImageSrc';
import { useAppContext } from '../../store';
import { UserData } from '../../types/User';
import UploadProfileAvatar from './UploadProfileAvatar';

interface IProps extends Pick<UserData, '_id' | 'backgroundAvatar'> {
  children: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    position: 'relative',
  },
  grid: {
    position: 'relative',
    justifyContent: 'start',
  },
  updateBtn: {
    position: 'absolute',
    bottom: '5%',
    right: '1%',
  },
  profileAvatar: {
    width: '100% !important',
    height: '100% !important',
    '& img': {
      objectFit: 'cover',
    },
  },
}));

function ProfileAvatar({ children, _id, backgroundAvatar }: IProps) {
  const {
    state: { user },
  } = useAppContext();
  const isMe = user._id === _id;

  const bgAvatarSrc = useImageSrc(
    (isMe ? user.backgroundAvatar : backgroundAvatar) ||
      process.env.REACT_APP_DEFAULT_BG_AVATAR_KEY ||
      ''
  );

  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Avatar
        src={bgAvatarSrc}
        variant="square"
        className={classes.profileAvatar}
        sx={{ position: 'absolute' }}
        imgProps={{
          loading: 'lazy',
        }}
      />
      <Grid container className={classes.grid}>
        {isMe && (
          <Grid item className={classes.updateBtn}>
            <UploadProfileAvatar />
          </Grid>
        )}
        <Grid item>{children}</Grid>
      </Grid>
    </Box>
  );
}

export default ProfileAvatar;
