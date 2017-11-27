// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label, DataBox, StarIcon, Checkbox, LinkStyle2, LinkAndButtonBox, ServiceBox, Button } from 'components'
import { font } from 'styled-theme'

import { Link} from 'react-router-dom'
import api from '../../../api'
import auth from '../../../auth'
import utils from '../../../utils'

const Wrapper = styled.div`
  background-color: #F9FAFC;
  width: calc(100vw - 15px);
  display: flex;
  justify-content: center;
  
  align-self: center;
`

const InnerWrapper = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`

const HeaderBlock = styled.div`
    align-self: flex-start;
    margin: 36px 0 24px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const PicBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 0 24px 0;
`

const TrainerPic = styled.div`
    height: 40vh;
    width: 56.32vh;
    margin: 0 24px 0 0;
    background-color: #C4C4C4;
    ${props => props.image ? `content: url(${'/user' + props.image + '.jpg'})` : ''}
`

const LRBlock = styled.div`
    display:flex;
    flex-flow: column;
    flex: 1;
`

const FooterBlock = styled.div`
    margin: 64px 0 0 0;
    display:flex;
`

const queryString = require('query-string');
const parsed = queryString.parse(location.search)

class UserPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        userName: this.props.match.params.user,
        trainer: '',
        service: '',
    };
  }

  componentDidMount() {
    // console.log(this.state.userName)
    api.getUserByUsername(this.state.userName)
    .then((res)=>{
        this.setState({trainer: res});
        api.getServiceOfTrainer(this.state.trainer._id)
        .then((res2)=>{
            this.setState({service: res2});
        })
        
    })
  }

  onClick = e => {
    this.props.history.push('/')
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    var starBox = []
    for (var i = 0 ; i < this.state.trainer.rating ; i++)
    starBox.push(<StarIcon key={i} height="40px"/>)
    var resultFeed = []
    if(this.state.trainer.role == 'Trainer') {
        for (var i = 0 ; i < this.state.service.length ; i++) {
            resultFeed.push(<ServiceBox service={this.state.service[i]} key={i}/>)
        }
    }
    return (
      <Wrapper>
        <Topbar color={color}/>
        <InnerWrapper >
            <HeaderBlock>
                <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">ข้อมูลผู้ใช้งาน</Label>
                {starBox}
            </HeaderBlock>
            <PicBlock>
                <TrainerPic image={this.state.trainer._id} />
            </PicBlock>
            <DataBox style={{marginBottom: "16px"}} textTitle="ชื่อผู้งาน" textDetail={this.state.trainer.username} color={color}/>
            <DataBox styled={{marginTop: "16px"}} textTitle="ชื่อจริง" textDetail={this.state.trainer.firstName}  color={color}/>
            <DataBox textTitle="นามสกุล" textDetail={this.state.trainer.lastName}  color={color}/>
            <DataBox textTitle="ประเภทผู้ใช้งาน" textDetail={this.state.trainer.role}  color={color}/>
            <DataBox styled={{marginTop: "16px"}} textTitle="เพศ" textDetail={utils.getGenderText(this.state.trainer.gender)}  color={color}/>
            <DataBox textTitle="อีเมล" textDetail={this.state.trainer.email}  color={color}/>
            <DataBox textTitle="เบอร์โทรศัพท์" textDetail={this.state.trainer.telephoneNumber}  color={color}/>
            <DataBox textTitle="ที่อยู่อาศัย" textDetail={this.state.trainer.address}  color={color}/>
            {this.state.trainer.role == 'Trainer' && <Label style={{margin: "24px 0 8px 24px"}} size="20px" weight="normal" color="rgba(84, 84, 84, 0.8)">บริกาารที่สร้าง</Label>}
            {this.state.trainer.role == 'Trainer' && resultFeed}
            <Button onClick={this.onClick} color={color} style={{alignSelf: "center", marginTop: "24px"}} height="40px" width="170px" size="20px">กลับสู่หน้าหลัก</Button>
            <Footer color={color} />
        </InnerWrapper>
    
        }
        
      </Wrapper>
    )
  }
}
export default UserPage
