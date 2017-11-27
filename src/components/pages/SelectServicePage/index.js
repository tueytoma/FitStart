// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label,InputBox, Button2, Checkbox, LinkStyle, LinkStyle2, LinkAndButtonBox, CheckBoxAndLabel, DataBox, StarIcon, Button3, Textarea, DropdownMenu } from 'components'
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
    flex: 1;
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
`

const ServicePic = styled.div`
    height: 40vh;
    width: 76.5vh;
    background-color: #C4C4C4;
`

const InputBlock = styled.div`
display:flex;
justify-content: center;
flex-direction: column;
margin-top: 48px;
`

const Div = styled.div`
display: flex;
`

const queryString = require('query-string');
const parsed = queryString.parse(location.search)

class SelectServicePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        userName: '',
        serviceID: this.props.match.params.service,
        service: '',
        results: '',
        trainer: '',
        checkTrainerHaveService: true,
        time: '',
        selectedTime: [],
        failure: false,
        status:this.props.match.params.status,
    };
  }

    statusOneSelect = e => {
        if(this.state.results.status >= 1){
            this.setState({status:1})
            this.props.history.push('/services/' + this.props.match.params.service + '/' + 1)
        }
    }
    statusTwoSelect = e => {
        if(this.state.results.status >= 2){
            this.setState({status:2})
            this.props.history.push('/services/' + this.props.match.params.service + '/' + 2)
        }
    }
    statusThreeSelect = e => {
        if(this.state.results.status >= 3){
            this.setState({status:3})
            this.props.history.push('/services/' + this.props.match.params.service + '/' + 3)
            }
    }
    statusFourSelect = e => {
        if(this.state.results.status >= 4){
            this.setState({status:4})
            this.props.history.push('/services/' + this.props.match.params.service + '/' + 4)
            }
    }
    statusFiveSelect = e => {
        if(this.state.results.status >= 5){
            this.setState({status:5})
            this.props.history.push('/services/' + this.props.match.params.service + '/' + 5)
        }
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

  componentDidMount() {
    api.getReservationById(this.state.serviceID)
    .then((res)=>{
      this.setState({results : res})
    })
    api.getServiceById(this.state.serviceID)
    .then((res2) => {
        this.setState({ service : res2 })
    })
    api.getTimeSlotOfService(this.state.serviceID)
    .then((res3)=>{
        this.setState({time : res3})
    })
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    let textButtonSt1 = auth.isTrainee() ? "1. ส่งคำขอ" : auth.isTrainer() ? "1. ตรวจสอบคำขอ" : "";
    let textButtonSt2 = auth.isTrainee() ? "2. รอชำระค่ามัดจำ" : auth.isTrainer() ? "2. ผลชำระค่ามัดจำ" : "";
    let textButtonSt4 = auth.isTrainee() ? "4. รอชำระเงิน" : auth.isTrainer() ? "4. ผลชำระเงิน" : "";
    var starBox = []
    for (var i = 0 ; i < this.state.trainer.rating ; i++)
    starBox.push(<StarIcon key={i} height="40px"/>)
    var timeslot = []
    for (var i = 0 ; i < this.state.time.length ; i++) {
        timeslot.push(<CheckBoxAndLabel key={this.state.time[i]._id} onValue={this.onValue} id={this.state.time[i]._id} disabled={color != "#F05939"} time={this.state.time[i]} color={color}/>)
        // console.log(this.state.time[i]._id)
    }

    if(this.state.status == 1)
        return(
            <Wrapper>
                <Topbar color={color}/>
                <InnerWrapper>
                    <HeaderBlock>
                        <Button2 size = "18px" width="241px" height="43px" radius = "5px" color = {color} onClick={this.statusOneSelect} selected={this.state.status==1}>{textButtonSt1}</Button2>
                        <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = {color} onClick={this.statusTwoSelect} selected={this.state.status==2}>2</Button2>
                        <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = {color} onClick={this.statusThreeSelect} selected={this.state.status==3}>3</Button2>
                        <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = {color} onClick={this.statusFourSelect} selected={this.state.status==4}>4</Button2>
                        <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = {color} onClick={this.statusFiveSelect} selected={this.state.status==5}>5</Button2>
                    </HeaderBlock>
                    <HeaderBlock>
                        <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">ข้อมูลบริการ</Label>
                        {starBox}
                    </HeaderBlock>
                    <PicBlock>
                        <TrainerPic />
                        <ServicePic />
                    </PicBlock>
                    <Label style={{ marginBottom: "16px" }} size="32px" weight="bolder" color="#202020">1. ข้อมูลบริการ</Label>
                    <DataBox textTitle="ชื่อบริการ" textDetail={this.state.service.name} color={color} />
                    <DataBox textTitle="รายละเอียด" textDetail={this.state.service.description} color={color} />
                    <DataBox textTitle="ประสบการณ์" textDetail={this.state.service.experience + " ปี"} color={color} />
                    <DataBox textTitle="ประเภทบริการ" textDetail={this.state.service.type} color={color} />
                    <DataBox textTitle="ช่วงราคา" textDetail={this.state.service.price + " บาท"} color={color} />
                    <Label style={{ margin: "24px 0 16px 0" }} size="32px" weight="bolder" color="#202020">2. ข้อมูลเทรนเนอร์</Label>
                    <DataBox textTitle="สอนโดย" textDetail={<LinkStyle2 decoration={1} to={"/users/" + this.state.trainer.username} color={color} colorhover={color}>{"เทรนเนอร์ " + this.state.trainer.firstName + " " + this.state.trainer.lastName}</LinkStyle2>} color={color} />
                    <DataBox textTitle="เพศ" textDetail={utils.getGenderText(this.state.trainer.gender)} color={color} />
                    <DataBox textTitle="เบอร์โทรศัพท์" textDetail={this.state.trainer.telephoneNumber} color={color} />
                    <Label style={{ margin: "24px 0 16px 0" }} size="32px" weight="bolder" color="#202020">3. สถานที่และวันเวลาของบริการ</Label>
                    <DataBox textTitle="จังหวัด" textDetail={this.state.service.province} color={color} />
                    <DataBox textTitle="บริเวณที่ให้บริการ" textDetail={this.state.service.preferredLocation} color={color} />
                    <DataBox textTitle="วันที่และเวลา" textDetail={timeslot} color={color} />
                    <FooterBlock>
                        <LRBlock style={{ flexFlow: "row", justifyContent: "flex-end" }}>
                            <LinkAndButtonBox disabled={color != "#F05939"} onClick={this.onClick} to="/StatusServicePage" color={color} linktext="ไปหน้าแสดงรายการบริการ" buttontext="แก้ไขคำขอ" height="40px" width="122px" size="18px" sizeLink="18px" />
                        </LRBlock>
                    </FooterBlock >
                    <Footer color={color} />
                </InnerWrapper>
            </Wrapper>
        )
    else if(this.state.status == 2)
        return(
            <Wrapper>
            <Topbar color={color}/>
            <InnerWrapper>
                <HeaderBlock>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusOneSelect} selected={this.state.status==2}>1</Button2>
                    <Button2 size = "18px" width="241px" height="43px" radius = "5px" color = {color} onClick={this.statusTwoSelect} selected={this.state.status==2}>{textButtonSt2}</Button2>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = {color} onClick={this.statusThreeSelect} selected={this.state.status==3}>3</Button2>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = {color} onClick={this.statusFourSelect} selected={this.state.status==4}>4</Button2>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = {color} onClick={this.statusFiveSelect} selected={this.state.status==5}>5</Button2>
                </HeaderBlock>
                <HeaderBlock>
                    <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">การชำระค่ามัดจำ</Label>
                </HeaderBlock>
                <DataBox textTitle="ใบเสนอราคา" textDetail='ดาวน์โหลด แก้ตรงนี้ด้วย' color={color} />
                <DataBox textTitle="ใบเสร็จค่ามัดจำ" textDetail='ยังไม่ได้ชำระเงิน' color='#202020' />
                <Footer color={color} />
            </InnerWrapper>
            </Wrapper>
        )
    else if(this.state.status == 3)
        return(
            <Wrapper>
            <Topbar color={color}/>
            <InnerWrapper>
                <HeaderBlock>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusOneSelect} selected={this.state.status==3}>1</Button2>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusTwoSelect} selected={this.state.status==3}>2</Button2>
                    <Button2 size = "18px" width="241px" height="43px" radius = "5px" color = {color} onClick={this.statusThreeSelect} selected={this.state.status==3}>3. อยู่ระหว่างการฝึก</Button2>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = {color} onClick={this.statusFourSelect} selected={this.state.status==4}>4</Button2>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = {color} onClick={this.statusFiveSelect} selected={this.state.status==5}>5</Button2>
                </HeaderBlock>
                <Footer color={color} />
            </InnerWrapper>
            </Wrapper>
        )
    else if(this.state.status == 4)
        return(
            <Wrapper>
            <Topbar color={color}/>
            <InnerWrapper>
                <HeaderBlock>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusOneSelect} selected={this.state.status==4}>1</Button2>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusTwoSelect} selected={this.state.status==4}>2</Button2>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusThreeSelect} selected={this.state.status==4}>3</Button2>
                    <Button2 size = "18px" width="241px" height="43px" radius = "5px" color = {color} onClick={this.statusFourSelect} selected={this.state.status==4}>{textButtonSt4}</Button2>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = {color} onClick={this.statusFiveSelect} selected={this.state.status==5}>5</Button2>
                </HeaderBlock>
                <Footer color={color} />
            </InnerWrapper>
            </Wrapper>
        )
    else if(this.state.status == 5)
        return(
            <Wrapper>
            <Topbar color={color}/>
            <InnerWrapper>
                <HeaderBlock>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusOneSelect} selected={this.state.status==5}>1</Button2>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusTwoSelect} selected={this.state.status==5}>2</Button2>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusThreeSelect} selected={this.state.status==5}>3</Button2>
                    <Button2 size = "18px" width="100px" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusFourSelect} selected={this.state.status==5}>4</Button2>
                    <Button2 size = "18px" width="241px" height="43px" radius = "5px" color = {color} onClick={this.statusFiveSelect} selected={this.state.status==5}>5. การฝึกเสร็จสมบูรณ์</Button2>
                </HeaderBlock>
                <HeaderBlock>
                        <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">แสดงความคิดเห็น</Label>
                </HeaderBlock>
                <Textarea placeholder = "Comments" width="734px" height="131px"></Textarea>
                <InputBox style={{marginLeft: "0"}}  dropdown label="ให้คะแนนบริการนี้" color={color} width="149px" height="30px" menu={['0','1','2','3','4','5']}/>
                <Footer color={color} />
            </InnerWrapper>
            </Wrapper>
        )
    else
    return(<Wrapper>
        <Topbar color={color}/>
        <InnerWrapper>
            <HeaderBlock>
                <Label>UNDER CONSTRCUCTION</Label>
            </HeaderBlock>
            <Footer color={color}/>
        </InnerWrapper>
    </Wrapper>)
  }
}
export default SelectServicePage
