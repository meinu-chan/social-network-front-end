import React, { FormEvent } from 'react';
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  Theme,
  Container,
  CssBaseline,
} from '@mui/material';
import { signUp } from '../../../api/authApi';
import PasswordInput from '../../../components/Form/PasswordInput';
import isValidSignUpData from '../../../helpers/FormDataValidations/isValidSignUpData';
import { isEmptyString, isValidEmail, isValidPassword } from '../../../helpers/validations';
import useModel from '../../../hooks/useModel';
import useApiRequest from '../../../hooks/useApiRequest';
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

function SignUp() {
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

        dispatch(authUser(res.user));
        dispatch(setUserData(res.user));
        success = true;
      }
      if (success) navigate(`${appLinks.index.link}${res.user._id}`);
    } else {
      setIsError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {'Registration'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              disabled={isLoading}
              variant="outlined"
              label="Full Name"
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
              label="Email"
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
              label="Password"
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
            {'Register'}
          </Button>
          <Button
            disabled={isLoading}
            sx={{ textAlign: 'left' }}
            onClick={() => {
              navigate(appLinks.login.link);
            }}
          >
            {'I already have account.'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
