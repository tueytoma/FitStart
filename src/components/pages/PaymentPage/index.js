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

class PaymentPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        results: '',
        failure: false,
    };
  }

  getReservationList = (status) => {
    api.getReservationByStatus(status)
    .then((res)=>{
      this.setState({results : res})
    })
  }

  componentDidMount(){
      if(!auth.isAdmin()){
        this.setState({failure : true})
      } else {
        this.getReservationList(this.props.match.params.status) 
      }
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    var payment = [] //มัดจำ
    var payment2 = [] //จ่ายเต็ม
    for (var i = 0 ; i < this.state.results.length ; i++){
        if(this.state.status==2)
             resultFeed.push(<ServiceBox3 payment={this.state.results[i]} key={i}/>)
        else if(this.state.status==4)
            resultFeed.push(<ServiceBox2 payment2={this.state.results[i]} key={i}/>)
    }
    if(payment.length==0){
        payment.push(<Label style={{margin: "16px 0 16px 0"}} size="24px" weight="600" color="#202020">ไม่มีรายการที่ต้องชำระเงินค่ามัดจำ</Label>)
    }
    if(payment2.length==0){
        payment2.push(<Label style={{margin: "16px 0 16px 0"}} size="24px" weight="600" color="#202020">ไม่มีรายการที่ต้องชำระเงินค่าบริการ</Label>)
    }

    return (
        <Wrapper>
            <Topbar color={color}/>
            {!this.state.failure ?
            <InnerWrapper >
                <Label style={{marginTop : "20px"}}size ="45px" color="#202020">รายการที่ต้องชำระเงินค่ามัดจำ</Label>
                <ReportList>
                    {payment}
                </ReportList>
                <Label size ="45px" color="#202020">รายการที่ต้องชำระเงินค่าบริการ</Label>
                <ReportList>
                    {payment2}
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
export default PaymentPage
