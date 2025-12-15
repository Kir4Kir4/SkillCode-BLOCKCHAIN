import web3 from './web3';
import Test from './build/Test.json'; // Đổi từ Campaign.json hoặc build2 thành Test.json trong build

export default address => {
  return new web3.eth.Contract(JSON.parse(Test.interface), address);
};