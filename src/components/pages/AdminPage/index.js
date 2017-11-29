// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label, Button2, Checkbox, LinkStyle, LinkStyle2, LinkAndButtonBox, CheckBoxAndLabel, ServiceBox2, ServiceBox3, ReportBox, BanBox} from 'components'
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

const LRBlock = styled.div`
    display:flex;
    flex-flow: column;
    align-items: center;
`

const FooterBlock = styled.div`
    margin: 64px 0 0 0;
    display:flex;
`
const ButtonBlock = styled.div`
    margin: 7px 0 0 0;
    display: flex;
`

const ReportList = styled.div`
    margin-Bottom: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const queryString = require('query-string');
const parsed = queryString.parse(location.search)

class AdminPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        reports: '',
        bans: '',
        failure: false,
    };
  }

  getData = () => {
    api.getAllReports()
    .then((res)=>{
      this.setState({reports : res})
    })
    api.getUserByStatus(0)
    .then((res)=>{
        this.setState({bans : res})
    })
  }

  componentDidMount(){
      if(!auth.isAdmin()){
        this.setState({failure : true})
      } else {
        this.getData() 
      }
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
    //let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    let color = "#202020";
    var reports = []
    var reports2 = []
    var bans = []
    for (var i = 0 ; i < this.state.reports.length ; i++){
        if(this.state.reports[i].status==0)
            reports.push(<ReportBox report={this.state.reports[i]} key={i}/>)
        else 
            reports2.push(<ReportBox report={this.state.reports[i]} key={i}/>)
    }
    if(reports.length==0){
        reports.push(<Label style={{margin: "16px 0 16px 0"}} size="24px" weight="600" color="#202020">ไม่มีรายการคำร้องเรียน</Label>)
    }
    if(reports2.length==0){
        reports2.push(<Label style={{margin: "16px 0 16px 0"}} size="24px" weight="600" color="#202020">ไม่มีรายการคำร้องเรียนที่ถูกจัดการแล้ว</Label>)
    }
    if(this.state.bans.length > 0)
    for (var i = 0 ; i < this.state.bans.length ; i++){
        bans.push(<BanBox user={this.state.bans[i]} key={i}/>)
    }
    else {
        bans.push(<Label style={{margin: "16px 0 16px 0"}} size="24px" weight="600" color="#202020">ไม่มีผู้ใช้ที่ถูกแบน</Label>)
    }

    return (
        <Wrapper>
            <Topbar color={color}/>
            {!this.state.failure ?
            <InnerWrapper >
                <Label style={{marginTop : "20px"}}size ="45px" color="#202020">รายการคำร้องเรียน</Label>
                <ReportList>
                    {reports}
                </ReportList>
                <Label size ="45px" color="#202020">รายการคำร้องเรียนที่จัดการแล้ว</Label>
                <ReportList>
                    {reports2}
                </ReportList>
                <Label size ="45px" color="#202020">รายชื่อผู้ใช้ที่ถูกแบน</Label>
                <ReportList>
                    {bans}
                </ReportList>
                <Footer color={color} />
            </InnerWrapper>
            :
            <InnerWrapper >
                <HeaderBlock>
                    <Label size="48px" weight="bolder" color="#202020">เกิดข้อผิดพลาด</Label>
                </HeaderBlock>
                <Footer color={color} />
            </InnerWrapper>
            }
            
        </Wrapper>
        )

  }
}
export default AdminPage
