import React, { Component } from 'react';
import { Card, Button, Header, Icon, Segment, Label, Confirm, Message, Grid, Container, Image } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';

class CampaignIndex extends Component {
  state = { 
    userRole: '', 
    loading: false, errorMessage: '', confirmOpen: false, selectedAddress: '', isLoggingIn: false
  };

  static async getInitialProps() {
    let campaigns = [];
    try { campaigns = await factory.methods.getDeployedCampaigns().call(); } catch (e) {}

    const Instruction = [];
    for(let i = 0; i < campaigns.length; i++){
      try {
          const inst = await factory.methods.totalinstruction(campaigns[i]).call();
          if(campaigns[i] !== '0x0000000000000000000000000000000000000000') {
            Instruction.push({ address: campaigns[i], instruction: inst });
          }
      } catch (err) {}
    }
    return { campaigns, Instruction };
  }

  async componentDidMount() {
      // 1. Kiểm tra sessionStorage. Nếu 'true' => Tự động lấy Role (Trường hợp F5 hoặc đổi ví)
      const isLoggedIn = sessionStorage.getItem('SKILLCODE_LC_LOGIN');
      if (isLoggedIn === 'true') {
          await this.fetchUserRole();
      }

      // 2. Lắng nghe sự kiện Logout để về giao diện khách ngay lập tức
      window.addEventListener('LOGOUT_UI', this.handleLogoutUI);
      window.addEventListener('LOGIN_SUCCESS', this.fetchUserRole);
  }

  componentWillUnmount() {
      window.removeEventListener('LOGOUT_UI', this.handleLogoutUI);
      window.removeEventListener('LOGIN_SUCCESS', this.fetchUserRole);
  }

  handleLogoutUI = () => {
      this.setState({ userRole: '' });
  }

  handleLoginClick = async () => {
      this.setState({ isLoggingIn: true });
      // Đánh dấu session
      sessionStorage.setItem('SKILLCODE_LC_LOGIN', 'true');
      // Phát sự kiện để Header cập nhật
      window.dispatchEvent(new Event('LOGIN_SUCCESS'));
      await this.fetchUserRole();
  }

  fetchUserRole = async () => {
      try {
          const accounts = await web3.eth.getAccounts();
          if(accounts[0]) {
              const role = await factory.methods.getRole(accounts[0]).call();
              
              if (!role) {
                  // Nếu ví chưa đăng ký, xóa session và báo lỗi
                  sessionStorage.removeItem('SKILLCODE_LC_LOGIN');
                  alert("Ví này chưa đăng ký tài khoản. Vui lòng đăng ký trước.");
                  Router.pushRoute('/campaign/new');
                  this.setState({ userRole: '' });
              } else {
                  this.setState({ userRole: role });
              }
          }
      } catch(e) { console.error(e); } 
      finally { this.setState({ isLoggingIn: false }); }
  }

