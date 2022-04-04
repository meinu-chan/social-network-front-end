import React from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Box, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

interface IProps {
  online: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    display: 'flex',
    borderRadius: '50%',
  },
  onlineCircle: {
    color: '#7FFF00',
  },
  offlineCircle: {
    color: '#CBC8D0',
  },
  boxOffline: {
    backgroundColor: '#ACA7B4',
  },
  boxOnline: {
    backgroundColor: '#32CD32',
  },
}));

function OnlineIdentifier({ online }: IProps) {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.box, online ? classes.boxOnline : classes.boxOffline)}>
      <CircleOutlinedIcon className={online ? classes.onlineCircle : classes.offlineCircle} />
    </Box>
  );
}

export default OnlineIdentifier;
