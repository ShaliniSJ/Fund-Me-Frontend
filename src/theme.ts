// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
      margin: 0,
    },
    body1: {
      fontSize: '1.2rem',
    },
  },
});

export default theme;
