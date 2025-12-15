const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// 1. Xóa thư mục build cũ để đảm bảo code mới nhất
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// 2. Đọc file Test.sol (File duy nhất chứa cả TestFactory và Test)
const campaignPath = path.resolve(__dirname, 'contracts', 'Test.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

// 3. Compile
const output = solc.compile(source, 1).contracts;

// 4. Tạo lại thư mục build và xuất file JSON
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}

console.log('✅ Đã compile xong! File JSON nằm trong thư mục ethereum/build');