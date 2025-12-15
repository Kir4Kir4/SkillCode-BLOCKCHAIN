import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/Test';
import web3 from '../ethereum/web3';
import { Router } from '../routes';
import factory from '../ethereum/factory';

class EnrollForm extends Component {
  state = {
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      // Lấy ví sinh viên
      const myWallet = await factory.methods.mywallet().call({ from: accounts[0] });
      
      const campaign = Campaign(this.props.address);
      
      await campaign.methods.enrollintest(myWallet).send({
        from: accounts[0]
      });

      Router.replaceRoute(`/test/at/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Message error header="Lỗi" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading} content="Đăng ký tham gia (Enroll)" />
      </Form>
    );
  }
}

export default EnrollForm;