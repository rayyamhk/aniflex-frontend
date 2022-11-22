import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    fontFamily: '"Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.25rem',
    },
    h4: {
      fontSize: '1rem',
    },
    h5: {
      fontSize: '0.9rem'
    },
    h6: {
      fontSize: '0.8rem',
    }
  }
});

export default theme;