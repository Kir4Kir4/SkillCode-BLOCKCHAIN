import web3 from './web3';
// SỬA LỖI: Đổi từ './build2/Wallet.json' thành './build/Wallet.json'
import Wallet from './build/Wallet.json'; 

export default address => {
  return new web3.eth.Contract(JSON.parse(Wallet.interface), address);
};