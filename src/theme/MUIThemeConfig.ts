import { createTheme } from '@mui/material/styles';
import colors from './colors';

const appTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      paper: colors.paperLight,
      default: colors.bgLight,
    },
  },
  transitions: {
    easing: {
      sharp: 'cubic-bezier(0, 0.2, 0.8, 1)',
    },
  },
});

export default appTheme;
