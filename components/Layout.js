import '@fontsource/share-tech-mono';
import { Container, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from '../components/Header';
import Head from 'next/head';


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
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    // Background colors
    background: {
      default: '#607d8c'
    }
  },
});


function Layout(props) {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline>
          <Head>
            <title>temakiBar</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          </Head>
          <Header/>
          <Container maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', bgcolor: 'secondary.light', height: '100vh'}}>
              {props.children}
          </Container>
        </CssBaseline>
    </ThemeProvider>
  ) 
}

export default Layout;
