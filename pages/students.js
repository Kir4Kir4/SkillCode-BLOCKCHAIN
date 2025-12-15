import React, { Component } from 'react';
import { Container, Header, Table, Icon, Segment, Label, Message } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/Test';

class StudentList extends Component {
  static async getInitialProps() {
    let allStudents = [];
    let errorMessage = '';

    try {
      let campaigns = [];
      if (typeof factory.methods.getDeployedCampaigns === 'function') {
         campaigns = await factory.methods.getDeployedCampaigns().call();
      }

      for (const address of campaigns) {
        const campaign = Campaign(address);
        try {
          const students = await campaign.methods.StudentsAddress().call();
          
          // Lấy tên cho từng địa chỉ
          const studentsWithNames = await Promise.all(students.map(async (studentAddr) => {
              let name = "Không xác định";
              try {
                  name = await factory.methods.myname(studentAddr).call();
              } catch(e) {}
              
              return {
                  studentAddress: studentAddr,
                  name: name || "Chưa đặt tên",
                  classAddress: address
              };
          }));

          allStudents = [...allStudents, ...studentsWithNames];
        } catch (err) {
          console.log(`Lỗi lớp ${address}:`, err.message);
        }
      }
    } catch (err) {
      errorMessage = err.message;
    }

    return { allStudents, errorMessage };
  }

  renderRows() {
    return this.props.allStudents.map((student, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell collapsing>
            <Label ribbon color='blue'>{index + 1}</Label>
          </Table.Cell>
          {/* HIỂN THỊ TÊN */}
          <Table.Cell style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
            <Icon name='user' /> {student.name}
          </Table.Cell>
          <Table.Cell style={{ fontFamily: 'monospace', color: 'grey' }}>
            {student.studentAddress}
          </Table.Cell>
          <Table.Cell>
            <Label basic color='violet' horizontal>{student.classAddress}</Label>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <Layout>
        <Container style={{ marginTop: '40px' }}>
            <Header as='h2' style={{ marginBottom: '30px' }}>
                <Icon name='users' color='blue' />
                <Header.Content>Danh sách Sinh viên</Header.Content>
            </Header>
            {this.props.errorMessage && <Message negative content={this.props.errorMessage} />}
            <Segment>
                <Table celled selectable striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>STT</Table.HeaderCell>
                            <Table.HeaderCell>Họ và Tên</Table.HeaderCell>
                            <Table.HeaderCell>Địa chỉ Ví</Table.HeaderCell>
                            <Table.HeaderCell>Mã Lớp</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.allStudents && this.props.allStudents.length > 0 ? (
                            this.renderRows()
                        ) : (
                            <Table.Row><Table.Cell colSpan='4' textAlign='center'>Chưa có sinh viên.</Table.Cell></Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Segment>
        </Container>
      </Layout>
    );
  }
}

export default StudentList;