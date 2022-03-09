import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../api/userApi';
import UserAvatar from '../../components/UserAvatar/';
import Loader from '../../components/Loader';
import useApiRequest from '../../hooks/userApiRequest';
import ProfileAvatar from '../../components/ProfileAvatar';

function User() {
  const { userId } = useParams();

  const {
    requestFn: getUserApi,
    isLoading,
    data,
  } = useApiRequest(getUserById, {
    showSuccessMessage: false,
  });

  useEffect(() => {
    getUserApi({ args: userId });
  }, [getUserApi, userId]);

  return (
    <>
      {isLoading && <Loader fullScreen />}
      {!isLoading && data && (
        <Container>
          <Grid container wrap="nowrap" direction="column">
            <Grid item>
              <ProfileAvatar {...data}>
                <UserAvatar {...data} />
              </ProfileAvatar>
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
