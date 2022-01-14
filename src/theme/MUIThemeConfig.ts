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
});

export default appTheme;
