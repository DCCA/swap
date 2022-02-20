import '@fontsource/share-tech-mono';
import { Container, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from '../components/Header';


const theme = createTheme({
  typography: {
    fontFamily: [
      'Share Tech Mono'
    ]
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ffea00',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#607d8c',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    // Background colors
  },
});


function Layout(props) {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Header/>
        <Container sx={{display: 'flex', flexDirection: 'column', bgcolor: 'secondary.light', height: '100vh'}}>
            {props.children}
        </Container>
      </ThemeProvider>
    </CssBaseline>
  ) 
}

export default Layout
