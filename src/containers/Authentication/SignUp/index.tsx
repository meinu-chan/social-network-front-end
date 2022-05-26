import React, { FormEvent } from 'react';
import { Box, Typography, FormControl, TextField, Button, Theme } from '@mui/material';
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
import clsx from 'clsx';
//@ts-ignore
import bubble from '../../../static/images/bubble.png';
//@ts-ignore
import logo from '../../../static/images/logo.png';
import colors from '../../../theme/colors';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: '2% 0 !important',
  },
  main: {
    height: '100vh',
  },
  blueBox: {
    height: '100%',
    width: '50%',
    backgroundColor: theme.palette.primary.main,
  },
  fullScreen: {
    height: '100vh',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    height: '70vh',
    width: '70%',
    display: 'flex',
    '& .formBox': {
      height: '100%',
      width: '50%',
    },
  },
  formBox: {
    width: '60%',
  },
  withBubble: {
    border: '1px solid #F6F8FF',
    backgroundColor: '#F6F8FF',
    borderRadius: '50px 0px 0px 50px',
    background: `url(${bubble}) no-repeat center center`,
    backgroundSize: '60vh',
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
    <Box className={classes.main}>
      <Box className={classes.blueBox} />
      <Box className={classes.fullScreen}>
        <Box className={classes.form}>
          <Box className={clsx('formBox', classes.withBubble)}>
            <img src={logo} alt="logo" style={{ width: '20%' }} />
          </Box>
          <Box
            className={'formBox'}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.paperLight,
              borderRadius: '0 50px 50px 0',
            }}
          >
            <Box className={classes.formBox}>
              <Typography
                textAlign="center"
                variant="h6"
                sx={{
                  fontFamily: 'Montserrat',
                  textTransform: 'uppercase',
                }}
                noWrap
              >
                Create your account
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
                <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3 }}>
                  {'Login'}
                </Button>
                <Button
                  disabled={isLoading}
                  sx={{ textAlign: 'left' }}
                  onClick={() => {
                    navigate(appLinks.login.link);
                  }}
                >
                  {'I already have account'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
