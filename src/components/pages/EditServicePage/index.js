// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Label, InputBox, Footer, LinkAndButtonBox, Button, EditSuccessIcon, DeleteUserIcon } from 'components'
import Dialog from 'material-ui/Dialog';
import { Link} from 'react-router-dom';
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

const Div = styled.div`
    display: flex;
`

class EditServicePage extends React.Component {

  constructor(props) {
        super(props)
        this.state = {
            _id: this.props.match.params.serviceid,
            trainerId : '',
            name : '',
            description : '',
            province : '',
            preferredLocation : '',
            price : '',
            experience : '',
            type : '', 

            namePass: true,
            detailPass: true,
            provincePass: true,
            placePass: true,
            minPass: true,
            maxPass: true,
            expPass: true,
            typePass: true,
            timePass: true,

            timeSlots : '',
        };
    }

    componentDidMount() {
        api.getServiceById(this.state._id)
        .then(res =>{
            this.setState({
                trainerId : res.trainerId,
                name : res.name,
                description : res.description,
                province : res.province,
                preferredLocation : res.preferredLocation,
                price : res.price,
                experience : res.experience,
                type : res.type, 
            })
            console.log(this.state)
        })
    }

    changeServiceName = e => {
        this.setState({name : e.target.value})
    }

    changeServiceDetail = e => {
        this.setState({description : e.target.value})
    }

    changeServiceProvince = e => {
        this.setState({province : e.target.value})
    }

    changeServicePlace = e => {
        this.setState({preferredLocation : e.target.value})
    }

    changeServiceMinCost = e => {
        this.setState({minCost : e.target.value})
    }

    changeServiceMaxCost = e => {
        this.setState({maxCost : e.target.value})
    }

    changeExperience = e => {
        this.setState({experience : e.target.value})
    }

    changeServiceType = e => {
        this.setState({type : e.target.value})
    }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    let province = ['กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา', 
    'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก', 'นครปฐม', 'นครพนม', 
    'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 
    'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'พะเยา', 
    'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยะลา', 'ยโสธร', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 
    'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 
    'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อุดรธานี', 'อุทัยธานี', 
    'อุตรดิตถ์', 'อุบลราชธานี', 'อำนาจเจริญ'];

    return (
      <Wrapper id="top">
        <Topbar color={color}/>
        { this.props.match.params.user == this.state.username ?
        <InnerWrapper >
            <HeaderBlock>
                <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">แก้ไขข้อมูลข้อมูลบริการ</Label>
            </HeaderBlock>
            <InputBlock id = "inputblock">
              <Div>
                <LRBlock>
                    <InputBox value={this.state.name} type="text" onChange={this.changeServiceName} error={!this.state.namePass} label="ชื่อบริการ" placeholder="Service name" color={color} width="400px" height="30px"/>
                    <InputBox value={this.state.description}  type="text" onChange={this.changeServiceDetail} error={!this.state.detailPass} label="รายละเอียด" placeholder="Details" color={color} width="400px" height="80px" textarea />
                </LRBlock>
                <LRBlock>
                    <InputBox value={this.state.province} style={{marginRight: "16px"}} onChange={this.changeServiceProvince} error={!this.state.provincePass} dropdown label="จังหวัด" color={color} width="435px" height="30px" menu={province}/>
                    <InputBox value={this.state.preferredLocation} type="text" onChange={this.changeServicePlace} error={!this.state.placePass} label="บริเวณที่ให้บริการ" placeholder="Service Place" color={color} width="400px" height="30px"/>
                    <Label size="18px" style={{margin: "0 6px 6px 20px"}} /*how much margin??*/ color ="#545454">ช่วงราคา
                        <Label weight="normal" size="12px" color="#545454">   (บาท)</Label>
                    </Label> 
                    <LRBlock>
                        <Div style={{alignItems: "center"}}>
                            <InputBox  noneToolTip type = "number" onChange={this.changeServiceMinCost} error={!this.state.minPass} placeholder="xx.xx" width ="155px" height="30px"/>
                            <Label style={{marginLeft: "12px"}} weight="bolder" size="30px" color="#C4C3C3">-</Label>
                            <InputBox noneToolTip type = "number" onChange={this.changeServiceMaxCost} error={!this.state.maxPass} placeholder="xx.xx" width ="155px" height="30px"/>
                        </Div>  
                    </LRBlock>
                </LRBlock>
              </Div>
              <Div style={{marginTop: "16px"}}>
                <LRBlock>
                    <InputBox value={this.state.experience} onChange={this.changeExperience} error={!this.state.expPass} dropdown label="ประสบการณ์ (ปี)" color={color} width="435px" height="30px" menu={['น้อยกว่า 1','1 - 5','5 - 10', 'มากกว่า 10']}/>
                </LRBlock>
                <LRBlock>
                    <InputBox value={this.state.type} onChange={this.changeServiceType} error={!this.state.typePass} dropdown label="ประเภทบริการ" color={color} width="435px" height="30px" menu={['Freelance','ประจำฟิตเนส']}/>
                </LRBlock>
              </Div>
              <Footer color={color} />
            </InputBlock>
        </InnerWrapper>
        :
        <InnerWrapper >
            <Label style={{marginTop: "32px"}} size="48px" weight="bolder" color="#202020">คุณไม่มีสิทธิ์ในหน้านี้</Label>
            <Footer color={color} />
        </InnerWrapper>
        }
      </Wrapper>
    )
  }
}
export default EditServicePage
