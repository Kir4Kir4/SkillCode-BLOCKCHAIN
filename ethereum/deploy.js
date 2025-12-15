const Web3 = require('web3');
const TestFactory = require('./build/TestFactory.json'); // Đọc từ thư mục build chuẩn

// Kết nối Ganache
const web3 = new Web3('http://127.0.0.1:7545');

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log('Dang deploy TestFactory tu tai khoan:', accounts[0]);

    let bytecode = TestFactory.bytecode;
    if (!bytecode.startsWith('0x')) {
      bytecode = '0x' + bytecode;
    }

    const result = await new web3.eth.Contract(JSON.parse(TestFactory.interface))
      .deploy({ data: bytecode })
      .send({ gas: '3000000', from: accounts[0] });

    console.log('--- KẾT QUẢ ---');
    console.log('Contract TestFactory da duoc deploy tai dia chi:', result.options.address);
    console.log('-----------------');
    console.log('Hãy copy địa chỉ trên và dán vào file ethereum/factory.js');

  } catch (error) {
    console.error("Loi khi deploy:", error);
  }
};
deploy();