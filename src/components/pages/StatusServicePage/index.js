// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label, Button2, Checkbox, LinkStyle, LinkStyle2, LinkAndButtonBox, CheckBoxAndLabel, ServiceBox2, ServiceBox3 } from 'components'
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

const ServiceList = styled.div`
    margin-Bottom: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


const queryString = require('query-string');
const parsed = queryString.parse(location.search)

class StatusServicePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        userName: this.props.match.params.user,
        serviceID: this.props.match.params.service,
        service: '',
        results: '',
        trainer: '',
        checkTrainerHaveService: true,
        time: '',
        selectedTime: [],
        failure: false,
        status:0
    };
  }

    statusClick = (status, e) => {
        this.setState({status:status})
        this.getReservationList(status)
        this.props.history.push('/services/' + status)
    }

  changeCheckbox = e => {
    this.setState({checkboxPass : e.target.value})
  }

  toggleIsChecked = e => {
    this.setState({checkboxPass: !this.state.checkboxPass});
  }

  onClick = e => {
    console.log(this.state.selectedTime)  
  }

  onValue = (id, check) => {
     var temp = this.state.selectedTime
     if(check == false) {
        temp.push(id)
        // console.log(id + "== true")
        
    } else {
        // console.log(this.state.selectedTime.indexOf(id) + "ddd");
        // console.log(temp.indexOf(id))
        if(temp.indexOf(id)!=-1){
            console.log(temp.indexOf(id))
            temp.splice(temp.indexOf(id),1)
        }
        // console.log(id + "== false")
    }
    this.setState({selectedTime : temp})
    }
  validateUsername = () => {
      if(this.state.userName != this.state.trainer.username){
        this.setState({failure : true})
      }
  }

  getReservationList = (status) => {
    api.getReservationByStatus(status)
    .then((res)=>{
      this.setState({results : res})
    })
  }

  componentDidMount(){
      this.setState({status : this.props.match.params.status})
      this.getReservationList(this.props.match.params.status)
  }

  componentWillReceiveProps(nextProps){
    this.setState({status : nextProps.match.params.status})
    this.getReservationList(nextProps.match.params.status)
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    let textButtonSt1 = auth.isTrainee() ? "1. ส่งคำขอ" : auth.isTrainer() ? "1. ตรวจสอบคำขอ" : "";
    let textButtonSt2 = auth.isTrainee() ? "2. รอชำระค่ามัดจำ" : auth.isTrainer() ? "2. ผลชำระค่ามัดจำ" : "";
    let textButtonSt4 = auth.isTrainee() ? "4. รอชำระเงิน" : auth.isTrainer() ? "4. ผลชำระเงิน" : "";

    /*just try*/ 
    var resultFeed = []
    for (var i = 0 ; i < this.state.results.length ; i++){
        if(this.state.status==0 || this.state.status==5)
             resultFeed.push(<ServiceBox3 reservation={this.state.results[i]} key={i}/>)
        else
            resultFeed.push(<ServiceBox2 reservation={this.state.results[i]} key={i}/>)
    }
    /*just try*/

    return (
        <Wrapper>
            <Topbar color={color}/>
            {!this.state.failure ?
            <InnerWrapper >
                <HeaderBlock>
                    <Label size = "24px" color={color}>โปรดเลือกประเภทรายการที่ต้องการตรวจสอบ &nbsp;</Label><LinkStyle color="#202020" to="">คุณไม่ทราบแต่ละสถานะคืออะไร?</LinkStyle>
                </HeaderBlock>
                <LRBlock>
                    <ButtonBlock>
                        <Button2 size = "18px" width="241.59px" height="43px" radius = "5px" selected={this.state.status==0} color = {color} onClick={(e) => this.statusClick(0, e)}>ถูกละทิ้ง</Button2>
                        <Button2 size = "18px" width="241.59px" height="43px" radius = "5px" selected={this.state.status==1} color = {color} onClick={(e) => this.statusClick(1, e)}>{textButtonSt1}</Button2>
                        <Button2 size = "18px" width="241.59px" height="43px" radius = "5px" selected={this.state.status==2} color = {color} onClick={(e) => this.statusClick(2, e)}>{textButtonSt2}</Button2>
                    </ButtonBlock>
                    <ButtonBlock>
                        <Button2 size = "18px" width="241.59px" height="43px" radius = "5px" selected={this.state.status==3} color = {color} onClick={(e) => this.statusClick(3, e)}>3. อยู่ระหว่างการฝึก</Button2>
                        <Button2 size = "18px" width="241.59px" height="43px" radius = "5px" selected={this.state.status==4} color = {color} onClick={(e) => this.statusClick(4, e)}>{textButtonSt4}</Button2>
                        <Button2 size = "18px" width="241.59px" height="43px" radius = "5px" selected={this.state.status==5} color = {color} onClick={(e) => this.statusClick(5, e)}>5. การฝึกเสร็จสมบูรณ์</Button2>
                    </ButtonBlock>
                </LRBlock>
                <Label size ="65px" color="#202020">รายการการจอง</Label>
                <ServiceList>
                    {resultFeed}
                </ServiceList>
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
export default StatusServicePage
