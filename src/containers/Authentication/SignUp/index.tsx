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
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { signUp } from '../../../api/authApi';
import PasswordInput from '../../../components/Form/PasswordInput';
import isValidSignUpData from '../../../helpers/FormDataValidations/isValidSignUpData';
import {
  isEmptyString,
  isPhoneValid,
  isValidEmail,
  isValidPassword,
} from '../../../helpers/validations';
import useModel from '../../../hooks/useModel';
import useApiRequest from '../../../hooks/userApiRequest';
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
import useValidateModel from '../../../hooks/useValidateModel';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: '5px 0 !important',
  },
}));

const initialModel = {
  email: '',
  password: '',
  fullName: '',
  confirmPassword: '',
  phone: '',
  university: '',
  job: '',
  birthday: '',
};

function SignUp() {
  const classes = useStyles();

  const { requestFn: signUpApi, isLoading } = useApiRequest(signUp, {
    showSuccessMessage: false,
  });

  const { valid, isValid, validateModel, setDefaultValidationState } =
    useValidateModel(initialModel);
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const [model, handleModelChange] = useModel(initialModel);

  let success = false;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setDefaultValidationState();
    }

    isValidSignUpData(model, validateModel);

    if (isValid) {
      console.log('valid');
      // const res = await signUpApi({
      //   args: model,
      //   successMessage: 'User has been created.',
      // });

      // if (res.accessToken) {
      //   setApiAuthorizationHeader(res.accessToken);
      //   createApiClientRequestInterceptor(() => dispatch(logOutUser()));
      //   createApiClientResponseInterceptor(() => dispatch(logOutUser()));

      //   dispatch(authUser(res.user));
      //   dispatch(setUserData(res.user));
      //   success = true;
      // }
      // if (success) navigate(`${appLinks.index.link}${res.user._id}`);
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
              error={!isValid && !valid.fullName}
              helperText={!isValid && !valid.fullName && 'Invalid Full Name'}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              disabled={isLoading}
              variant="outlined"
              label="Email"
              value={model.email}
              onChange={(event) => handleModelChange('email', event.target.value)}
              error={!isValid && !valid.email}
              helperText={!isValid && !valid.email && 'Invalid Email'}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <PasswordInput
              disabled={isLoading}
              variant="outlined"
              label="Password"
              value={model.password}
              onChange={(event) => handleModelChange('password', event.target.value)}
              error={!isValid && !valid.password}
              helperText={
                !isValid &&
                !valid.password &&
                'Must contain lowercase and uppercase letters, a number and one of the characters !@#$%&*'
              }
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <PasswordInput
              disabled={isLoading}
              variant="outlined"
              label="Confirm password"
              value={model.confirmPassword}
              onChange={(event) => handleModelChange('confirmPassword', event.target.value)}
              error={!isValid && !valid.password}
              helperText={
                !isValid && !isValidPassword(model.confirmPassword) && 'Password mismatch'
              }
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              disabled={isLoading}
              variant="outlined"
              label="Phone number"
              placeholder="097-111-22-33"
              value={model.phone}
              onChange={(event) => handleModelChange('phone', event.target.value)}
              error={!isValid && !valid.phone}
              helperText={!isValid && !valid.phone && 'Invalid phone number'}
            ></TextField>
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              disabled={isLoading}
              variant="outlined"
              type="text"
              label="Place of study"
              value={model.university}
              onChange={(event) => handleModelChange('university', event.target.value)}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              variant="outlined"
              type="text"
              label="Place of work"
              value={model.job}
              onChange={(event) => handleModelChange('job', event.target.value)}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Birthday"
                inputFormat="MM/dd/yyyy"
                value={model.birthday}
                onChange={(event: any) => console.log(event)}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              sx={{
                width: '30%',
                mt: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {'Register'}
            </Button>
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <Button
              disabled={isLoading}
              sx={{
                display: 'flex',
                width: '60%',
                textAlign: 'left',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                navigate(appLinks.login.link);
              }}
            >
              {'I already have account.'}
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
