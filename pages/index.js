import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Container, Header, Button, Icon, Grid, Image, Segment, List } from 'semantic-ui-react';
import { Link } from '../routes';

class SkillCodeLanding extends Component {
  render() {
    return (
      <Layout>
        <Container style={{ marginTop: '60px' }}>
          <Grid stackable columns={2} verticalAlign='middle'>
            
            {/* Cột Trái: Text giới thiệu */}
            <Grid.Column width={9}>
              <Header as='h1' style={{ fontSize: '3.5em', marginBottom: '20px', color: '#f8fafc' }}>
                SkillCode <br/>
                <span style={{ 
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Decentralized Testing</span>
              </Header>
              <p style={{ fontSize: '1.2em', color: '#cbd5e1', lineHeight: '1.6', maxWidth: '95%' }}>
                Nền tảng thi trắc nghiệm và đánh giá năng lực dựa trên Blockchain. 
                Giúp giảng viên tạo đề thi minh bạch và sinh viên nhận chứng chỉ không thể giả mạo.
              </p>
              
              <div style={{ marginTop: '40px' }}>
                <Link route="/campaign/new">
                   <a>
                    <Button size='huge' primary className="primary-btn">
                        <Icon name='rocket' /> Bắt đầu ngay
                    </Button>
                   </a>
                </Link>
                <Link route="/test/test">
                  <a>
                    <Button size='huge' basic inverted style={{ marginLeft: '15px' }}>
                      Xem bài thi
                    </Button>
                  </a>
                </Link>
              </div>
            </Grid.Column>

            {/* Cột Phải: Hình ảnh (Đã thay link ảnh ổn định) */}
            <Grid.Column width={7}>
              <Image 
                // Sử dụng ảnh minh họa blockchain education
                src='https://cdn-icons-png.flaticon.com/512/5903/5903254.png' 
                size='large' 
                floated='right'
                style={{ 
                    filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.4))',
                    maxWidth: '80%'
                }}
              />
            </Grid.Column>
          </Grid>

          {/* --- Phần thông tin chi tiết dự án --- */}
          <Grid stackable columns={2} style={{ marginTop: '80px' }}>
              <Grid.Column>
                  <Segment className="glass-panel" style={{ padding: '30px', height: '100%' }}>
                      <Header as='h3' style={{ color: '#818cf8' }}>
                          <Icon name='info circle' /> Về Dự Án
                      </Header>
                      <p style={{ color: '#cbd5e1', fontSize: '1.1em' }}>
                          Dự án SkillCode được phát triển nhằm giải quyết vấn đề gian lận và thiếu minh bạch trong thi cử truyền thống. 
                          Bằng cách sử dụng Smart Contract trên mạng lưới Ethereum, chúng tôi đảm bảo:
                      </p>
                      <List bulleted style={{ color: '#94a3b8', fontSize: '1.1em' }}>
                          <List.Item>Đề thi được mã hóa và bảo mật.</List.Item>
                          <List.Item>Điểm số được chấm tự động và lưu trữ vĩnh viễn.</List.Item>
                          <List.Item>Sinh viên sở hữu dữ liệu điểm số của chính mình.</List.Item>
                      </List>
                  </Segment>
              </Grid.Column>

              <Grid.Column>
                  <Segment className="glass-panel" style={{ padding: '30px', height: '100%' }}>
                      <Header as='h3' style={{ color: '#c084fc' }}>
                          <Icon name='cogs' /> Công nghệ sử dụng
                      </Header>
                      <List relaxed>
                          <List.Item>
                              <Icon name='ethereum' size='large' style={{ color: '#818cf8' }} />
                              <List.Content>
                                  <List.Header style={{ color: 'white' }}>Ethereum & Solidity</List.Header>
                                  <List.Description style={{ color: '#94a3b8' }}>Xử lý logic thi cử và lưu trữ</List.Description>
                              </List.Content>
                          </List.Item>
                          <List.Item>
                              <Icon name='react' size='large' style={{ color: '#61dafb' }} />
                              <List.Content>
                                  <List.Header style={{ color: 'white' }}>Next.js & React</List.Header>
                                  <List.Description style={{ color: '#94a3b8' }}>Giao diện người dùng Server-side Rendering</List.Description>
                              </List.Content>
                          </List.Item>
                          <List.Item>
                              <Icon name='paint brush' size='large' style={{ color: '#2dd4bf' }} />
                              <List.Content>
                                  <List.Header style={{ color: 'white' }}>Semantic UI</List.Header>
                                  <List.Description style={{ color: '#94a3b8' }}>Thiết kế giao diện hiện đại</List.Description>
                              </List.Content>
                          </List.Item>
                      </List>
                  </Segment>
              </Grid.Column>
          </Grid>

        </Container>
      </Layout>
    );
  }
}

export default SkillCodeLanding;