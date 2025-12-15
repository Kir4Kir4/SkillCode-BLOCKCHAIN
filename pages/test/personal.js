import React, { Component } from 'react';
import { Card, Grid, Button, Icon, Header, Segment, Label } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/Test';
import factory from '../../ethereum/factory';
import { Link } from '../../routes';
// Import Form chấm điểm
import ProbForm from '../../components/prob'; 

class PersonalResponse extends Component {
  static async getInitialProps(props) {
    const { address, personal } = props.query;
    const campaign = Campaign(address);
    const questionCount = await campaign.methods.numberofQ().call();
    
    // Lấy tên sinh viên để hiển thị cho đẹp
    let studentName = "Sinh viên";
    try {
        studentName = await factory.methods.myname(personal).call();
    } catch(e) {}

    const responses = [];
    for(let i = 0; i < questionCount; i++){
      // Lấy chi tiết câu trả lời và điểm số
      const detail = await campaign.methods.sendresponse(personal, i).call();
      responses.push({
        question: detail[0],
        answer: detail[1],
        score: detail[2] // Điểm hiện tại (nếu có)
      });
    }

    return { address, personal, responses, studentName };
  }

  renderResponses() {
    return this.props.responses.map((item, index) => (
        <Card fluid key={index} style={{ marginBottom: '20px', borderTop: '3px solid #6366f1' }}>
            <Card.Content>
                <Header as='h4' color='violet'>
                    <Label circular color='blue' style={{marginRight: '10px'}}>{index + 1}</Label>
                    {item.question}
                </Header>
                <Card.Description style={{ marginTop: '15px', fontSize: '1.1em' }}>
                    <strong>Trả lời:</strong> 
                    <p style={{ color: '#334155', padding: '10px', background: '#f8fafc', borderRadius: '5px' }}>
                        {item.answer || <span style={{color:'red', fontStyle:'italic'}}>Chưa trả lời</span>}
                    </p>
                </Card.Description>
            </Card.Content>
            
            <Card.Content extra>
                <div style={{ marginBottom: '10px' }}>
                    <Icon name='trophy' color='yellow' /> Điểm hiện tại: <strong>{item.score == -1 ? "Chưa chấm" : item.score}</strong>
                </div>
                
                {/* Form chấm điểm cho từng câu */}
                <ProbForm 
                    address={this.props.address} 
                    personal={this.props.personal} 
                    id={index} // Index câu hỏi để contract biết đang chấm câu nào
                />
            </Card.Content>
        </Card>
    ));
  }

  render() {
    return (
      <Layout>
        <Segment color='violet' inverted style={{ marginTop: '20px' }}>
            <Header as='h2' inverted>
                <Icon name='student' />
                <Header.Content>
                    Bài làm của: {this.props.studentName}
                    <Header.Subheader style={{ color: '#e2e8f0', fontFamily: 'monospace' }}>
                        Ví: {this.props.personal}
                    </Header.Subheader>
                </Header.Content>
            </Header>
        </Segment>

        <div style={{ marginBottom: '20px' }}>
            <Link route={`/test/at/${this.props.address}/response`}>
                <a><Button basic icon='arrow left' content='Quay lại danh sách' /></a>
            </Link>
        </div>

        <Grid>
            <Grid.Column width={16}>
                {this.renderResponses()}
            </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default PersonalResponse;