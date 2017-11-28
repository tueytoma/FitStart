// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label, DataBox, StarIcon, Checkbox, LinkStyle, LinkStyle2, LinkAndButtonBox, CheckBoxAndLabel } from 'components'
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
    justify-content: space-between;
    margin: 0 0 24px 0;
`

const TrainerPic = styled.div`
    height: 40vh;
    width: 56.32vh;
    margin: 0 24px 0 0;
    background-color: #C4C4C4;
    ${props => props.image ? `content: url(${'/user' + props.image + '.jpg'})` : ''}
`

const ServicePic = styled.div`
    height: 40vh;
    width: 76.5vh;
    background-color: #C4C4C4;
    ${props => props.image ? `content: url(${'/service' + props.image + '.jpg'})` : ''}
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

class ServicePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        userName: this.props.match.params.user,
        serviceID: this.props.match.params.service,
        service: '',
        trainer: '',
        checkTrainerHaveService: true,
        time: '',
        selectedTime: [],
        failure: false,
    };
  }

  componentWillMount() {
    api.getServiceById(this.state.serviceID)
    .then((res)=>{
        // console.log(res)
        this.setState({service : res})
        // console.log(this.state.service.trainerId)
        api.getUserById(res.trainerId)
        .then((res2)=>{
          this.setState({trainer : res2})
          this.validateUsername()
        //   console.log(this.state.userName)
        //   console.log(this.state.trainer.username)
        })  
        api.getTimeSlotOfService(this.state.serviceID)
        .then((res3)=>{
            this.setState({time : res3})
        })
    })
  }

  changeCheckbox = e => {
    this.setState({checkboxPass : e.target.value})
  }

  toggleIsChecked = e => {
    this.setState({checkboxPass: !this.state.checkboxPass});
  }

  onClick = e => {
    if(this.state.selectedTime.length>0){
        let data = {
            traineeId : auth.getUser()._id,
            trainerId : this.state.trainer._id,
            timeSlot : this.state.selectedTime
        }
        api.createReservationOfService(this.state.serviceID, data)
        .then(res=>{console.log(res)
        })
    }
    
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

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    var starBox = []
    for (var i = 0 ; i < this.state.trainer.rating ; i++)
    starBox.push(<StarIcon key={i} height="40px"/>)
    var timeslot = []
    for (var i = 0 ; i < this.state.time.length ; i++) {
        timeslot.push(<CheckBoxAndLabel key={this.state.time[i]._id} onValue={this.onValue} id={this.state.time[i]._id} disabled={color != "#F05939"} time={this.state.time[i]} color={color}/>)
        // console.log(this.state.time[i]._id)
    }
    return (
      <Wrapper>
        <Topbar color={color}/>
        {!this.state.failure ?
        <InnerWrapper >
            <HeaderBlock>
                <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">ข้อมูลบริการ</Label>
                {starBox}
            </HeaderBlock>
            <PicBlock>
                <TrainerPic image={this.state.trainer._id} />
                <ServicePic image={this.state.service._id}/>
            </PicBlock>
            <Label style={{marginBottom: "16px"}} size="32px" weight="bolder" color="#202020">1. ข้อมูลบริการ</Label>
            <DataBox textTitle="ชื่อบริการ" textDetail={this.state.service.name} color={color}/>
            <DataBox textTitle="รายละเอียด" textDetail={this.state.service.description} color={color}/>
            <DataBox textTitle="ประสบการณ์" textDetail={this.state.service.experience + " ปี"}  color={color}/>
            <DataBox textTitle="ประเภทบริการ" textDetail={this.state.service.type}  color={color}/>
            <DataBox textTitle="ช่วงราคา" textDetail={this.state.service.price  + " บาท"}  color={color}/>
            <Label style={{margin: "24px 0 16px 0"}} size="32px" weight="bolder" color="#202020">2. ข้อมูลเทรนเนอร์</Label>
            <DataBox textTitle="สอนโดย" textDetail={<LinkStyle2 decoration={1} to={"/users/" + this.state.trainer.username} color={color} colorhover={color}>{"เทรนเนอร์ " + this.state.trainer.firstName + " " + this.state.trainer.lastName}</LinkStyle2>} color={color}/>
            <DataBox textTitle="เพศ" textDetail={utils.getGenderText(this.state.trainer.gender)} color={color}/>
            <DataBox textTitle="เบอร์โทรศัพท์" textDetail={this.state.trainer.telephoneNumber}  color={color}/>
            <Label style={{margin: "24px 0 16px 0"}} size="32px" weight="bolder" color="#202020">3. สถานที่และวันเวลาของบริการ</Label>
            <DataBox textTitle="จังหวัด" textDetail={this.state.service.province} color={color}/>
            <DataBox textTitle="บริเวณที่ให้บริการ" textDetail={this.state.service.preferredLocation} color={color}/>
            <DataBox textTitle="วันที่และเวลา" textDetail={timeslot} color={color}/> 
            <FooterBlock>
                <LRBlock style={{flexFlow: "row", alignItems: "center"}}>
                    {auth.isLoggedIn() && auth.isTrainee() && <Checkbox checked={this.state.checkboxPass} onClick={this.toggleIsChecked}/> }
                    {auth.isLoggedIn() && auth.isTrainee() && <Label size="13px" weight="normal" color= "rgba(84, 84, 84, 0.8)">ยอมรับในข้อตกลงของผู้ให้บริการ Fit Start ข้อมูลเพิ่มเติม &nbsp;</Label> }
                    {auth.isLoggedIn() && auth.isTrainee() && <LinkStyle to="/detail" size="13px"><p>คลิกที่นี่</p></LinkStyle> }
                </LRBlock>
                <LRBlock style={{flexFlow: "row", justifyContent: "flex-end"}}>
                    <LinkAndButtonBox disabled={color != "#F05939"} onClick={this.onClick} to="/StatusServicePage" color={color} linktext="ยกเลิกการเลือกบริการนี้" buttontext="ส่งคำขอ" height="40px" width="122px" size="18px" sizeLink="18px"/>
                </LRBlock>
            </FooterBlock >
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
export default ServicePage
