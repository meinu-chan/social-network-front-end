import {
  Typography,
  Box,
  FormControl,
  TextField,
  Button,
  Theme,
  Container,
  CssBaseline,
} from '@mui/material';
import React, { FormEvent } from 'react';
import {
  setApiAuthorizationHeader,
  createApiClientRequestInterceptor,
  createApiClientResponseInterceptor,
} from '../../../api/apiClient';
import { signIn } from '../../../api/authApi';
import PasswordInput from '../../../components/Form/PasswordInput';
import isValidSignInData from '../../../helpers/FormDataValidations/isValidSignInData';
import { isValidEmail, isValidPassword } from '../../../helpers/validations';
import useModel from '../../../hooks/useModel';
import useApiRequest from '../../../hooks/userApiRequest';
import { useNavigate } from 'react-router-dom';
import { appLinks } from '../../../router/routes';
import { useAppContext } from '../../../store';
import { logOutUser, authUser } from '../../../store/actions';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: '5px 0 !important',
  },
}));

const initialModel = {
  email: '',
  password: '',
};

function SignIn() {
  const classes = useStyles();

  const { dispatch } = useAppContext();
  const { requestFn: signInApi } = useApiRequest(signIn);
  const navigate = useNavigate();

  const [model, handleModelChange] = useModel(initialModel);
  const [isError, setIsError] = React.useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isError) {
      setIsError(false);
    }

    if (isValidSignInData(model)) {
      const res = await signInApi({ args: model });

      if (res.accessToken) {
        setApiAuthorizationHeader(res.accessToken);
        createApiClientRequestInterceptor(() => dispatch(logOutUser()));
        createApiClientResponseInterceptor(() => dispatch(logOutUser()));

        dispatch(authUser(res.user));
      }

      navigate(`${appLinks.index.link}${res.user._id}`);
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
          {'Authorize'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
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

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            {'Login'}
          </Button>
          <Button
            sx={{ textAlign: 'left' }}
            onClick={() => {
              navigate(appLinks.registration.link);
            }}
          >
            {"I don't have account."}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default SignIn;
