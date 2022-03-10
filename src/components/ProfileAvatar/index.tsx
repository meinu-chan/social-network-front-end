import { Grid, Theme } from '@mui/material';
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
    paddingTop: '5%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
  },
  grid: {
    position: 'relative',
    justifyContent: 'center',
  },
  updateBtn: {
    position: 'absolute',
    bottom: '5%',
    right: '1%',
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
    <Box sx={{ backgroundImage: `url(${bgAvatarSrc})` }} className={classes.box}>
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
