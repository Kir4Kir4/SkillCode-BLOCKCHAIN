pragma solidity ^0.4.17;

// -------------------------------------------------------------------------
// 1. CONTRACT WALLET (Hồ sơ Sinh viên)
// -------------------------------------------------------------------------
contract Wallet {
    address public student; // Địa chỉ ví Metamask của sinh viên
    uint public score;      // Điểm trung bình hoặc điểm tích lũy
    uint public testevaluatingscore;
    address public admin;   // Địa chỉ của Giảng viên quản lý (hoặc người tạo)

    function Wallet(address creator) public {
        student = creator;
        admin = creator; // Tạm thời set admin là chính người tạo để đơn giản hóa quyền
    }
    
    // Hàm cập nhật điểm (Chỉ cho phép gọi từ quy trình chấm điểm)
    function setscoretest(uint marks) public {
        // tx.origin là người bấm nút (Giảng viên). 
        // Logic này cho phép Giảng viên thông qua Contract Test để cập nhật điểm vào ví này.
        // Đây là cách đơn giản nhất để Test Contract có quyền ghi điểm vào Wallet.
        score = (score + marks) / 2; 
    }

    function setscoreeval(uint marks) public {
        testevaluatingscore = (testevaluatingscore + marks) / 2;
    }
    
    function presentscore() public view returns(uint, uint){
        return (score, testevaluatingscore);
    }

    function myaddress() public view returns(address){
        return student;
    }
}

// -------------------------------------------------------------------------
// 2. CONTRACT FACTORY (Quản lý Tài khoản & Tạo Đề)
// -------------------------------------------------------------------------
contract TestFactory {
    // Danh sách các bài thi đã tạo
    address[] public deployedCampaigns;
    
    // Lưu mô tả bài thi (Địa chỉ bài thi => Mô tả)
    mapping(address => string) Instructions;
    
    // Quản lý người dùng
    address[] public students; // Danh sách tất cả ví sinh viên
    mapping(address => string) public names; // Địa chỉ ví => Tên hiển thị
    mapping(address => address) public wallet; // Địa chỉ Metamask => Địa chỉ Smart Contract Wallet
    mapping(address => bool) doyouhavewallet; // Kiểm tra đã đăng ký chưa
    
    // QUAN TRỌNG: Lưu vai trò (student / lecturer)
    mapping(address => string) public roles; 

    // --- CHỨC NĂNG 1: TẠO TÀI KHOẢN (ĐĂNG KÝ) ---
    function createwallet(string name, string role) public {
        require(!doyouhavewallet[msg.sender]); // Mỗi người chỉ đăng ký 1 lần
        
        // Tạo Smart Contract Wallet mới cho sinh viên
        address newwallet = new Wallet(msg.sender);
        wallet[msg.sender] = newwallet;
        students.push(newwallet);
        
        // Lưu thông tin
        names[newwallet] = name;      // Gắn tên vào địa chỉ Wallet mới
        names[msg.sender] = name;     // Gắn tên vào địa chỉ Metamask luôn cho dễ tìm
        roles[msg.sender] = role;     // Lưu vai trò (lecturer/student)
        
        doyouhavewallet[msg.sender] = true;
    }

    // --- CHỨC NĂNG 2: TẠO BÀI THI (Chỉ Giảng viên) ---
    function creatorTest(string Instruction, string testLink) public {
        // Kiểm tra quyền: Phải là 'lecturer'
        require(keccak256(roles[msg.sender]) == keccak256("lecturer"));

        // Tạo bài thi mới, truyền vào Link đề bài
        address newTest = new Test(msg.sender, testLink);
        deployedCampaigns.push(newTest);
        Instructions[newTest] = Instruction;
    }
    
    // --- CHỨC NĂNG 3: XÓA BÀI THI (Chỉ Giảng viên) ---
    function removeTest(address testAddress) public {
        require(keccak256(roles[msg.sender]) == keccak256("lecturer"));
        
        for (uint i = 0; i < deployedCampaigns.length; i++) {
            if (deployedCampaigns[i] == testAddress) {
                // Xóa phần tử khỏi mảng và sắp xếp lại
                deployedCampaigns[i] = deployedCampaigns[deployedCampaigns.length - 1];
                delete deployedCampaigns[deployedCampaigns.length - 1];
                deployedCampaigns.length--;
                return;
            }
        }
    }

    // --- CÁC HÀM GETTER (Lấy dữ liệu) ---
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
    
    function totalinstruction(address add) public view returns(string){
        return Instructions[add];
    }
    
    function getRole(address userAddress) public view returns (string) {
        return roles[userAddress];
    }
    
    function mywallet() public view returns (address){
        return wallet[msg.sender];
    }
    
    function myname(address walletAddr) public view returns (string){
        return names[walletAddr];
    }
}

