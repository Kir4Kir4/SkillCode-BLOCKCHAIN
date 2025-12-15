import React, { Component } from 'react';
import { Form, Button, Input, Message, Card, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/Test';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignEdit extends Component {
    state = {
        question : '',
        errorMessage: '',
        loading: false,
        finalizeLoading: false
    };
    
    static async getInitialProps(props) {
        const { address } = props.query;
        // Logic lấy danh sách câu hỏi hiện tại có thể thêm ở đây nếu cần
        return { address };
    }

    // Hàm thêm câu hỏi
    onSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        try {
            const campaign = Campaign(this.props.address);
            const accounts = await web3.eth.getAccounts();
            
            await campaign.methods.addQuestion(String(this.state.question)).send({
                from: accounts[0]
            });
            
            // Reload trang để cập nhật
            Router.replaceRoute(`/test/at/${this.props.address}/addnew`);
            this.setState({ question: '' }); // Reset input
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    };

    // Hàm chuyển sang trang chấm điểm (Finalize)
    onFinalize = async () => {
        this.setState({ finalizeLoading: true });
        try {
            const campaign = Campaign(this.props.address);
            const accounts = await web3.eth.getAccounts();
            const examiner = await campaign.methods.examineradd().call();
            
            if(examiner == accounts[0]){
                Router.pushRoute(`/test/at/${this.props.address}/finalize`);
            } else {
                alert("Bạn không phải là Giám khảo của bài thi này!");
            }
        } catch (err) {
            alert(err.message);
        }
        this.setState({ finalizeLoading: false });
    }

    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Column width={10}>
                        <Header as='h2'>
                            <Icon name='edit' />
                            <Header.Content>
                                Quản lý Đề thi
                                <Header.Subheader>Thêm câu hỏi mới vào bài thi</Header.Subheader>
                            </Header.Content>
                        </Header>
                        
                        <Segment>
                            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                                <Form.Field>
                                    <label>Nội dung câu hỏi</label>
                                    <Input 
                                        placeholder="Nhập câu hỏi tại đây..."
                                        value={this.state.question}
                                        onChange={event => this.setState({ question : event.target.value })}
                                    />
                                </Form.Field>
                                <Message error header="Lỗi!" content={this.state.errorMessage} />
                                <Button loading={this.state.loading} primary icon labelPosition='left'>
                                    <Icon name='plus' /> Thêm câu hỏi
                                </Button>
                            </Form>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <Segment color='violet'>
                            <Header as='h4'>Công cụ Giám khảo</Header>
                            <p>Sau khi sinh viên hoàn thành bài thi, bạn có thể tiến hành chấm điểm và tổng kết.</p>
                            <Button 
                                color='green' 
                                onClick={this.onFinalize} 
                                loading={this.state.finalizeLoading}
                                fluid
                            >
                                Tổng kết điểm (Finalize)
                            </Button>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignEdit;