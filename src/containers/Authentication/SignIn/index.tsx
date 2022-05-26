import { Typography, Box, FormControl, TextField, Button, Theme } from '@mui/material';
import React, { FormEvent } from 'react';
import {
  setApiAuthorizationHeader,
  createApiClientRequestInterceptor,
  createApiClientResponseInterceptor,
} from '../../../api/apiClient';
import { signIn } from '../../../api/authApi';
import PasswordInput from '../../../components/Form/PasswordInput';
import isValidSignInData from '../../../helpers/FormDataValidations/isValidSignInData';
import useModel from '../../../hooks/useModel';
import useApiRequest from '../../../hooks/useApiRequest';
import { useNavigate } from 'react-router-dom';
import { appLinks } from '../../../router/routes';
import { useAppContext } from '../../../store';
import { logOutUser, authUser } from '../../../store/actions';
import { makeStyles } from '@mui/styles';
import useValidateModel from '../../../hooks/useValidateModel';
import clsx from 'clsx';
//@ts-ignore
import bubble from '../../../static/images/bubble.png';
//@ts-ignore
import logo from '../../../static/images/logo.png';

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
};

function SignIn() {
  const classes = useStyles();

  const { dispatch } = useAppContext();
  const { requestFn: signInApi } = useApiRequest(signIn);
  const navigate = useNavigate();

  const [model, handleModelChange] = useModel(initialModel);
  const { valid, isValid, validateModel, setDefaultValidationState } =
    useValidateModel(initialModel);
  const [isError, setIsError] = React.useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isError) {
      setIsError(false);
      setDefaultValidationState();
    }

    isValidSignInData(model, validateModel);

    if (isValid) {
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
                Login in your account
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <FormControl fullWidth className={classes.formControl}>
                  <TextField
                    variant="outlined"
                    label="Email"
                    value={model.email}
                    onChange={(event) => handleModelChange('email', event.target.value)}
                    error={isError && !valid.email}
                    helperText={isError && !valid.email && 'Invalid Email'}
                  />
                </FormControl>
                <FormControl fullWidth className={classes.formControl}>
                  <PasswordInput
                    variant="outlined"
                    label="Password"
                    value={model.password}
                    onChange={(event) => handleModelChange('password', event.target.value)}
                    error={isError && !valid.password}
                    helperText={isError && !valid.password && 'Invalid Password'}
                  />
                </FormControl>

                <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3 }}>
                  {'Login'}
                </Button>
                <Button
                  sx={{ textAlign: 'right' }}
                  onClick={() => {
                    navigate(appLinks.registration.link);
                  }}
                >
                  {"I don't have account."}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default SignIn;