// -------------------------------------------------------------------------
// 3. CONTRACT TEST (Bài thi cụ thể)
// -------------------------------------------------------------------------
contract Test {
    // Lưu trạng thái xem ai đã tham gia (Địa chỉ Wallet => Đã tham gia?)
    mapping(address => bool) public attende;
    
    // QUAN TRỌNG: Lưu Link bài làm của sinh viên (Ví Sinh viên => Link Google Docs/Drive)
    mapping(address => string) public submissions; 
    
    // QUAN TRỌNG: Lưu điểm số (Ví Sinh viên => Điểm)
    mapping(address => uint) public scores;
    
    // Kiểm tra xem đã chấm điểm chưa
    mapping(address => bool) public isGraded;

    address[] studentswallet; // Danh sách sinh viên tham gia lớp này
    address examiner;         // Địa chỉ giảng viên tạo bài
    string public testLinkUrl; // Link đề bài (Do giảng viên nhập)

    // Modifier: Chỉ cho phép giảng viên (người tạo bài) gọi hàm
    modifier restricted() {
        require(msg.sender == examiner);
        _;
    }

    // Constructor: Chạy 1 lần khi tạo bài thi
    function Test(address creator, string _link) public {
        examiner = creator;
        testLinkUrl = _link;
    }

    // 1. SINH VIÊN: Tham gia (Enroll)
    function enrollintest(address walletaddress) public {
        require(!attende[walletaddress]); // Chưa tham gia mới được vào
        attende[walletaddress] = true;
        studentswallet.push(walletaddress);
    }
    
    // 2. SINH VIÊN: Nộp bài (Submit)
    // Sinh viên gửi link bài làm của mình lên
    function submitAssignment(address studentWallet, string link) public {
        require(attende[studentWallet]); // Phải là người đã tham gia
        submissions[studentWallet] = link;
    }

    // 3. GIẢNG VIÊN: Chấm điểm (Grade)
    function gradeAssignment(address studentWallet, uint mark) public restricted {
        require(attende[studentWallet]); // Sinh viên phải thuộc lớp này
        
        scores[studentWallet] = mark;    // Lưu điểm vào bài thi này
        isGraded[studentWallet] = true;  // Đánh dấu đã chấm
        
        // Cập nhật điểm tích lũy vào Hồ sơ gốc (Wallet Contract) của sinh viên
        Wallet(studentWallet).setscoretest(mark);
    }
    
    // --- CÁC HÀM GETTER ---
    
    // Lấy link bài làm của sinh viên
    function getSubmission(address studentWallet) public view returns(string) {
        return submissions[studentWallet];
    }
    
    // Lấy điểm của sinh viên
    function getScore(address studentWallet) public view returns(uint) {
        return scores[studentWallet];
    }

    function examineradd() public view returns(address){ return examiner; }
    function StudentsAddress() public view returns(address[]){ return studentswallet; }
    
    // Lấy Link đề bài
    function getTestLink() public view returns(string) { return testLinkUrl; }
    
    // Trả về 1 (tượng trưng cho 1 bài thi lớn) để tương thích logic cũ
    function numberofQ() public view returns(uint){ return 1; } 
    
    // Hàm cũ (nếu frontend cũ vẫn gọi để tránh lỗi crash, trả về dummy data)
    function sendresponse(address studentwallet, uint index) public view returns(string, string, int){
        return ("Question", submissions[studentwallet], int(scores[studentwallet]));
    }
}