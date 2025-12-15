import React, { Component } from 'react';
import { Menu, Button, Icon, Label, Dropdown } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';

class Header extends Component {
  state = { 
    role: '', 
    account: '' 
  };

  async componentDidMount() {
    // 1. Luôn lấy địa chỉ ví để hiển thị (nếu đã kết nối MetaMask)
    try {
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });

        // 2. LOGIC QUAN TRỌNG: Kiểm tra xem có đang trong phiên đăng nhập không
        // Nếu vừa chuyển ví (reload trang), sessionStorage vẫn còn giữ giá trị 'true'
        const isLoggedIn = sessionStorage.getItem('SKILLCODE_LC_LOGIN');
        if (isLoggedIn === 'true') {
            await this.fetchRole(accounts[0]);
        }
    } catch(e) {}

    // Lắng nghe sự kiện đăng nhập từ trang chủ (nút Truy cập)
    window.addEventListener('LOGIN_SUCCESS', this.handleLoginEvent);
    // Lắng nghe sự kiện đăng xuất
    window.addEventListener('LOGOUT', this.handleLogout);
  }

  componentWillUnmount() {
      window.removeEventListener('LOGIN_SUCCESS', this.handleLoginEvent);
      window.removeEventListener('LOGOUT', this.handleLogout);
  }

  handleLoginEvent = async () => {
      // Khi user bấm nút đăng nhập ở trang Test.js
      const accounts = await web3.eth.getAccounts();
      await this.fetchRole(accounts[0]);
      // Lưu đánh dấu đã đăng nhập vào Session
      sessionStorage.setItem('SKILLCODE_LC_LOGIN', 'true');
  }

  fetchRole = async (account) => {
    try {
        if (account) {
            const role = await factory.methods.getRole(account).call();
            this.setState({ role, account });
        }
    } catch(e) {}
  }

  handleSwitchAccount = async () => {
      try {
          await window.ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] });
          // Layout.js sẽ reload trang. componentDidMount sẽ chạy lại và thấy SessionStorage => Tự động login ví mới.
      } catch (error) { console.error(error); }
  }

  // --- SỬA NÚT ĐĂNG XUẤT ---
  handleLogout = () => {
      // 1. Xóa phiên đăng nhập
      sessionStorage.removeItem('SKILLCODE_LC_LOGIN');
      
      // 2. Xóa state local
      this.setState({ role: '', account: '' });

      // 3. Bắn sự kiện để trang test.js cũng logout theo (về giao diện khách)
      window.dispatchEvent(new Event('LOGOUT_UI'));
      
      // 4. Chuyển về trang chủ (nếu đang ở trang khác)
      Router.pushRoute('/test/test');
  }

  // Nút đăng nhập trên Header (Dành cho trường hợp đang ở trang khác trang chủ)
  triggerLogin = async () => {
      // Đánh dấu session và reload để trang chủ tự xử lý hiển thị
      sessionStorage.setItem('SKILLCODE_LC_LOGIN', 'true');
      const accounts = await web3.eth.getAccounts();
      await this.fetchRole(accounts[0]);
      Router.pushRoute('/test/test');
      // Phát sự kiện để test.js cập nhật nếu đang ở đó
      window.dispatchEvent(new Event('LOGIN_SUCCESS'));
  }

  render() {
    const { role, account } = this.state;
    const shortAccount = account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : '';

    return (
      <Menu secondary style={{ margin: 0, padding: '10px 0' }}>
        <Link route="/test/test">
          <a className="item" style={{paddingLeft: 0}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon name='cubes' size='large' color='blue' />
                <span style={{ fontSize: '1.5em', fontWeight: '800', color: '#1a1a1a', marginLeft: '10px' }}>
                    SkillCode
                </span>
            </div>
          </a>
        </Link>

        <Menu.Menu position="right" style={{alignItems: 'center'}}>
            {role && (
                <div style={{marginRight: '15px'}}>
                     <Label color={role === 'lecturer' ? 'orange' : 'teal'} size='large'>
                        <Icon name={role === 'lecturer' ? 'university' : 'student'} />
                        {role === 'lecturer' ? 'Giảng viên' : 'Sinh viên'}
                    </Label>
                </div>
            )}

            {role === 'lecturer' && (
                <Link route="/test/newtest">
                    <a className="item" style={{color: '#1f1f1f', fontWeight: 600}}>Tạo Khóa Học</a>
                </Link>
            )}
            
            {role === 'student' && (
                 <Link route="/test/test">
                    <a className="item" style={{color: '#1f1f1f', fontWeight: 600}}>Khóa học của tôi</a>
                </Link>
            )}

            {account && role ? (
                <Dropdown 
                    trigger={<Button basic icon labelPosition='left'><Icon name='user circle' />{shortAccount}</Button>} 
                    pointing className='link item'
                >
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.handleSwitchAccount} icon='exchange' text='Đổi ví' />
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={this.handleLogout} icon='sign-out' text='Đăng xuất' />
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                <div style={{display:'flex'}}>
                    {/* Nếu chưa đăng nhập (role rỗng), hiện nút Login */}
                    <Button basic onClick={this.triggerLogin} style={{marginRight: '10px'}}>Đăng nhập</Button>
                    <Link route="/campaign/new">
                        <Button primary>Đăng ký</Button>
                    </Link>
                </div>
            )}
        </Menu.Menu>
      </Menu>
    );
  }
}
export default Header;