import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/Test';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Form, Button, Message, Segment, Header, Icon, Input, Container } from 'semantic-ui-react';
import { Router, Link } from '../../routes';

class AttemptPage extends Component {
  state = {
      submissionLink: '', // Link bài làm
      loading: false,
      errorMessage: '',
      myWallet: '',
      score: 0,
      isGraded: false
  };

  static async getInitialProps(props) {
    return { address: props.query.address };
  }

  async componentDidMount() {
      try {
          const accounts = await web3.eth.getAccounts();
          const myWallet = await factory.methods.mywallet().call({ from: accounts[0] });
          const campaign = Campaign(this.props.address);
          
          // Lấy dữ liệu bài làm và điểm số từ Blockchain
          const submittedLink = await campaign.methods.getSubmission(myWallet).call();
          const score = await campaign.methods.getScore(myWallet).call();
          const isGraded = await campaign.methods.isGraded(myWallet).call();

          this.setState({ 
              myWallet, 
              submissionLink: submittedLink, 
              score: score, 
              isGraded: isGraded 
          });
      } catch(e) {}
  }

  onSubmit = async (event) => {
      event.preventDefault();
      this.setState({ loading: true, errorMessage: '' });
      try {
          const accounts = await web3.eth.getAccounts();
          const campaign = Campaign(this.props.address);
          
          // GỌI HÀM NỘP BÀI (Lưu link vào contract)
          await campaign.methods.submitAssignment(this.state.myWallet, this.state.submissionLink).send({
              from: accounts[0]
          });
          
          alert("Nộp bài thành công!");
          window.location.reload();
      } catch (err) {
          this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
  }

  render() {
    return (
      <Layout>
        <Link route={`/test/at/${this.props.address}`}>
            <a><Button basic icon='arrow left' content='Quay lại đề bài' style={{marginBottom:'20px'}} /></a>
        </Link>

        <Container text>
            <Segment placeholder style={{boxShadow: '0 8px 20px rgba(0,0,0,0.1)', borderRadius: '15px', background: 'white'}}>
                <Header icon textAlign='center'>
                    <Icon name='cloud upload' color='teal' />
                    Nộp Bài Làm
                    <Header.Subheader>
                        Dán đường dẫn bài làm của bạn (Google Docs, Drive, Slides...) vào bên dưới để giảng viên chấm điểm.
                    </Header.Subheader>
                </Header>
                
                {this.state.isGraded ? (
                    // TRƯỜNG HỢP 1: ĐÃ ĐƯỢC CHẤM ĐIỂM
                    <Message positive icon>
                        <Icon name='trophy' color='yellow'/>
                        <Message.Content>
                            <Message.Header style={{fontSize: '1.5em', color: '#21ba45'}}>Kết quả: {this.state.score} / 10</Message.Header>
                            <div style={{marginTop: '10px'}}>
                                <p>Bài làm của bạn đã được chấm.</p>
                                <p>Link bài đã nộp: <a href={this.state.submissionLink} target="_blank">{this.state.submissionLink}</a></p>
                            </div>
                        </Message.Content>
                    </Message>
                ) : (
                    // TRƯỜNG HỢP 2: CHƯA CHẤM -> HIỆN FORM NỘP
                    <div style={{ padding: '0 40px 30px 40px' }}>
                        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                            <Form.Field>
                                <label style={{fontSize: '1.1em'}}>Đường dẫn bài làm:</label>
                                <Input 
                                    fluid 
                                    size='large' 
                                    icon='linkify' 
                                    iconPosition='left' 
                                    placeholder='Ví dụ: https://docs.google.com/document/d/...' 
                                    value={this.state.submissionLink} 
                                    onChange={event => this.setState({ submissionLink: event.target.value })} 
                                />
                            </Form.Field>

                            <Message error header="Lỗi xảy ra" content={this.state.errorMessage} />
                            
                            <Button primary fluid size='large' loading={this.state.loading} disabled={this.state.loading} style={{marginTop: '15px'}}>
                                <Icon name='send' /> {this.state.submissionLink ? "Cập nhật bài nộp" : "Nộp Bài Ngay"}
                            </Button>
                        </Form>

                        {this.state.submissionLink && (
                            <Message info size='small' style={{marginTop: '20px'}}>
                                <p><Icon name='info circle' /> Bạn đã nộp bài. Có thể cập nhật lại link khác trước khi giảng viên chấm.</p>
                            </Message>
                        )}
                    </div>
                )}
            </Segment>
        </Container>
      </Layout>
    );
  }
}
export default AttemptPage;