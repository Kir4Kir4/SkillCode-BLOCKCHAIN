import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message, Icon, Segment, Header, Dropdown } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        name : '',
        role: 'student', // Mặc định là sinh viên
        errorMessage: '',
        loading: false
    };

    roleOptions = [
        { key: 'student', text: 'Sinh viên (Student)', value: 'student', icon: 'student' },
        { key: 'lecturer', text: 'Giảng viên (Lecturer)', value: 'lecturer', icon: 'university' },
    ];

    onSubmit = async event => {
      event.preventDefault();
      this.setState({ loading: true, errorMessage: '' });
      
      try {
        const accounts = await web3.eth.getAccounts();
        
        // Gọi hàm createwallet với 2 tham số: Tên và Vai trò
        await factory.methods.createwallet(String(this.state.name), this.state.role).send({
          from: accounts[0]
        });

        // Điều hướng dựa trên vai trò
        if (this.state.role === 'lecturer') {
            Router.pushRoute('/test/test'); // Giảng viên về trang quản lý bài thi
        } else {
            Router.pushRoute('/students');  // Sinh viên về trang danh sách
        }
        
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false }); 
    };
    
    render() {
      return (
        <Layout>
            <Segment placeholder textAlign='center' style={{ marginTop: '50px' }}>
                <Header icon>
                    <Icon name='id badge' color='violet' />
                    Đăng ký Tài khoản Mới
                </Header>
                <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label>Họ và Tên:</label>
                            <Input 
                                icon='user'
                                iconPosition='left'
                                placeholder="Ví dụ: Nguyễn Văn A"
                                value={this.state.name}
                                onChange={event => this.setState({ name : event.target.value })}
                                required
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Vai trò:</label>
                            <Dropdown
                                placeholder='Chọn vai trò'
                                fluid
                                selection
                                options={this.roleOptions}
                                value={this.state.role}
                                onChange={(e, { value }) => this.setState({ role: value })}
                            />
                        </Form.Field>
                        
                        <Message error header="Lỗi!" content={this.state.errorMessage} />
                        
                        <Button loading={this.state.loading} primary fluid size='large'>
                            <Icon name='check' /> Xác nhận Đăng ký
                        </Button>
                    </Form>
                </div>
            </Segment>
        </Layout>
      );
    }
}

export default CampaignNew;