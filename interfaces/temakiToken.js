import web3 from './web3';
import TemakiToken from '../build/contracts/TemakiToken.json';

const TemakiTokenInstance = new web3.eth.Contract(
    TemakiToken.abi,
    '0x2E34DcE6f00E215F4856f336F3AFf11FE9B4F61E'
)

export default TemakiTokenInstance;