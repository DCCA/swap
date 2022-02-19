import web3 from './web3';
import TemakiBar from '../build/contracts/TemakiBar.json';

const TemakiBarInstance = new web3.eth.Contract(
    TemakiBar.abi,
    '0xBDc653196195bA3Aa1dd2A97CFb001fC5c20fDbD'
)

export default TemakiBarInstance;