import React from 'react';
import { SnackbarProvider, SnackbarKey } from 'notistack';
import { IconButton, Theme } from '@mui/material';
import CloseIcon from '../../icons/CloseIcon';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    top: 80,
    '@media (min-width: 960px)': {
      top: 100,
    },
    '& .MuiSvgIcon-colorPrimary': {
      color: 'inherit',
    },
    '& .MuiSvgIcon-colorSecondary': {
      color: 'inherit',
    },
  },
  success: {
    padding: 16,
    borderRadius: 24,
    backgroundColor: `${theme.palette.success.main} !important`,
    color: `${theme.palette} !important`,
    boxShadow: '0 4px 12px 0 rgba(39, 53, 61, 0.2)',
  },
  error: {
    padding: 16,
    borderRadius: 24,
    backgroundColor: `${theme.palette.error.main} !important`,
    color: `${theme.palette} !important`,
    boxShadow: '0 4px 12px 0 rgba(39, 53, 61, 0.2)',
  },
  warning: {
    padding: 16,
    borderRadius: 24,
    backgroundColor: `${theme.palette.warning.main} !important`,
    color: `${theme.palette} !important`,
    boxShadow: '0 4px 12px 0 rgba(39, 53, 61, 0.2)',
  },
  info: {
    padding: 16,
    borderRadius: 24,
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: `${theme.palette} !important`,
    boxShadow: '0 4px 12px 0 rgba(39, 53, 61, 0.2)',
  },
}));

interface Props {
  children: React.ReactNode;
}

const CustomSnackbar: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const classes = useStyles();
  const notistackRef = React.createRef<SnackbarProvider>();

  const onClickDismiss = (key: SnackbarKey) => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  return (
    <SnackbarProvider
      ref={notistackRef}
      maxSnack={5}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      action={(key) => (
        <IconButton onClick={() => onClickDismiss(key)} color="inherit">
          <CloseIcon />
        </IconButton>
      )}
      classes={{
        containerRoot: classes.root,
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbar;
