// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label, InputBox, Checkbox, LinkStyle, LinkAndButtonBox} from 'components'
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
      serviceProvince: '',
      servicePlace: '',
      serviceMinCost: '',
      serviceMaxCost: '',
      experience: '',
      serviceType: '',
      serviceTime:'',
      namePass: true,
      detailPass: true,
      provincePass: true,
      placePass: true,
      minPass: true,
      maxPass: true,
      expPass: true,
      typePass: true,
      timePass: true
    };
  }
  changeServiceName = e => {
    this.setState({serviceName : e.target.value})
  }

  changeServiceDetail = e => {
    this.setState({serviceDetail : e.target.value})
  }

  changeServicProvince = e => {
    this.setState({serviceProvince : e.target.value})
  }

  changeServicePlace = e => {
    this.setState({servicePlace : e.target.value})
  }

  changeServiceMinCost = e => {
    this.setState({serviceMinCost : e.target.value})
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

  changeServiceTime = e => {
    this.setState({serviceTime : e.target.value})
  }

createService = e => {
    let data = {
        serviceName : this.state.serviceName,
        serviceDetail : this.state.serviceDetail,
        serviceProvince : this.state.serviceProvince,
        servicePlace : this.state.servicePlace,
        serviceMinCost : this.state.serviceMinCost,
        serviceMaxCost : this.state.serviceMaxCost,
        experience : this.state.experience,
        serviceType : this.state.serviceType,
        serviceTime : this.state.serviceTime
    }
    console.log(data)
    this.validate()
    api.createService(data)
        .then((res)=>{
            console.log(res)
            this.props.history.push('/createServiceSuccess')
        })
}

  validate = (e) => {
    if(this.state.serviceName.length<1||this.state.serviceName.length>20) this.setState({namePass:false})
    else this.setState({namePass:true})
    if(this.state.serviceDetail.length<1||this.state.serviceDetail.length>300) this.setState({detailPass:false})
    else this.setState({detailPass:true})
    //check dropdown province
    if(this.state.servicePlace.length<1||this.state.servicePlace.length>20) this.setState({placePass:false})
    else this.setState({placePass:true})
    //check cost
    //check type
    //check time
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
              <LRBlock>
                <LRBlock>
                  <InputBox type="text" onChange={this.changeServiceName} error={!this.state.namePass} label="ชื่อบริการ" placeholder="Service name" color={color} width="400px" height="30px"/>
                  <InputBox type="text" onChange={this.changeServiceDetail} error={!this.state.detailPass} label="รายละเอียด" placeholder="Details" color={color} width="400px" height="80px" textarea />
                </LRBlock>
                <LRBlock>
                  <InputBox style={{marginRight: "16px"}} onChange={this.changeServicProvince} error={!this.state.provincePass} dropdown label="จังหวัด" color={color} width="435px" height="30px" menu={province}/>
                  <InputBox type="text" onChange={this.changeServicePlace} error={!this.state.placePass} label="บริเวณที่ให้บริการ" placeholder="Service Place" color={color} width="400px" height="30px"/>
                  <Label size="18px" style={{margin: "0 6px 6px 20px"}} /*how much margin??*/ color ="#545454">ช่วงราคา
                        <Label weight="normal" size="12px" color="#545454">   (บาท)</Label>
                  </Label> 
                  <LRBlock>
                    <Div style={{alignItems: "center"}}>
                      <InputBox  type = "number" onChange={this.changeServiceMinCost} error={!this.state.minPass} placeholder="xx.xx" width ="155px" height="30px"/>
                      <Label style={{marginLeft: "12px"}}weight="bolder" size="30px" color="#C4C3C3">-</Label>
                      <InputBox type = "number" onChange={this.changeServiceMaxCost} error={!this.state.maxPass} placeholder="xx.xx" width ="155px" height="30px"/>
                    </Div>  
                  </LRBlock>
                </LRBlock>
              </LRBlock>
              <LRBlock>
                <LRBlock>
                  <InputBox style={{marginRight: "16px"}} onChange={this.changeExperience} error={!this.state.expPass} dropdown label="ประสบการณ์ (ปี)" color={color} width="435px" height="30px" menu={['น้อยกว่า 1','1 - 5','5 - 10', 'มากกว่า 10']}/>
                  <InputBox style={{marginRight: "16px"}} onChange={this.changeServiceType} error={!this.state.typePass} dropdown label="ประเภทบริการ" color={color} width="435px" height="30px" menu={['Freelance','ประจำฟิตเนส']}/>
                </LRBlock>
                <LRBlock>
                  <span>
                    <Label size="18px"  style={{marginLeft: "20px"}} /*how much margin??*/ color ="#545454">วันที่และเวลา</Label> <Label size="12px" color="#545454">(สามารถเลือกได้มากกว่า 1)</Label>
                    <InputBox type="text" onchange={this.changeServiceTime} error={!this.state.timePass} placeholder="CHANGE THIS TO TIME SLOT SELECTOR" color={color} width="345px" height="30px"/>
                  </span>
                </LRBlock>
              </LRBlock>
            </InputBlock>
            <FooterBlock>
              <LRBlock style={{flexFlow: "row", alignItems: "center"}}>
                <Checkbox checked={this.state.checkboxPass} onClick={this.toggleIsChecked}/> 
                <Label size="13px" weight="normal" color= "rgba(84, 84, 84, 0.8)">ยอมรับในข้อตกลงของผู้ให้บริการ Fit Start ข้อมูลเพิ่มเติม &nbsp;</Label>
                <LinkStyle to="/detail" size="13px"><p>คลิกที่นี่</p></LinkStyle>
              </LRBlock>
              <LRBlock style={{flexFlow: "row", justifyContent: "flex-end"}}>
                <LinkAndButtonBox disabled onClick={this.createService} to="/login" cancleRegis color={col} linktext="ยกเลิกการสมัครสมาชิก" buttontext="ยืนยันการสมัคร"/>
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
