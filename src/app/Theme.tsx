import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import React from 'react';
import CustomSnackbar from '../components/CustomSnackbar';
import appTheme from '../theme/MUIThemeConfig';

interface Props {
  children: React.ReactNode;
}

const Theme: React.FC<Props> = (props: Props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={appTheme}>
      <CustomSnackbar>
        <CssBaseline />
        {children}
      </CustomSnackbar>
    </ThemeProvider>
  );
};

export default Theme;
