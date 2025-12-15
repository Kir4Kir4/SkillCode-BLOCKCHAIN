import web3 from './web3';
import TestFactory from './build/TestFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(TestFactory.interface),
  '0x2039907042f29c395F9516AE3f2Ef377Bc950079'
);

export default instance;