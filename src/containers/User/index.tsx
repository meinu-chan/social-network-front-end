import { Box, Button, ButtonProps, Grid, styled, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../../api/userApi';
import UserAvatar from '../../components/UserAvatar/';
import Loader from '../../components/Loader';
import ProfileAvatar from '../../components/ProfileAvatar';
import { addMessageHandler, emit, removeMessageHandler } from '../../socket';
import useApiRequest from '../../hooks/useApiRequest';
import {
  FromServerConnectionEvent,
  FromServerDisconnectionEvent,
} from '../../socket/types/serverEvents';
import colors from '../../theme/colors';
import { useAppContext } from '../../store';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';

const useStyles = makeStyles((theme: Theme) => ({
  aboutUser: {
    backgroundColor: theme.palette.primary.main,
    color: colors.bgLight,
    padding: '3%',
    borderRadius: '50px',
    '.MuiGrid-item': {
      padding: 0,
    },
  },
  aboutMeTypography: {
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: '22px',
  },
  addToFriends: {
    position: 'absolute',
    right: '0',
    transform: 'translate(-10%, -50%)',
  },
  postTextField: {
    width: '50%',
    borderRadius: '50px',
  },
  gridItemCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  borderRadius: '50px',
  textTransform: 'initial',
  fontFamily: 'Montserrat',
  fontWeight: 500,
  fontSize: '1rem',
}));

function User() {
  const classes = useStyles();
  const { userId } = useParams();
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(false);
  const navigate = useNavigate();
  const {
    state: { user },
  } = useAppContext();

  const isMe = user._id === userId;

  const {
    requestFn: getUserApi,
    isLoading,
    data,
  } = useApiRequest(getUserById, {
    showSuccessMessage: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    addMessageHandler<FromServerConnectionEvent>('USER::ONLINE', (user) => {
      if (userId !== user) return;
      if (timer) clearTimeout(timer);
      setIsOnline(true);
    });

    addMessageHandler<FromServerDisconnectionEvent>('USER::DISCONNECT', (user) => {
      if (userId !== user) return;
      timer = setTimeout(() => setIsOnline(false), 5000);
    });

    if (userId) {
      emit({ event: 'USER::IS_ONLINE', payload: userId });
      getUserApi({ args: userId });
    }

    return () => {
      removeMessageHandler('USER::ONLINE');
      removeMessageHandler('USER::DISCONNECT');
    };
  }, [getUserApi, userId]);

  return (
    <Box
      sx={{
        margin: '0 10% 5% 10%',
        background: colors.paperLight,
        minHeight: '100vh',
        borderRadius: '0 0 50px 50px',
      }}
    >
      {isLoading && <Loader fullScreen />}
      {!isLoading && data && (
        <Grid container wrap="nowrap" direction="column" xs={12} md={10} sx={{ margin: 'auto' }}>
          <Grid item>
            <ProfileAvatar {...data}>
              <>
                <UserAvatar {...data} online={isOnline} />
                {!isMe && (
                  <Grid item className={classes.addToFriends}>
                    <CustomButton variant="contained" size="large">
                      Add to friends
                    </CustomButton>
                  </Grid>
                )}
              </>
            </ProfileAvatar>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              color="#50514F"
              sx={{ m: '1% 0 2% 20%', fontWeight: 700, fontFamily: 'Montserrat' }}
            >
              {data.fullName}
            </Typography>
          </Grid>
          {data.nickname && (
            <Grid item>
              <Typography align="center" variant="subtitle1">
                {data.nickname}
              </Typography>
            </Grid>
          )}
          <Grid item>
            <Grid container flexDirection="column" className={classes.aboutUser} rowSpacing={2}>
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: 500,
                    fontSize: '1.5rem',
                    lineHeight: '22px',
                  }}
                >
                  Birthday: {data.birthday || 'not specified'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: 500,
                    lineHeight: '22px',
                    fontSize: '1.5rem',
                  }}
                >
                  Studies: {data.university || data.school || 'not specified'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: 500,
                    lineHeight: '22px',
                    fontSize: '1.5rem',
                  }}
                >
                  Working at: {data.job || 'not specified'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: 500,
                    lineHeight: '22px',
                    fontSize: '1.5rem',
                  }}
                >
                  Hobbies: {data.hobbies || 'not specified'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: 500,
                    lineHeight: '22px',
                    fontSize: '1.5rem',
                  }}
                >
                  Phone number:{data.phone || 'not specified'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItemCenter}>
            <CustomButton
              variant="contained"
              sx={{ margin: '2% 0' }}
              onClick={() => navigate(`${location.pathname}/friends`)}
            >
              Friends
            </CustomButton>
          </Grid>
          {isMe && (
            <Grid item className={classes.gridItemCenter}>
              <CreatePost />
            </Grid>
          )}
          <Grid item className={classes.gridItemCenter}>
            <Post />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default User;
