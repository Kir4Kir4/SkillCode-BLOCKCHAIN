import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message, Icon, Segment, Header } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        instructions : '',
        testLink: '', // Biến lưu link
        errorMessage: '',
        loading: false,
        isLecturer: false
    };

    async componentDidMount() {
        try {
            const accounts = await web3.eth.getAccounts();
            const role = await factory.methods.getRole(accounts[0]).call();
            if (role !== 'lecturer') {
                alert("Bạn không phải là Giảng viên! Bạn không có quyền tạo bài thi.");
                Router.pushRoute('/test/test');
            } else {
                this.setState({ isLecturer: true });
            }
        } catch(e) {}
    }

    onSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        
        try {
            const accounts = await web3.eth.getAccounts();
            
            // Gọi hàm tạo test với 2 tham số string
            await factory.methods.creatorTest(this.state.instructions, this.state.testLink).send({
                from: accounts[0]
            });

            Router.pushRoute('/test/test');
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    };
    
    render() {
    if (!this.state.isLecturer) return <Layout><div>Đang kiểm tra quyền...</div></Layout>;

    return (
    <Layout>
        <Segment placeholder textAlign='center'>
            <Header icon>
                <Icon name='add circle' color='green' />
                Tạo Đề Thi Mới
            </Header>
            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Tên bài thi / Mô tả ngắn</label>
                        <Input 
                            value={this.state.instructions}
                            onChange={event => this.setState({ instructions : event.target.value })}
                            placeholder="Ví dụ: Kiểm tra cuối kỳ môn Mạng máy tính"
                            required
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Đường dẫn đến đề bài (Google Docs, Slides, PDF Link...)</label>
                        <Input 
                            icon='linkify'
                            iconPosition='left'
                            value={this.state.testLink}
                            onChange={event => this.setState({ testLink : event.target.value })}
                            placeholder="https://docs.google.com/..."
                            required
                        />
                    </Form.Field>

                    <Message error header="Lỗi!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary fluid size='large'>
                        <Icon name='cloud upload' /> Tạo Bài Thi
                    </Button>
                </Form>
            </div>
        </Segment>
      </Layout>
    );
  }
}

export default CampaignNew;