import { createTheme } from '@material-ui/core/styles';

export const MARGIN = 45;

const palette = {
  error: {
    main: '#ff0000',
  },
};

export default createTheme({
  palette,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1650,
    },
  },
});
