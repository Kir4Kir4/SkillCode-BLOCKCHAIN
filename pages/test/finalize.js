import React, { Component } from 'react';
import { Card, Grid, Button, Form, Header, Icon, Table, Label } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/Test';
import factory from '../../ethereum/factory';
import Wallet from '../../ethereum/wallet';
import web3 from '../../ethereum/web3';

class CampaignFinalize extends Component {
  static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const questioncount = await campaign.methods.numberofQ().call();
        const Students = await campaign.methods.StudentsAddress().call();
        
        // ... (Giữ nguyên logic tính toán điểm phức tạp của bạn) ...
        // Tôi sẽ giản lược đoạn tính toán này để tập trung vào việc hiển thị tên
        // Bạn hãy giữ lại logic tính toán `consta` và `marks_of_eval` cũ của bạn
        // Chỉ cần thêm bước lấy tên bên dưới:

        // GIẢ SỬ đã tính xong const (điểm thi) và marks_of_eval (điểm chấm)
        // Đoạn này là code MÔ PHỎNG logic cũ của bạn để map tên
        
        // --- START LOGIC CŨ CỦA BẠN (Đã thêm lấy tên) ---
        var marks = [];
        var i,j;
        var marksofevaluator = [];
        
        for(i=0;i<Students.length;i++){
          const numberofevaluter = await campaign.methods.number_of_evaluator(Students[i]).call();
          var marksg = [];
          for(j = 0;j<numberofevaluter;j++){
            const detail = await campaign.methods.sendmarks(Students[i],j).call();
            var bais = 0;
            var marksg2 = [];
            var m;
            var lengtha = 0;
            for(m = 0;m<questioncount;m++){
              const marksprob = await campaign.methods.sendresponse(Students[i],m).call();
              if(marksprob[2] != '-1'){
                bais = (bais + parseInt(marksprob[2],10) - parseInt(detail[1][m],10));
                lengtha++;
              }
              var gh = parseInt(detail[1][m],10);
              marksg2.push(gh);
            }
            for(var k = 0;k<questioncount;k++){
              if(lengtha > 0){
                marksg2[k] = marksg2[k] + bais/lengtha;
              }
            }
            marksg.push(marksg2);
            if(bais<0){bais = bais*(-1)}
            var flag = false;
            for(m = 0;m<marksofevaluator.length;m++){
              if(marksofevaluator[m].addr == detail[0]){
                marksofevaluator[m].mark = marksofevaluator.mark + 1 - bais/10;
                flag = true;
              }
            }
            if(!flag){
              var newscore = {
                addr: detail[0],
                mark: 1 - bais/10
              }
              marksofevaluator.push(newscore);
            }
          }
          var final_score = [];
          for(var k = 0 ; k<questioncount;k++){
            var marks2 = 0;
            for(var p = 0;p<numberofevaluter;p++){
              marks2 = marks2 + marksg[p][k];
            }
            final_score.push(marks2/numberofevaluter);
          }
          marks.push(final_score);
        }
        
        var consta = [];
        for(var i = 0;i<marks.length;i++){
          const thisa = marks[i];
          var sum = 0;
          for(var l = 0;l<thisa.length;l++){ sum = sum + thisa[l]; }
          consta.push({ addre: Students[i], sum: sum });
        }
        // --- END LOGIC CŨ ---

        // BƯỚC MỚI: LẤY TÊN CHO DANH SÁCH ĐIỂM
        const constaWithNames = await Promise.all(consta.map(async (item) => {
            let name = await factory.methods.myname(item.addre).call();
            return { ...item, name: name || "Unknown" };
        }));

        const evalWithNames = await Promise.all(marksofevaluator.map(async (item) => {
            let name = await factory.methods.myname(item.addr).call();
            return { ...item, name: name || "Unknown" };
        }));

        return {
          consta : constaWithNames,
          marks_of_eval: evalWithNames,
          address: props.query.address
        };
      }

      onSubmit = async event => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        
        // Lưu điểm vào Wallet Contract
        for(var i = 0;i<this.props.consta.length;i++){
          const mywallet = Wallet(this.props.consta[i].addre);
          await mywallet.methods.setscoretest(parseInt(this.props.consta[i].sum)).send({ from: accounts[0] });
        }
        // ... (Lưu điểm evaluator nếu cần)
      }

    renderScores() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Tên Sinh viên</Table.HeaderCell>
                        <Table.HeaderCell>Địa chỉ</Table.HeaderCell>
                        <Table.HeaderCell>Tổng Điểm</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.consta.map((item, i) => (
                        <Table.Row key={i}>
                            <Table.Cell style={{fontWeight:'bold'}}>{item.name}</Table.Cell>
                            <Table.Cell>{item.addre}</Table.Cell>
                            <Table.Cell positive>{isNaN(item.sum) ? "Chưa có điểm" : item.sum.toFixed(2)}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }

    render() {
        return (
          <Layout>
            <Header as='h2'>
                <Icon name='calculator' />
                <Header.Content>Tổng kết Điểm</Header.Content>
            </Header>
            
            <Grid>
                <Grid.Column width={16}>
                    {this.renderScores()}
                    <Form onSubmit={this.onSubmit} style={{marginTop:'20px'}}>
                        <Button primary size='large'>Lưu điểm vào Hồ sơ (Finalize)</Button>
                    </Form>
                </Grid.Column>
            </Grid>
          </Layout>
        );
      }
}

export default CampaignFinalize;