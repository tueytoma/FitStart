// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label, InputBox, Checkbox, LinkStyle, LinkAndButtonBox, DateItems} from 'components'
import { font } from 'styled-theme'

import { Link} from 'react-router-dom';
import api from '../../../api'
import auth from '../../../auth'

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
  margin: 36px 0 35px 0;
  display: flex;
  flex-flow: column;
`

const InputBlock = styled.div`
  display:flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 48px;
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

const Div = styled.div`
  display: flex;
`

class CreateServicePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      serviceName: '',
      serviceDetail: '',
      serviceProvince: 'ps',
      servicePlace: '',
      serviceMinCost: 0,
      serviceMaxCost: 0,
      experience: 'ps',
      serviceType: 'ps',
      serviceDate:'1996-02-08',
      serviceStartTime:'00:00',
      serviceEndTime:'00:00',
      namePass: true,
      detailPass: true,
      provincePass: true,
      placePass: true,
      minPass: true,
      maxPass: true,
      expPass: true,
      typePass: true,
      timePass: true,
      checkboxPass: false,
      timeSlotTemp: [],
      timeDesc: [],
      slot:[],
    };
  }

  componentDidMount() {
    if(!this.state.end) {this.interval = setInterval(() => this.tick(), 100)}
    else {}
  }

  tick() {
      let tempSlot  = []
      for (var i = 0 ; i < this.state.timeSlotTemp.length ; i++)
      tempSlot.push(<DateItems onDelete={this.onDelete} id={this.state.timeDesc[i]} time={this.state.timeSlotTemp[i]} key={i} />)
      this.setState({slot: tempSlot})
  }

  onDelete = (id) => {
    let tempTimeDesc = this.state.timeDesc
    let temptimeSlotTemp  = this.state.timeSlotTemp

    if(tempTimeDesc.indexOf(id)!=-1){
      
      temptimeSlotTemp.splice(tempTimeDesc.indexOf(id),1)
      tempTimeDesc.splice(tempTimeDesc.indexOf(id),1)   

      this.setState({timeDesc: tempTimeDesc})
      this.setState({timeSlotTemp: temptimeSlotTemp})
      console.log(this.state.timeDesc)
    }
  }
  
  changeServiceName = e => {
    this.setState({serviceName : e.target.value})
  }

  changeServiceDetail = e => {
    this.setState({serviceDetail : e.target.value})
  }

  changeServiceProvince = e => {
    this.setState({serviceProvince : e.target.value})
  }

  changeServicePlace = e => {
    this.setState({servicePlace : e.target.value})
  }

  changeServiceMinCost = e => {
    this.setState({serviceMinCost : e.target.value})
    // console.log(e.target.value)
  }

  changeServiceMaxCost = e => {
    this.setState({serviceMaxCost : e.target.value})
  }

  changeExperience = e => {
    this.setState({experience : e.target.value})
  }

  changeServiceType = e => {
    this.setState({serviceType : e.target.value})
  }

  changeServiceDate = e => {
    this.setState({serviceDate : e.target.value})
    // console.log(this.state.serviceDate)
  }
  
  changeServiceStartTime = e => {
    this.setState({serviceStartTime : e.target.value})
    // console.log(this.state.serviceStartTime)
  }

  changeServiceEndTime = e => {
    this.setState({serviceEndTime : e.target.value})
    // console.log(this.state.serviceEndTime)
  }

  toggleIsChecked = e => {
    this.setState({checkboxPass: !this.state.checkboxPass});
}

  checkFormat = (input) => {
    let check = /^[0-9a-zA-Zก-ฮๆไำะัี้่าิืใๅุึ+๐-๙ู"ํ๊ฯ,/ฤโ็๋()ฺ์?ฦ., ]+$/g;  
    if(input.match(check)) return true
    else return false 
  }

  checkNumber = (input) => {
    let check = /\d*(\.\d+)+$|\d*/g;
    if(String(input).match(check)) return true
    else return false
  }

  plus = e => { 
    let tempTimeDesc = this.state.timeDesc
    let temptimeSlotTemp  = this.state.timeSlotTemp
    let date = this.state.serviceDate
    let start = this.state.serviceStartTime
    let end = this.state.serviceEndTime
    let startTemp = date + "T" + start + "+07:00"
    let endTemp = date + "T" + end + "+07:00"
    let state = {"startTime": startTemp, "endTime": endTemp}

    function haveDate(state) {
      if(state.startTime == startTemp) return state.endTime == endTemp
      else return false;
    }

    if(temptimeSlotTemp.findIndex(haveDate)==-1 && end > start) {
      temptimeSlotTemp.push(state)    
      tempTimeDesc.push(startTemp + endTemp)
      this.setState({timePass: true})
    } else this.setState({timePass: false})

    this.setState({timeDesc: tempTimeDesc})
    this.setState({timeSlotTemp: temptimeSlotTemp})
    console.log(this.state.timeSlotTemp)
  }

createService = e => {
    let priceString = this.state.serviceMinCost + " - " + this.state.serviceMaxCost
    console.log(this.state.serviceStartTime)
    let data = {
      trainerId : auth.getUser()._id,
      name : this.state.serviceName,
      description : this.state.serviceDetail,
      province : this.state.serviceProvince,
      preferredLocation : this.state.servicePlace,
      price : priceString,
      experience : this.state.experience,
      type : this.state.serviceType, 
      timeSlots : this.state.timeSlotTemp,

    }
    console.log(data)
    this.validate()
    api.createService(data)
        .then((res)=>{
            console.log(res)
            if(this.state.namePass&&this.state.detailPass&&this.state.provincePass&&this.state.placePass&&this.state.minPass&&this.state.maxPass&&this.state.expPass&&this.state.typePass&&this.state.timePass) 
            this.props.history.push('/')
        })
}

  validate = (e) => {
    if(this.state.serviceName.length<1||this.state.serviceName.length>300 || !this.checkFormat(this.state.serviceName)) this.setState({namePass:false})
    else this.setState({namePass:true})
    if(this.state.serviceDetail.length<1||this.state.serviceDetail.length>300 || !this.checkFormat(this.state.serviceDetail)) this.setState({detailPass:false})
    else this.setState({detailPass:true})
    if(this.state.serviceProvince == 'ps') this.setState({provincePass:false})
    else this.setState({provincePass:true})
    if(this.state.servicePlace.length<1||this.state.servicePlace.length>20) this.setState({placePass:false})
    else this.setState({placePass:true})
    if(this.state.serviceMinCost <= 0 || !this.checkNumber(this.state.serviceMinCost)) this.setState({minPass:false})
    else this.setState({minPass:true})
    if(this.state.serviceMaxCost <= 0 || this.state.serviceMaxCost < this.state.serviceMinCost || !this.state.minPass) this.setState({maxPass:false})
    else this.setState({maxPass:true})
    if(this.state.serviceType == 'ps') this.setState({typePass:false})
    else this.setState({typePass:true})
    if(this.state.experience == 'ps') this.setState({expPass:false})
    else this.setState({expPass:true})
    if(this.state.slot.length == 0) this.setState({timePass:false})
    else this.setState({timePass: true})
  }
  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    let province = ['กรุงเทพมหานคร ', 'กระบี่', 'กาญจนบุรี ', 'กาฬสินธุ์ ', 'กำแพงเพชร ', 'ขอนแก่น ', 'จันทบุรี ', 'ฉะเชิงเทรา ', 
    'ชลบุรี ', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก', 'นครปฐม', 'นครพนม', 
    'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 
    'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'พะเยา', 
    'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยะลา', 'ยโสธร', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 
    'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 
    'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อุดรธานี', 'อุทัยธานี', 
    'อุตรดิตถ์', 'อุบลราชธานี', 'อำนาจเจริญ'];

    return (
      <Wrapper>
        <Topbar color={color}/>
        {auth.isLoggedIn() && auth.isTrainer() ?
        <InnerWrapper>
            <HeaderBlock><Label size="48px" weight="bolder" color="#202020">สร้างบริการใหม่</Label></HeaderBlock>
            <InputBlock id = "inputblock">
              <Div>
                <LRBlock>
                  <InputBox type="text" onChange={this.changeServiceName} error={!this.state.namePass} label="ชื่อบริการ" placeholder="Service name" color={color} width="400px" height="30px"/>
                  <InputBox type="text" onChange={this.changeServiceDetail} error={!this.state.detailPass} label="รายละเอียด" placeholder="Details" color={color} width="400px" height="80px" textarea />
                </LRBlock>
                <LRBlock>
                  <InputBox style={{marginLeft: "0"}} onChange={this.changeExperience} error={!this.state.expPass} dropdown label="ประสบการณ์ (ปี)" color={color} width="435px" height="30px" menu={['น้อยกว่า 1','1 - 5','5 - 10', 'มากกว่า 10']}/>
                  <InputBox style={{marginLeft: "0"}} onChange={this.changeServiceType} error={!this.state.typePass} dropdown label="ประเภทบริการ" color={color} width="435px" height="30px" menu={['Freelance','ประจำฟิตเนส']}/>
                </LRBlock>
              </Div>
              <Div style={{marginTop: "32px"}}>
                <LRBlock>
                  <InputBox style={{marginRight: "16px"}} onChange={this.changeServiceProvince} error={!this.state.provincePass} dropdown label="จังหวัด" color={color} width="435px" height="30px" menu={province}/>
                  <InputBox type="text" onChange={this.changeServicePlace} error={!this.state.placePass} label="บริเวณที่ให้บริการ" placeholder="Service Place" color={color} width="400px" height="30px"/>
                  <Label size="18px" style={{margin: "0 6px 6px 20px"}} /*how much margin??*/ color ="#545454">ช่วงราคา
                    <Label weight="normal" size="12px" color="#545454">   (บาท)</Label>
                  </Label> 
                  <LRBlock>
                    <Div style={{alignItems: "center"}}>
                      <InputBox  noneToolTip type = "number" onChange={this.changeServiceMinCost} error={!this.state.minPass} placeholder="xx.xx" width ="155px" height="30px"/>
                      <Label style={{marginLeft: "12px"}}weight="bolder" size="30px" color="#C4C3C3">-</Label>
                      <InputBox noneToolTip type = "number" onChange={this.changeServiceMaxCost} error={!this.state.maxPass} placeholder="xx.xx" width ="155px" height="30px"/>
                    </Div>  
                  </LRBlock>
                </LRBlock>
                <LRBlock>
                  <Div style={{flexDirection: "column", marginBottom: "-10px"}}>
                    <Label size="18px" color ="#545454">วันที่และเวลา <Label size="12px" color="#545454">(สามารถเลือกได้มากกว่า 1)</Label></Label> 
                    <Div style={{alignItems:"center", marginTop: "-17px"}}>
                      <InputBox noneToolTip style={{margin: "0 -10px 16px 0"}} type="date" onChange={this.changeServiceDate} error={!this.state.timePass} placeholder="DD/MM/YY" color={color} width="153px" height="30px"/>
                      <InputBox noneToolTip type="time" onChange={this.changeServiceStartTime} error={!this.state.timePass} placeholder="HH.MM" color={color} width="83px" height="30px"/>
                      <Label style={{marginLeft: "12px"}}weight="bolder" size="30px" color="#C4C3C3">-</Label>
                      <InputBox noneToolTip type="time" onChange={this.changeServiceEndTime} error={!this.state.timePass} placeholder="HH.MM" color={color} width="83px" height="30px"/>
                      <Label onClick={this.plus} hover style={{marginLeft: "12px",marginBottom: "13px"}} weight="bolder" size="60px" colorhover="#73C276" color="rgba(115, 194, 118, 0.5)">+</Label>
                    </Div>
                  </Div>
                  {this.state.slot}
                </LRBlock>
              </Div>
              
            </InputBlock>
            <FooterBlock>
              <LRBlock style={{flexFlow: "row", alignItems: "center"}}>
                <Checkbox checked={this.state.checkboxPass} onClick={this.toggleIsChecked}/> 
                <Label size="13px" weight="normal" color= "rgba(84, 84, 84, 0.8)">ยอมรับในข้อตกลงของผู้ให้บริการ Fit Start ข้อมูลเพิ่มเติม &nbsp;</Label>
                <LinkStyle to="/detail" size="13px"><p>คลิกที่นี่</p></LinkStyle>
              </LRBlock>
              <LRBlock style={{flexFlow: "row", justifyContent: "flex-end"}}>
                <LinkAndButtonBox disabled={!this.state.checkboxPass} onClick={this.createService} to="/login" cancelregis={1} color={color} linktext="ยกเลิกการสร้างบริการ" buttontext="สร้างบริการ"/>
              </LRBlock>
            </FooterBlock>
            <Footer color={color} />
        </InnerWrapper>
        :
        <InnerWrapper >
            <Label style={{marginTop: "32px"}} size="64px" weight="bolder" color="#202020">คุณไม่มีสิทธิ์ในหน้านี้</Label>
            <Footer color={color} />
        </InnerWrapper>
        }
      </Wrapper>
    )
  }
}
export default CreateServicePage
