import { Typography, Box, FormControl, TextField, Button } from '@mui/material';
import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { IAuthProps } from '..';
import {
  setApiAuthorizationHeader,
  createApiClientRequestInterceptor,
  createApiClientResponseInterceptor,
} from '../../../api/apiClient';
import authApi from '../../../api/authApi';
import PasswordInput from '../../../components/Form/PasswordInput';
import isValidSignInData from '../../../helpers/FormDataValidations/isValidSignInData';
import { isValidEmail, isValidPassword } from '../../../helpers/validations';
import useModel from '../../../hooks/useModel';
import useApiRequest from '../../../hooks/userApiRequest';
import { authUser, logOutUser } from '../../../store/actions/userReducer';
import { IAction as UserReducerAction } from '../../../store/reducers/userReducer';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { appLinks } from '../../../router/routes';

const initialModel = {
  email: '',
  password: '',
};

function SignIn({ authType, updateUserState, updateUserStateBtnTxt }: IAuthProps) {
  const style = {
    mt: '5px',
    mb: '5px',
  };

  const dispatch = useDispatch<Dispatch<UserReducerAction>>();
  const { enqueueSnackbar } = useSnackbar();
  const { requestFn: signInApi } = useApiRequest(authApi.signIn);
  const navigate = useNavigate();

  const [model, handleModelChange] = useModel(initialModel);
  const [isError, setIsError] = React.useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let success = false;

    if (isError) {
      setIsError(false);
    }

    if (isValidSignInData(model)) {
      try {
        const res = await signInApi({ args: model });

        if (res.accessToken) {
          setApiAuthorizationHeader(res.accessToken);
          createApiClientRequestInterceptor(() => dispatch(logOutUser()));
          createApiClientResponseInterceptor(() => dispatch(logOutUser()));

          dispatch(authUser(res.user));
          success = true;
        }
      } catch (error: any) {
        if (error.response.data.message)
          enqueueSnackbar(error.response.data.message, {
            variant: 'error',
          });
      }
      if (success) navigate(appLinks.index.link);
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        {authType}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth sx={style}>
          <TextField
            variant="outlined"
            label="Enter your email"
            value={model.email}
            onChange={(event) => handleModelChange('email', event.target.value)}
            error={isError && !isValidEmail(model.email)}
            helperText={isError && !isValidEmail(model.email) && 'Invalid Email'}
          />
        </FormControl>
        <FormControl fullWidth sx={style}>
          <PasswordInput
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

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          {authType}
        </Button>
        <Button sx={{ textAlign: 'left' }} onClick={updateUserState}>
          {updateUserStateBtnTxt}
        </Button>
      </Box>
    </>
  );
}
export default SignIn;
