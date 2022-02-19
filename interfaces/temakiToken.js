import web3 from './web3';
import TemakiToken from '../build/contracts/TemakiToken.json';

const TemakiTokenInstance = new web3.eth.Contract(
    TemakiToken.abi,
    '0xC270D16A4E914A9010D0f0f9AABDC619501CBE96'
)

export default TemakiTokenInstance;