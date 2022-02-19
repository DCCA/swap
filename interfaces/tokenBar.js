import web3 from './web3';
import TokenBar from '../build/contracts/TemakiBar.json';
import {temakiBarAddress} from '../keys';

const TemakiBarInstance = new web3.eth.Contract(
    JSON.parse(TokenBar.abi),
    temakiBarAddress
)

export default TemakiBarInstance;