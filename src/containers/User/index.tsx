import { Container, Grid, Theme, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../api/userApi';
import ImageAsync from '../../components/ImageAsync';
import Loader from '../../components/Loader';
import useApiRequest from '../../hooks/userApiRequest';
import { useAppContext } from '../../store';
import { setCurrentUserData } from '../../store/actions';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    alignSelf: 'center',
    width: '20%',
    '& img': {
      border: '1px solid',
      borderRadius: '50%',
      width: '100%',
      height: '100%',
    },
  },
}));

function User() {
  const classes = useStyles();
  const { userId } = useParams();
  const {
    state: { currentUser },
    dispatch,
  } = useAppContext();

  const { requestFn: getUserApi, isLoading } = useApiRequest(getUserById, {
    showSuccessMessage: false,
  });

  const getCurrentUserApi = useCallback(async () => {
    const curUser = await getUserApi({ args: userId });

    dispatch(setCurrentUserData(curUser));
  }, [getUserApi, userId, dispatch]);

  useEffect(() => {
    getCurrentUserApi();
  }, [getCurrentUserApi]);

  return (
    <>
      {isLoading && <Loader fullScreen />}
      <Container>
        <Grid container direction="column">
          <Grid item className={classes.avatar}>
            <ImageAsync src={currentUser.photo} alt="user-photo" />
          </Grid>
          <Grid item>
            <Typography align="center" variant="h4">
              {currentUser.fullName}
            </Typography>
          </Grid>
          {!!currentUser.nickname && (
            <Grid item>
              <Typography align="center" variant="subtitle1">
                {currentUser.nickname}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default User;
