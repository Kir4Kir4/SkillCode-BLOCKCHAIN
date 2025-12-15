import React, { Component } from 'react';
import { Button, Header, Icon, Segment, Label, Message, Table } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/Test';
import factory from '../../ethereum/factory'; // Cần import factory để lấy tên
import { Link } from '../../routes';

class ResponseIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    let studentList = [];
    
    try {
        const addresses = await campaign.methods.StudentsAddress().call();
        // Lấy tên cho từng sinh viên
        studentList = await Promise.all(addresses.map(async (addr) => {
            let name = "Unknown";
            try {
                name = await factory.methods.myname(addr).call();
            } catch (e) {}
            return { address: addr, name: name || "Chưa đặt tên" };
        }));
    } catch (err) {
        console.log("Error:", err);
    }

    return { address, studentList };
  }

  renderRows() {
    return this.props.studentList.map((student, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell collapsing>
            <Label ribbon color='blue'>{index + 1}</Label>
          </Table.Cell>
          {/* Hiển thị TÊN */}
          <Table.Cell style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
             <Icon name='user circle' color='teal' /> {student.name}
          </Table.Cell>
          <Table.Cell style={{ fontFamily: 'monospace', color: '#888' }}>
            {student.address}
          </Table.Cell>
          <Table.Cell textAlign='right'>
            <Link route={`/test/at/${this.props.address}/res/${student.address}`}>
              <a>
                <Button color='green' size='small' icon labelPosition='right'>
                  Chấm bài
                  <Icon name='check square' />
                </Button>
              </a>
            </Link>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <Layout>
        <Segment placeholder style={{ marginTop: '20px' }}>
            <Header icon>
                <Icon name='file text' color='teal' />
                Danh sách Bài làm
                <Header.Subheader>Chọn sinh viên để chấm điểm</Header.Subheader>
            </Header>
        </Segment>
        <div style={{ marginBottom: '20px' }}>
            <Link route={`/test/at/${this.props.address}`}>
                <a><Button basic icon='arrow left' content='Quay lại' /></a>
            </Link>
        </div>
        <Table celled striped>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>STT</Table.HeaderCell>
                <Table.HeaderCell>Tên Sinh viên</Table.HeaderCell>
                <Table.HeaderCell>Địa chỉ Ví</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>Hành động</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>{this.renderRows()}</Table.Body>
        </Table>
      </Layout>
    );
  }
}

export default ResponseIndex;