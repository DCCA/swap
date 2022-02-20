import web3 from './web3';
import TemakiBar from '../build/contracts/TemakiBar.json';

const TemakiBarInstance = new web3.eth.Contract(
    TemakiBar.abi,
    '0x752E0d9d2Ed1A4CAeceaafB06a04BD29b816eA16'
)

export default TemakiBarInstance;