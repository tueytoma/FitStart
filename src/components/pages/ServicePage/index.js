// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label, DataBox, StarIcon, Checkbox, LinkStyle, LinkAndButtonBox } from 'components'
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
`

const ServicePic = styled.div`
    height: 40vh;
    width: 76.5vh;
    background-color: #C4C4C4;
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
    };
  }

  componentWillMount() {
    api.getServiceById(this.state.serviceID)
    .then((res)=>{
        // console.log(res)
        this.setState({service : res})
        console.log(this.state.service.trainer)
        api.getUserById(res.trainerId)
        .then((res2)=>{
          this.setState({trainer : res2})
          console.log(this.state.userName)
          console.log(this.state.trainer.username)
        })  
    })
  }

  changeCheckbox = e => {
    this.setState({checkboxPass : e.target.value})
  }

  toggleIsChecked = e => {
    this.setState({checkboxPass: !this.state.checkboxPass});
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    var starBox = []
    for (var i = 0 ; i < this.state.trainer.rating ; i++)
    starBox.push(<StarIcon height="40px"/>)
    return (
      <Wrapper>
        <Topbar color={color}/>
        {this.state.userName == this.state.trainer.username ?
        <InnerWrapper >
            <HeaderBlock>
                <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">ข้อมูลบริการ</Label>
                {starBox}
            </HeaderBlock>
            <PicBlock>
                <TrainerPic />
                <ServicePic />
            </PicBlock>
            <Label style={{marginBottom: "16px"}} size="32px" weight="bolder" color="#202020">1. ข้อมูลบริการ</Label>
            <DataBox textTitle="ชื่อบริการ" textDetail={this.state.service.name} color={color}/>
            <DataBox textTitle="รายละเอียด" textDetail={this.state.service.description} color={color}/>
            <DataBox textTitle="ประสบการณ์" textDetail={this.state.service.experience + " ปี"}  color={color}/>
            <DataBox textTitle="ประเภทบริการ" textDetail={this.state.service.type}  color={color}/>
            <DataBox textTitle="ช่วงราคา" textDetail={this.state.service.price  + " บาท"}  color={color}/>
            <Label style={{margin: "24px 0 16px 0"}} size="32px" weight="bolder" color="#202020">2. ข้อมูลเทรนเนอร์</Label>
            <DataBox textTitle="สอนโดย" textDetail={"เทรนเนอร์ " + this.state.trainer.firstName + " " + this.state.trainer.lastName} color={color}/>
            <DataBox textTitle="เพศ" textDetail={this.state.trainer.gender} color={color}/>
            <DataBox textTitle="เบอร์โทรศัพท์" textDetail={this.state.trainer.telephoneNumber}  color={color}/>
            <Label style={{margin: "24px 0 16px 0"}} size="32px" weight="bolder" color="#202020">3. สถานที่และวันเวลาของบริการ</Label>
            <DataBox textTitle="จังหวัด" textDetail={this.state.service.province} color={color}/>
            <DataBox textTitle="บริเวณที่ให้บริการ" textDetail={this.state.service.preferredLocation} color={color}/>
            <FooterBlock>
                <LRBlock style={{flexFlow: "row", alignItems: "center"}}>
                    {auth.isLoggedIn() && auth.isTrainee() && <Checkbox checked={this.state.checkboxPass} onClick={this.toggleIsChecked}/> }
                    {auth.isLoggedIn() && auth.isTrainee() && <Label size="13px" weight="normal" color= "rgba(84, 84, 84, 0.8)">ยอมรับในข้อตกลงของผู้ให้บริการ Fit Start ข้อมูลเพิ่มเติม &nbsp;</Label> }
                    {auth.isLoggedIn() && auth.isTrainee() && <LinkStyle to="/detail" size="13px"><p>คลิกที่นี่</p></LinkStyle> }
                </LRBlock>
                <LRBlock style={{flexFlow: "row", justifyContent: "flex-end"}}>
                    {/* <LinkAndButtonBox disabled={this.state.disableCheckbox} onClick={this.signup} to="/login" cancleRegis color={col} linktext="ยกเลิกการสมัครสมาชิก" buttontext="ยืนยันการสมัคร"/> */}
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
