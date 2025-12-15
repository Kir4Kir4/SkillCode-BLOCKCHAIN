import React, { Component } from 'react';
import { Form, Input, Message, Button, Icon } from 'semantic-ui-react';
import Campaign from '../ethereum/Test';
import web3 from '../ethereum/web3';
import { Router } from '../routes';
import factory from '../ethereum/factory'; // Import Factory để lấy ví

class ContributeForm extends Component {
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
      
      // 1. Lấy địa chỉ Ví Sinh viên
      const myWallet = await factory.methods.mywallet().call({ from: accounts[0] });
      
      // 2. Gửi câu trả lời
      // Hàm answermytest(walletAddr, index, answer)
      await campaign.methods.answermytest(
          myWallet, 
          this.props.id, // Index câu hỏi
          this.state.value
      ).send({
        from: accounts[0]
      });

      // Reload lại trang hiện tại
      Router.replaceRoute(`/test/at/${this.props.address}/attempt`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            placeholder="Nhập câu trả lời của bạn..."
            action={{
                color: 'teal',
                labelPosition: 'right',
                icon: 'send',
                content: 'Gửi',
                loading: this.state.loading
            }}
          />
        </Form.Field>
        <Message error header="Lỗi!" content={this.state.errorMessage} />
      </Form>
    );
  }
}

export default ContributeForm;