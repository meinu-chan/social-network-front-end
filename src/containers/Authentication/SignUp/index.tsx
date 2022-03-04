import React, { FormEvent } from 'react';
import { Box, Typography, FormControl, TextField, Button, Theme } from '@mui/material';
import { signUp } from '../../../api/authApi';
import PasswordInput from '../../../components/Form/PasswordInput';
import isValidSignUpData from '../../../helpers/FormDataValidations/isValidSignUpData';
import { isEmptyString, isValidEmail, isValidPassword } from '../../../helpers/validations';
import useModel from '../../../hooks/useModel';
import useApiRequest from '../../../hooks/userApiRequest';
import { IAuthProps } from '..';
import Loader from '../../../components/Loader';
import {
  setApiAuthorizationHeader,
  createApiClientRequestInterceptor,
  createApiClientResponseInterceptor,
} from '../../../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { appLinks } from '../../../router/routes';
import { useAppContext } from '../../../store';
import { logOutUser, authUser, setUserData } from '../../../store/actions';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: '5px 0 !important',
  },
}));

const initialModel = {
  email: '',
  password: '',
  fullName: '',
};

function SignUp({ authType, updateUserState, updateUserStateBtnTxt }: IAuthProps) {
  const classes = useStyles();

  const { requestFn: signUpApi, isLoading } = useApiRequest(signUp, {
    showSuccessMessage: false,
  });

  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const [model, handleModelChange] = useModel(initialModel);
  const [isError, setIsError] = React.useState(false);

  let success = false;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isError) setIsError(false);

    if (isValidSignUpData(model)) {
      const res = await signUpApi({
        args: model,
        successMessage: 'User has been created.',
      });

      if (res.accessToken) {
        setApiAuthorizationHeader(res.accessToken);
        createApiClientRequestInterceptor(() => dispatch(logOutUser()));
        createApiClientResponseInterceptor(() => dispatch(logOutUser()));

        dispatch(authUser(true));
        dispatch(setUserData(res.user));
        success = true;
      }
      if (success) navigate(`${appLinks.index.link}${res.user._id}`);
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Typography component="h1" variant="h5">
        {authType}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth className={classes.formControl}>
          <TextField
            disabled={isLoading}
            variant="outlined"
            label="Enter your Full Name"
            value={model.fullName}
            onChange={(event) => handleModelChange('fullName', event.target.value)}
            error={isError && isEmptyString(model.fullName)}
            helperText={isError && isEmptyString(model.fullName) && 'Invalid Full Name'}
          />
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
          <TextField
            disabled={isLoading}
            variant="outlined"
            label="Enter your email"
            value={model.email}
            onChange={(event) => handleModelChange('email', event.target.value)}
            error={isError && !isValidEmail(model.email)}
            helperText={isError && !isValidEmail(model.email) && 'Invalid Email'}
          />
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
          <PasswordInput
            disabled={isLoading}
            variant="outlined"
            label="Enter your password"
            value={model.password}
            onChange={(event) => handleModelChange('password', event.target.value)}
            error={isError && !isValidPassword(model.password)}
            helperText={
              isError &&
              !isValidPassword(model.password) &&
              'Must contain lowercase and uppercase letters, a number and one of the characters !@#$%&*'
            }
          />
        </FormControl>

        <Button disabled={isLoading} type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          {authType}
        </Button>
        <Button disabled={isLoading} sx={{ textAlign: 'left' }} onClick={updateUserState}>
          {updateUserStateBtnTxt}
        </Button>
      </Box>
    </>
  );
}

export default SignUp;
