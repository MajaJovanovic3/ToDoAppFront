import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import { AlignCenter } from 'react-feather';

const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiTypography: {
      // Name of the rule
      h6: {
        // Some CSS
        background: '',
        borderRadius: 3,
        border: 0,
        fontSize: 25,
        textAlign: "center",
        color: 'rgba(44, 56, 126)',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 5px 7px 4px rgba(44, 56, 126)'
      }
    }
  },
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.indigo[500]
    },
    secondary: {
      main: colors.indigo[500]
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
});

export default theme;
