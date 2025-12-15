import React, { Component } from 'react';
import { Card, Grid, Icon, Statistic, Segment, Header, Divider } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Wallet from '../../ethereum/wallet';
import factory from '../../ethereum/factory';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const wallet = Wallet(props.query.address);
        const scores = await wallet.methods.presentscore().call();
        const myAddress = await wallet.methods.myaddress().call();
        
        // Lấy tên
        let name = "";
        try {
            name = await factory.methods.myname(myAddress).call();
        } catch(e) {}

        return {
            address: props.query.address,
            studentAddress: myAddress,
            studentName: name,
            examScore: scores[0],
            evalScore: scores[1]
        };
    }

    renderCards() {
        return (
            <Grid stackable columns={2}>
                <Grid.Column width={10}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                <Icon name='user' /> {this.props.studentName || "Sinh viên"}
                            </Card.Header>
                            <Card.Meta>Địa chỉ Ví: {this.props.studentAddress}</Card.Meta>
                            <Card.Description>
                                Hồ sơ năng lực được xác thực trên Blockchain.
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Segment textAlign='center' color='violet'>
                        <Header as='h3'>Điểm Tổng Kết</Header>
                        <Divider />
                        <Statistic size='small'>
                            <Statistic.Value>{this.props.examScore}</Statistic.Value>
                            <Statistic.Label>Điểm Thi</Statistic.Label>
                        </Statistic>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }

    render() {
        return (
          <Layout>
            <h3>Hồ sơ Sinh viên</h3>
            {this.renderCards()}
          </Layout>
        );
    }
}
export default CampaignShow;