  // --- LOGIC XÓA ---
  openConfirm = (address) => this.setState({ confirmOpen: true, selectedAddress: address });
  closeConfirm = () => this.setState({ confirmOpen: false, selectedAddress: '' });
  handleDelete = async () => {
    this.setState({ loading: true, errorMessage: '', confirmOpen: false });
    try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods.removeTest(this.state.selectedAddress).send({ from: accounts[0] });
        Router.replaceRoute('/test/test');
    } catch (err) { this.setState({ errorMessage: err.message }); }
    this.setState({ loading: false, selectedAddress: '' });
  };

  // --- GIAO DIỆN KHÁCH ---
  renderGuestView() {
      return (
          <div>
               <div style={{
                  // Ảnh nền Hero
                  backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
                  backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 0', position: 'relative', marginBottom: '50px'
              }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.65)' }}></div>
                  <Container style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                      <Header as='h1' style={{ fontSize: '4em', color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.5)', marginBottom: '20px' }}>
                          Học Không Giới Hạn
                      </Header>
                      <p style={{ fontSize: '1.4em', color: '#f0f0f0', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
                          Nền tảng giáo dục phi tập trung. <br/> Đăng nhập để tiếp tục việc học hoặc quản lý lớp học.
                      </p>
                      
                      <Button color='blue' size='huge' onClick={this.handleLoginClick} loading={this.state.isLoggingIn} style={{ padding: '15px 50px', fontSize: '1.2em', marginRight: '15px' }}>
                          <Icon name='sign-in' /> Truy cập Hệ thống
                      </Button>
                      <Link route="/campaign/new">
                          <a><Button inverted size='huge' style={{ padding: '15px 40px', fontSize: '1.2em' }}>Đăng ký mới</Button></a>
                      </Link>
                  </Container>
              </div>
              
              <Container>
                  <Grid stackable columns={3} style={{ marginTop: '20px' }}>
                      <Grid.Column textAlign='center'>
                          <Segment padded='very' style={{borderTop: '4px solid #2185d0', borderRadius: '10px'}}>
                              <Icon name='lock' size='huge' color='blue' style={{marginBottom: '20px'}} />
                              <Header as='h3'>Bảo mật Blockchain</Header>
                          </Segment>
                      </Grid.Column>
                      <Grid.Column textAlign='center'>
                          <Segment padded='very' style={{borderTop: '4px solid #00b5ad', borderRadius: '10px'}}>
                              <Icon name='student' size='huge' color='teal' style={{marginBottom: '20px'}} />
                              <Header as='h3'>Sinh viên</Header>
                          </Segment>
                      </Grid.Column>
                      <Grid.Column textAlign='center'>
                          <Segment padded='very' style={{borderTop: '4px solid #f2711c', borderRadius: '10px'}}>
                              <Icon name='university' size='huge' color='orange' style={{marginBottom: '20px'}} />
                              <Header as='h3'>Giảng viên</Header>
                          </Segment>
                      </Grid.Column>
                  </Grid>
              </Container>
          </div>
      );
  }

  // --- CÁC GIAO DIỆN ROLE ---
  renderLecturerView() {
      return (
        <Container style={{ marginTop: '40px' }}>
            <div style={{background: 'linear-gradient(to right, #ff9966, #ff5e62)', borderRadius: '15px', padding: '40px', color: 'white', marginBottom: '40px'}}>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={10}><Header as='h2' inverted>Bảng điều khiển Giảng viên</Header></Grid.Column>
                    <Grid.Column width={6} textAlign='right'>
                         <Link route="/test/newtest"><a><Button color='white' inverted size='large'><Icon name='add' /> Tạo Đề Thi Mới</Button></a></Link>
                    </Grid.Column>
                </Grid>
            </div>
            <Header as='h3' dividing>Danh sách bài thi đang quản lý</Header>
            {this.renderExamsCards(true)}
        </Container>
      );
  }

  renderStudentView() {
      return (
        <Container style={{ marginTop: '40px' }}>
            <div style={{background: 'linear-gradient(to right, #00c6ff, #0072ff)', borderRadius: '15px', padding: '40px', color: 'white', marginBottom: '40px'}}>
                 <Header as='h2' inverted>Góc Học Tập</Header>
            </div>
            <Header as='h3' dividing>Bài tập dành cho bạn</Header>
            {this.renderExamsCards(false)}
        </Container>
      );
  }

  renderExamsCards(isLecturer) {
      if (this.props.Instruction.length === 0) {
          return <Message info header='Trống' content='Chưa có dữ liệu bài thi.' />;
      }
      return (
        <Card.Group itemsPerRow={3} stackable>
            {this.props.Instruction.map((details, index) => (
                <Card key={index} href={`/test/at/${details.address}`} fluid raised>
                    {/* SỬA LỖI ẢNH: Dùng picsum.photos ổn định hơn */}
                    <Image src={`https://picsum.photos/seed/${index + 5}/400/250`} style={{height: '160px', objectFit: 'cover'}} />
                    <Card.Content>
                        <Card.Header>{details.instruction}</Card.Header>
                        <Card.Meta>{details.address.substring(0, 10)}...</Card.Meta>
                        <Label color={isLecturer ? 'orange' : 'blue'} size='tiny' style={{marginTop:'5px'}}>{isLecturer ? 'Quản lý' : 'Đang mở'}</Label>
                    </Card.Content>
                    {isLecturer && (
                        <Card.Content extra>
                            <Button basic color='red' icon='trash' fluid onClick={(e) => {e.preventDefault(); this.openConfirm(details.address)}} content='Xóa' />
                        </Card.Content>
                    )}
                </Card>
            ))}
        </Card.Group>
      );
  }

  render() {
    return (
      <Layout>
        {this.state.errorMessage && <Message negative header='Lỗi' content={this.state.errorMessage} />}
        
        {/* LOGIC HIỂN THỊ */}
        {!this.state.userRole && this.renderGuestView()}
        {this.state.userRole === 'lecturer' && this.renderLecturerView()}
        {this.state.userRole === 'student' && this.renderStudentView()}
        
        <Confirm open={this.state.confirmOpen} onCancel={this.closeConfirm} onConfirm={this.handleDelete} />
      </Layout>
    );
  }
}
export default CampaignIndex;