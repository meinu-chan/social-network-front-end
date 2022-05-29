import { Box, Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { FormEvent, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { CustomButton } from '../User';
import SettingField from '../../components/Setting';
import { useAppContext } from '../../store';
import useModel from '../../hooks/useModel';
import useValidateModel from '../../hooks/useValidateModel';
import isValidSettingData from '../../helpers/FormDataValidations/isValidSettingData';
import useApiRequest from '../../hooks/useApiRequest';
import { updateMe } from '../../api/userApi';
import Loader from '../../components/Loader';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    background: '#F6F8FF',
    padding: '2%',
    borderRadius: '50px',
    margin: '2% 0 !important',
  },
  category: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  setting: {
    fontFamily: 'Montserrat',
    fontWeight: 500,
  },
}));

function Settings() {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    state: { user },
  } = useAppContext();
  const [isError, setIsError] = useState(false);

  const initialModel = {
    fullName: user.fullName,
    phone: user.phone,
    university: user.university,
    job: user.job,
    nickname: user.nickname,
    hobbies: user.hobbies,
  };

  const [model, handleModelChange] = useModel(initialModel);
  const { valid, isValid, validateModel, setDefaultValidationState } =
    useValidateModel(initialModel);

  const { requestFn, isLoading } = useApiRequest(updateMe);

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();

    if (isError) {
      setIsError(false);
      setDefaultValidationState();
    }

    isValidSettingData(model, validateModel);
    if (isValid) {
      const payload = Object.entries(model).reduce((acc, [key, value]) => {
        //@ts-ignore
        if (model[key]) acc[key] = value;

        return acc;
      }, {});
      requestFn({ args: payload });
    } else {
      setIsError(true);
    }
  };

  return (
    <Box
      sx={{ height: `calc(100vh - ${document.getElementsByTagName('header')[0].clientHeight}px)` }}
    >
      {isLoading && <Loader fullScreen />}
      <Box sx={{ margin: '0 5%', bgcolor: 'background.paper', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            sx={{ '&:hover': { bgcolor: 'background.paper' } }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <Typography variant="h3" sx={{ padding: '2% 1%', textTransform: 'capitalize' }}>
            Settings
          </Typography>
        </Box>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Grid
            item
            className={classes.item}
            xs={8}
            sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Box sx={{ width: '50%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SettingsIcon />
                <Typography variant="h5" className={classes.category}>
                  Personal information
                </Typography>
              </Box>
              <Box sx={{ marginLeft: '5%' }}>
                <SettingField
                  fieldName="Your name:"
                  value={model.fullName}
                  onChange={handleModelChange.bind(null, 'fullName')}
                  error={isError && !valid.fullName}
                  helperText={isError && !valid.fullName && 'Invalid full name'}
                />
                <SettingField
                  fieldName="Phone number:"
                  value={model.phone}
                  isPhone
                  onChange={handleModelChange.bind(null, 'phone')}
                  error={isError && !valid.phone}
                  helperText={isError && !valid.phone && 'Invalid phone'}
                />
              </Box>
            </Box>
            <CustomButton
              variant="contained"
              sx={{
                height: 'fit-content',
                width: 'fit-content',
                alignSelf: 'center',
                textTransform: 'uppercase',
              }}
              size="large"
              onClick={handleEdit}
            >
              Edit
            </CustomButton>
          </Grid>
          <Grid
            item
            className={classes.item}
            xs={8}
            sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Box sx={{ width: '50%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SettingsIcon />
                <Typography variant="h5" className={classes.category}>
                  Education and word
                </Typography>
              </Box>
              <Box sx={{ marginLeft: '5%' }}>
                <SettingField
                  fieldName="Studies"
                  value={model.university}
                  onChange={handleModelChange.bind(null, 'university')}
                  error={isError && !valid.university}
                  helperText={isError && !valid.university && 'Invalid university'}
                />
                <SettingField
                  fieldName="Working at:"
                  value={model.job}
                  onChange={handleModelChange.bind(null, 'job')}
                  error={isError && !valid.job}
                  helperText={isError && !valid.job && 'Invalid job'}
                />
              </Box>
            </Box>
            <CustomButton
              variant="contained"
              sx={{
                height: 'fit-content',
                width: 'fit-content',
                alignSelf: 'center',
                textTransform: 'uppercase',
              }}
              size="large"
            >
              Edit
            </CustomButton>
          </Grid>
          <Grid
            item
            className={classes.item}
            xs={8}
            sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Box sx={{ width: '50%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SettingsIcon />
                <Typography variant="h5" className={classes.category}>
                  Other
                </Typography>
              </Box>
              <Box sx={{ marginLeft: '5%' }}>
                <SettingField
                  fieldName="Nickname"
                  value={model.nickname}
                  onChange={handleModelChange.bind(null, 'nickname')}
                  error={isError && !valid.nickname}
                  helperText={isError && !valid.nickname && 'Invalid nickname'}
                />
                <SettingField
                  fieldName="Hobbies:"
                  value={model.hobbies}
                  onChange={handleModelChange.bind(null, 'hobbies')}
                  error={isError && !valid.hobbies}
                  helperText={isError && !valid.hobbies && 'Invalid hobbies'}
                />
              </Box>
            </Box>
            <CustomButton
              variant="contained"
              sx={{
                height: 'fit-content',
                width: 'fit-content',
                alignSelf: 'center',
                textTransform: 'uppercase',
              }}
              size="large"
            >
              Edit
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Settings;
