import '@fontsource/roboto';
import { Container } from '@mui/material';
import Header from '../components/Header';

function Layout(props) {
  return (
    <body style={{fontFamily: 'roboto', margin: '0'}}>
      <Header/>
      <Container sx={{display: 'flex', flexDirection: 'column',justifyContent: 'center'}}>
          {props.children}
      </Container>
    </body>
  ) 
}

export default Layout
