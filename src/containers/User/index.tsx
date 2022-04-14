import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../api/userApi';
import UserAvatar from '../../components/UserAvatar/';
import Loader from '../../components/Loader';
import ProfileAvatar from '../../components/ProfileAvatar';
import { addMessageHandler, emit, removeMessageHandler } from '../../socket';
import useApiRequest from '../../hooks/useApiRequest';

function User() {
  const { userId } = useParams();
  const [isOnline, setIsOnline] = useState(false);

  const {
    requestFn: getUserApi,
    isLoading,
    data,
  } = useApiRequest(getUserById, {
    showSuccessMessage: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    addMessageHandler('USER::ONLINE', (user) => {
      if (userId !== user) return;
      if (timer) clearTimeout(timer);
      setIsOnline(true);
    });

    addMessageHandler('USER::DISCONNECT', (user) => {
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
    <>
      {isLoading && <Loader fullScreen />}
      {!isLoading && data && (
        <Container>
          <Grid container wrap="nowrap" direction="column">
            <Grid item>
              <ProfileAvatar {...data}>
                <UserAvatar {...data} online={isOnline} />
              </ProfileAvatar>
            </Grid>
            <Grid item>
              <Typography align="center" variant="h4">
                ⠀
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="h4">
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
          </Grid>
        </Container>
      )}
    </>
  );
}

export default User;
