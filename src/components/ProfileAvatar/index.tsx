import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useImageSrc } from '../../hooks/useImageSrc';
import { useAppContext } from '../../store';
import UploadProfileAvatar from './UploadProfileAvatar';

interface IProps {
  children: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    paddingTop: '5%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  updateBtn: { marginLeft: '95% !important', transform: 'translate(0, 550%)' },
}));

function ProfileAvatar({ children }: IProps) {
  const {
    state: { currentUser },
  } = useAppContext();
  const bgAvatarSrc = useImageSrc(
    currentUser.backgroundAvatar || process.env.REACT_APP_DEFAULT_BG_AVATAR_KEY || ''
  );

  const classes = useStyles();

  return (
    <Box sx={{ backgroundImage: `url(${bgAvatarSrc})` }} className={classes.box}>
      <Grid>
        <Grid item className={classes.updateBtn}>
          <UploadProfileAvatar />
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </Box>
  );
}

export default ProfileAvatar;
