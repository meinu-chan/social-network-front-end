import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import clsx from 'clsx';

interface IProps {
  fullScreen?: boolean;
  display?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  ldsRipple: {
    display: 'inline-block',
    width: '80px',
    height: '80px',
    position: 'absolute',
    zIndex: 100,
    '& div': {
      position: 'absolute',
      border: '4px solid',
      borderColor: theme.palette.primary.main,
      opacity: '1',
      borderRadius: '50%',
      animation: `$lds-ripple 1000ms ${theme.transitions.easing.sharp} infinite`,
      '&:nth-child(2)': {
        animationDelay: '-0.5s',
      },
    },
  },
  fullScreen: {
    width: '200px !important',
    height: '200px !important',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  '@keyframes lds-ripple': {
    '0%': {
      top: '50%',
      left: '50%',
      width: 0,
      height: 0,
      opacity: 1,
    },
    '100%': {
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      opacity: 0,
    },
  },
  hidden: {
    display: 'none',
  },
}));

function Loader({ fullScreen = false, display = true }: IProps) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.ldsRipple, {
        [classes.fullScreen]: fullScreen,
        [classes.hidden]: !display,
      })}
    >
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
