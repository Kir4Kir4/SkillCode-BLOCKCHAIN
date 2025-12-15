import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/Test';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ProbForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      
      // Gọi hàm addProbe(studentWallet, questionIndex, marks)
      // props.personal: Địa chỉ ví sinh viên cần chấm
      // props.id: Index câu hỏi
      await campaign.methods.addProbe(
          this.props.personal, 
          this.props.id, 
          parseInt(this.state.value)
      ).send({
        from: accounts[0] // Giảng viên gửi
      });

      // Reload trang
      Router.replaceRoute(`/test/at/${this.props.address}/res/${this.props.personal}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} style={{marginTop: '10px'}}>
        <Form.Group>
            <Form.Input
                width={10}
                value={this.state.value}
                onChange={event => this.setState({ value: event.target.value })}
                placeholder="Điểm số (0-10)"
                type="number"
            />
            <Button width={6} color='orange' loading={this.state.loading} disabled={!this.state.value}>
                Chấm điểm
            </Button>
        </Form.Group>
        <Message error header="Lỗi!" content={this.state.errorMessage} />
      </Form>
    );
  }
}

export default ProbForm;