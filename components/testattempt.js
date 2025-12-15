import React, { Component } from 'react';
import { Card, Header, Label } from 'semantic-ui-react';
import factory from '../ethereum/factory'; // Sửa import
import ContributeForm from './answer';

class Attempt extends Component {
  renderCards() {
    // props.questionset: Mảng các câu hỏi (được truyền từ trang cha)
    return this.props.questionset.map((question, index) => {
        return (
            <Card fluid key={index} style={{marginBottom: '20px'}}>
                <Card.Content style={{backgroundColor: '#f8fafc'}}>
                    <Header as='h4'>
                        <Label circular color='blue' style={{marginRight: '10px'}}>{index + 1}</Label>
                        {question}
                    </Header>
                </Card.Content>
                <Card.Content extra>
                    {/* Truyền ID câu hỏi vào Form trả lời */}
                    <ContributeForm address={this.props.address} id={index} />
                </Card.Content>
            </Card>
        );
    });
  }

  render() {
    return (
      <div>
        {this.renderCards()}
      </div>
    );
  }
}

export default Attempt;