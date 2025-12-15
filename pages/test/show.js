import React, { Component } from 'react';
import { Grid, Button, Icon, Header, Segment, Message, Divider, Label } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/Test';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';

class CampaignShow extends Component {
  state = {
    loading: false, 
    errorMessage: '', 
    isEnrolled: false, 
    walletAddress: null, 
    studentName: '', 
    userRole: ''
  };

  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    // Lấy thông tin cơ bản để hiển thị
    const instruction = await factory.methods.totalinstruction(props.query.address).call();
    const examiner = await campaign.methods.examineradd().call();
    
    // Lấy link đề bài (nếu có)
    let link = '';
    try { link = await campaign.methods.getTestLink().call(); } catch(e) {}

    return {
      address: props.query.address,
      instruction: instruction,
      examiner: examiner,
      testLink: link
    };
  }

  async componentDidMount() {
    try {
        const accounts = await web3.eth.getAccounts();
        if (!accounts[0]) return; // Chưa login

        const role = await factory.methods.getRole(accounts[0]).call();
        // Lấy ví sinh viên (nếu là sinh viên)
        const myWalletAddr = await factory.methods.mywallet().call({ from: accounts[0] });
        
        let enrolled = false;
        // Chỉ kiểm tra enroll nếu là sinh viên và đã có ví
        if (role === 'student' && myWalletAddr && myWalletAddr !== '0x0000000000000000000000000000000000000000') {
            const campaign = Campaign(this.props.address);
            enrolled = await campaign.methods.attende(myWalletAddr).call();
        }
        
        this.setState({ walletAddress: myWalletAddr, isEnrolled: enrolled, userRole: role });
    } catch (e) { console.error(e); }
  }

  onEnroll = async () => {
    this.setState({ loading: true, errorMessage: '' });
    try {
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(this.props.address);
        
        if (!this.state.walletAddress || this.state.walletAddress === '0x0000000000000000000000000000000000000000') {
            throw new Error("Bạn chưa tạo Ví Sinh viên. Hãy quay lại trang chủ để tạo.");
        }

        // Gọi hàm đăng ký
        await campaign.methods.enrollintest(this.state.walletAddress).send({ from: accounts[0] });
        
        // Reload để cập nhật trạng thái nút bấm
        window.location.reload();
    } catch (err) { this.setState({ errorMessage: err.message }); }
    this.setState({ loading: false });
  };

  renderSidebar() {
      const { userRole, isEnrolled, loading } = this.state;

      // --- GIAO DIỆN GIẢNG VIÊN ---
      if (userRole === 'lecturer') {
          return (
            <Segment style={{boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none', padding: '20px'}}>
                <Header as='h4'>Công cụ Giảng viên</Header>
                <Link route={`/test/at/${this.props.address}/response`}>
                    <a><Button color='orange' fluid style={{marginBottom: '10px'}} icon labelPosition='left'>
                        <Icon name='check square' /> Chấm bài Sinh viên
                    </Button></a>
                </Link>
                <Link route={`/test/at/${this.props.address}/addnew`}>
                    <a><Button basic fluid>Chỉnh sửa đề</Button></a>
                </Link>
            </Segment>
          );
      }

      // --- GIAO DIỆN SINH VIÊN ---
      if (userRole === 'student') {
        return (
            <Segment style={{boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none', padding: '20px', textAlign: 'center'}}>
                {isEnrolled ? (
                    // 1. ĐÃ THAM GIA -> HIỆN NÚT VÀO NỘP BÀI
                    <div>
                        <Header as='h3' style={{color: '#21ba45'}}>
                            <Icon name='check circle' /> Đã tham gia
                        </Header>
                        <p style={{color: '#666'}}>Bạn có thể bắt đầu làm bài.</p>
                        <Link route={`/test/at/${this.props.address}/attempt`}>
                            <a>
                                <Button primary fluid size='huge' icon labelPosition='left'>
                                    <Icon name='cloud upload' /> VÀO NỘP BÀI
                                </Button>
                            </a>
                        </Link>
                    </div>
                ) : (
                    // 2. CHƯA THAM GIA -> HIỆN NÚT ĐĂNG KÝ
                    <div>
                        <Header as='h3' style={{color: '#0056D2'}}>Tham gia khóa học</Header>
                        <p style={{color: '#666'}}>Đăng ký để mở khóa bài nộp.</p>
                        <Button 
                            color='teal' fluid size='large' 
                            onClick={this.onEnroll} loading={loading}
                        >
                            Đăng Ký Tham Gia
                        </Button>
                    </div>
                )}
            </Segment>
        );
      }
      return null;
  }

  render() {
    return (
      <Layout>
        <div style={{ marginBottom: '20px' }}>
            <Link route="/test/test"><a><Button basic icon='arrow left' content='Quay lại Dashboard' /></a></Link>
        </div>
        {this.state.errorMessage && <Message negative header='Lỗi' content={this.state.errorMessage} />}
        
        <Grid>
            <Grid.Column width={11}>
                {/* HIỂN THỊ ĐỀ BÀI */}
                <Segment raised style={{ padding: '40px', background: 'white', borderTop: '4px solid #6366f1' }}>
                    <Label color='violet' ribbon style={{marginBottom: '15px'}}>Đề bài</Label>
                    <Header as='h1' style={{ fontSize: '2.5em', marginTop: '0' }}>{this.props.instruction}</Header>
                    
                    <div style={{marginTop: '20px', padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #eee'}}>
                        <Header as='h4'>Link tài liệu / Đề thi:</Header>
                        {this.props.testLink ? (
                            <a href={this.props.testLink} target="_blank" style={{fontSize: '1.2em', fontWeight: 'bold', color: '#0056D2'}}>
                                {this.props.testLink} <Icon name='external alternate' />
                            </a>
                        ) : <span style={{color:'red'}}>Giảng viên chưa cập nhật link đề bài.</span>}
                    </div>
                </Segment>
            </Grid.Column>
            
            <Grid.Column width={5}>
                {/* SIDEBAR HÀNH ĐỘNG */}
                {this.renderSidebar()}
            </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}
export default CampaignShow;