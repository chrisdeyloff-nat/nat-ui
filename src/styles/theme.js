import { createMuiTheme } from '@material-ui/core/es/styles'

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      laptop: 1440,
    }
  },
  props: {
    // Name of the component ⚛️
    MuiFormControl: {
      root: {
        margin: 2, // No more ripple, on the whole application 💣!
      }
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#3F3F3F',
      dark: '#12005e',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#c7a4ff',
      main: '#9575cd',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#000000',
    },
    // error: will use the default color
  },

  typography: {
      // Use any custom font instead of the default Roboto font.
      fontFamily: [
        'Noto Sans',
        'Niramit',
        'Arial',
        
      ].join(','),
    },

  });


  export default theme;