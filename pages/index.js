import '@fontsource/roboto';
import { Button, ButtonGroup } from '@mui/material';
import Layout from '../components/Layout';

function HomePage() {
  return (
    <Layout>
      <h3>Welcome to Temaki bar!</h3>
      <h4>What would like to order today?</h4>
      <ButtonGroup orientation='vertical' variant='contained'>
        <Button>
          Buy Temaki Tokens!
        </Button>
        <Button>
          Bet Temaki Tokens!
        </Button>
        <Button>
          Sell Temaki Tokens!
        </Button>
      </ButtonGroup>
    </Layout>

  ) 
}

export default HomePage
