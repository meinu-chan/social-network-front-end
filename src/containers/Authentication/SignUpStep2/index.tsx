import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Dispatch, FormEvent, useState } from 'react';
import clsx from 'clsx';
import ImageAsync from '../../../components/ImageAsync';
import ImageUpload from '../../../components/ImageUpload';
import { isEmptyString } from '../../../helpers/validations';
import useModel from '../../../hooks/useModel';
import { UpdateUserParams } from '../../../types/User';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpStep2 } from '../../../api/authApi';
import useApiRequest from '../../../hooks/userApiRequest';
import { appLinks } from '../../../router/routes';
import { authUserStep2 } from '../../../store/actions/userReducer';
import { IAction as UserReducerAction } from '../../../store/reducers/userReducer';

type InitialModel = Omit<UpdateUserParams, 'fullName'>;

const initialModel: InitialModel = {
  nickname: '',
  photo: '',
};

const useStyles = makeStyles({
  grid: {
    justifyContent: 'flex-end',
  },
  gridItem: {
    margin: '0 35% !important',
    width: '30%',
  },
  avatar: {
    width: '100%',
    height: '100%',
    border: 'solid 3px',
    padding: '1px',
    borderRadius: '15px',
  },
  imageUploadItem: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textField: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: '0 35% !important',
  },
});

function SignUpStep2() {
  const dispatch = useDispatch<Dispatch<UserReducerAction>>();
  const { requestFn: signUpStep2Api } = useApiRequest(signUpStep2);
  const navigate = useNavigate();

  const [isError] = useState(false);
  const [model, handleModelChange] = useModel<InitialModel>(initialModel);

  const classes = useStyles();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { nickname, photo } = await signUpStep2Api({ args: model });

    dispatch(authUserStep2({ nickname, photo }));

    navigate(appLinks.index.link);
  };

  return (
    <Container component="form" onSubmit={handleSubmit}>
      <Grid container rowSpacing={7} className={classes.grid}>
        <Grid item className={classes.gridItem}>
          <Container maxWidth="md">
            <Grid>
              <Typography variant="h6">Choose your avatar</Typography>
              {model.photo && (
                <Grid item>
                  <ImageAsync
                    src={model.photo}
                    alt="step-2-registration-avatar"
                    className={classes.avatar}
                  />
                </Grid>
              )}
              <Grid item className={classes.imageUploadItem}>
                <ImageUpload
                  value={model.photo}
                  onChange={(link) => handleModelChange('photo', link)}
                  folder="users"
                  variant="normal"
                  isError={isError && isEmptyString(model.photo || '')}
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item className={clsx(classes.textField, classes.gridItem)}>
          <TextField
            id="outlined-basic"
            label="Nickname"
            variant="outlined"
            placeholder="Enter your nickname"
            onChange={(event) => handleModelChange('nickname', event.target.value)}
          />
        </Grid>
        <Grid item className={classes.button}>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUpStep2;
