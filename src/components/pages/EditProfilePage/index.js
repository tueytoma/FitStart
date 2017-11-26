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

const FooterBlock = styled.div`
    margin: 16px 0 0 0;
    display:flex;
`

class EditProfilePage extends React.Component {

  constructor(props) {
        super(props)
        this.state = {
            _id: auth.getUser()._id,
            role: auth.getUser().role,
            username : auth.getUser().username,
            email : auth.getUser().email,
            firstName : auth.getUser().firstName,
            lastName : auth.getUser().lastName,
            gender : utils.getGenderText(auth.getUser().gender),
            address : auth.getUser().address,
            telephoneNumber : auth.getUser().telephoneNumber,
            firstNamePass: true,
            lastNamePass: true,
            genderPass:true,
            telPass:true,
            addressPass:true,
            usernamePass:true,
            emailPass:true,

            currentPassword:'',
            newPassword:'',
            veriyfyPassword:'',
            currentPasswordPass:true,
            verifyPasswordPass:true,
            newPasswordPass:true,
            passEqualrepass:false,

            open: false,
            open2: false,
        };
    }

    componentDidMount() {
        if(!this.state.end) {this.interval = setInterval(() => this.tick(), 100)}
        else {}
    }

    tick() {
        if(this.state.newPassword == this.state.verifyPassword && this.state.newPasswordPass && this.state.verifyPasswordPass && this.state.newPassword != '' && this.state.verifyPassword != '') 
        this.setState({passEqualrepass: true})
        else this.setState({passEqualrepass: false})
    }

    componentWillUnmount(){		
        clearInterval(this.interval)		
    }

    saveDetail = () => {
        let data = {
            email : this.state.email,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            gender : utils.getGenderCode(this.state.gender),
            address : this.state.address,
            telephoneNumber : this.state.telephoneNumber,
        }

        if(this.validate()){
            api.editUserById(this.state._id, data).then(res=>{
                if(res.success){
                    auth.setCookieAndToken(res)
                    this.setState({open: true});
                } 
            },err => {alert('failure')})
        }
    }

    savePassword = () => {
        let data = {
            currentPassword : this.state.currentPassword,
            newPassword : this.state.newPassword,
            verifyPassword : this.state.verifyPassword,
        }
        if(this.state.passEqualrepass && this.validate2()){
            api.renewPassword(data).then(res=>{
                if(res.success){
                    this.setState({currentPasswordPass : true})
                    this.setState({open: true});
                }
            },err => { this.setState({currentPasswordPass : false})})
        }
    }

    deleteUser = () => {
        api.removeUserById(this.state._id).then(res=>{
            if(res.success){
                this.setState({open2: false});
                this.props.history.push('/')
                auth.logout()
            } 
        },err => {alert('failure')})
    }

    changeUsername = e => {
        this.setState({username : e.target.value})
    }

    changeEmail = e => {
        this.setState({email : e.target.value})
    }

    changeFirstname = e => {
        this.setState({firstName : e.target.value})
    }

    changeLastname = e => {
        this.setState({lastName : e.target.value})
    }

    changeTelephoneNumber = e => {
        this.setState({telephoneNumber : e.target.value})
    }

    changeGender = e => {
        this.setState({gender : e.target.value})
    }

    changeAddress = e => {
        this.setState({address : e.target.value})
    }

    changeCurrentPassword = e => {
        this.setState({currentPassword : e.target.value})
    }

    changeNewPassword = e => {
        this.setState({newPassword : e.target.value})
    }

    changeVerifyPassword = e => {
        this.setState({verifyPassword : e.target.value})
    }

    checkEnglish = (input) => {
        let check = /^[0-9a-zA-Z]+$/;  
        if(String(input).match(check)) return true
        else return false  
    }

    checkTelephoneNumber = (input) => {
        let check = /[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/;  
        if(input.match(check)) return true
        else return false 
    }
    
    checkEmail = (input) => {
        let check = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;  
        if(input.match(check)) return true
        else return false 
    }

    checkAddress = (input) => {
        let check = /^[0-9a-zA-Zก-ฮๆไำะัี้่าิืใๅุึ+๐-๙ู"ํ๊ฯ,/ฤโ็๋()ฺ์?ฦ., ]+$/;  
        if(input.match(check)) return true
        else return false 
    }

    validate = (e) => {
        var check = 0

        if(this.state.firstName.length<1 || this.state.firstName.length>20 || !this.checkEnglish(this.state.firstName)) {check--; this.setState({firstNamePass : false}) }
        else this.setState({firstNamePass : true})
        if(this.state.lastName.length<1 || this.state.lastName.length>20 || !this.checkEnglish(this.state.lastName)) {check--; this.setState({lastNamePass : false}) }
        else this.setState({lastNamePass : true})
        if(this.state.gender == 'ps') {check--; this.setState({genderPass : false})}
        else this.setState({genderPass : true})
        if(this.state.address.length<1 || this.state.address.length >300 || !this.checkAddress(this.state.address)) {check--; this.setState({addressPass : false}) }
        else this.setState({addressPass : true})
        if(!this.checkTelephoneNumber(this.state.telephoneNumber)) {check--; this.setState({telPass : false}) }
        else this.setState({telPass : true})
        if(!this.checkEmail(this.state.email)) {check--; this.setState({emailPass:false}) }
        else this.setState({emailPass:true})

        return check==0
    }

    validate2 = (e) => {
        var check = 0

        if(this.state.newPassword.length <8 || this.state.newPassword.length >20 || !this.checkEnglish(this.state.newPasswordPass)) {check--; this.setState({newPasswordPass : false}) }
        else this.setState({newPasswordPass : true})
        if(this.state.verifyPassword !== this.state.newPassword) {check--; this.setState({verifyPasswordPass : false}) }
        else this.setState({verifyPasswordPass : true})

        return check==0
    }

    handleOpen = () => {
        this.setState({open: true});
    }
    
    handleClose = () => {
        this.setState({open: false});
    }

    handleOpen2 = () => {
        this.setState({open2: true});
    }
    
    handleClose2 = () => {
        this.setState({open2: false});
    }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    const actions = [
        <Button style={{marginBottom: "32px"}} onClick={this.handleClose} color={color} height="40px" width="231px" size="18px">รับทราบ</Button>,
    ];

    const actions2 = [
        <Button dark style={{marginBottom: "32px"}} onClick={this.deleteUser} color="#DC4444" height="40px" width="231px" size="18px">ยืนยันการลบบัญชี</Button>,
    ];

    return (
      <Wrapper id="top">
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: "#F9FAFC"}}
          bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#F9FAFC"}}
          contentStyle={{width:'60%',maxWidth: 'none'}}
        >
          <EditSuccessIcon />
          <Label style={{marginLeft: "12px"}} weight="bolder" size="48px" color={color}>ข้อมูลของท่านได้ถูกแก้ไขเรียบร้อยแล้ว</Label>
        </Dialog>
        <Dialog
          actions={actions2}
          modal={false}
          open={this.state.open2}
          onRequestClose={this.handleClose2}
          actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: "#DC4444"}}
          bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#DC4444"}}
          contentStyle={{width:'60%',maxWidth: 'none'}}
        >
          <DeleteUserIcon />
          <Label weight="bolder" size="48px" color="#F9FAFC">คุณแน่ใจใช้ไหมที่จะลบบัญชี</Label>
          <Label weight="bolder" size="24px" color="#F9FAFC">(จิ้มข้างนอกหน้าต่างหากไม่มั้นใจ)</Label>
        </Dialog>
        <Topbar color={color}/>
        { this.props.match.params.user == this.state.username ?
        <InnerWrapper >
            <HeaderBlock>
                <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">แก้ไขข้อมูลส่วนตัว</Label>
            </HeaderBlock>
            <InputBlock>
                <LRBlock style={{marginRight: "8px"}}>
                    <Label style={{marginBottom: "32px"}} size="24px" weight="800" color= {color}>1. ข้อมูลบัญชี</Label>
                    <InputBox disabled={true} value={this.state.role == "Trainee" ? "ผู้ต้องการออกกำลังกาย" : "เทรนเนอร์"} type="text" label="ประเภทของผู้ใช้งาน" placeholder="role" color={color} width="400px" height="30px"/>
                    <InputBox disabled={true} value={this.state.username} type="text" label="ชื่อผู้ใช้งาน" placeholder="username" color={color} width="400px" height="30px"/>
                    <InputBox value={this.state.email} type="text" onChange={this.changeEmail} error={!this.state.emailPass} label="อีเมล" placeholder="e-mail" color={color} width="400px" height="30px"/>
                </LRBlock>
                <LRBlock >
                    <Label style={{marginBottom: "32px"}} size="24px" weight="800" color= {color}>2. ข้อมูลส่วนตัวผู้ใช้</Label>
                    <Div>
                        <InputBox value={this.state.firstName} type="text" onChange={this.changeFirstname} error={!this.state.firstNamePass} label="ชื่อจริง" placeholder="firstname" color={color} width="200px" height="30px"/>
                        <InputBox value={this.state.lastName} type="text" onChange={this.changeLastname} error={!this.state.lastNamePass} label="นามสกุล" placeholder="lastname" color={color} width="200px" height="30px"/>
                    </Div>
                    <Div>
                        <InputBox value={this.state.gender} onChange={this.changeGender} error={!this.state.genderPass} style={{marginRight: "4px"}} dropdown label="เพศ" color={color} width="240px" height="38px" menu={['ชาย','หญิง','อื่น ๆ ']}/>
                        <InputBox value={this.state.telephoneNumber} type="text" onChange={this.changeTelephoneNumber} error={!this.state.telPass} label="เบอร์โทรศัพท์" placeholder="xxx-xxx-xxxx" color={color} width="200px" height="30px"/>
                    </Div>
                    <InputBox value={this.state.address} onChange={this.changeAddress} error={!this.state.addressPass} label="ที่อยู่อาศัย" placeholder="location" color={color} textarea/>
                </LRBlock>
            </InputBlock>
            <FooterBlock>
                <LRBlock style={{flexFlow: "row", alignItems: "center"}}></LRBlock>
                <LRBlock style={{flexFlow: "row", justifyContent: "flex-end"}}>
                    <LinkAndButtonBox onClick={this.saveDetail} to="/" color={color} 
                    height="40px" width="210px" size="18px" sizeLink="18px"
                    linktext="ยกเลิกการแก้ไข" buttontext="ยืนยันการแก้ไข"/>
                </LRBlock>
            </FooterBlock >
            <InputBlock>
            <LRBlock style={{marginRight: "8px"}}>
                <Label style={{marginBottom: "32px"}} size="24px" weight="800" color= {color}>3. รหัสผ่านเข้าสู่ระบบ</Label>
                <InputBox onChange={this.changeCurrentPassword} error={!this.state.currentPasswordPass} type="password" label="รหัสผ่านเดิม" placeholder="old-password" color={color} width="400px" height="30px"/>
            </LRBlock>
            <LRBlock></LRBlock>
            </InputBlock>
            <InputBlock style={{marginTop: "0"}}>
                <LRBlock >
                    <InputBox onChange={this.changeNewPassword} correct={this.state.passEqualrepass} error={!this.state.newPasswordPass} type="password" label="รหัสผ่านใหม่" placeholder="new-password" color={color} width="400px" height="30px"/>
                </LRBlock>
                <LRBlock >
                    <InputBox onChange={this.changeVerifyPassword} correct={this.state.passEqualrepass} error={!this.state.verifyPasswordPass} type="password" label="ยืนยันรหัสผ่าน" placeholder="re-password" color={color} width="400px" height="30px"/>
                </LRBlock>   
            </InputBlock>
            <FooterBlock>
                <LRBlock style={{flexFlow: "row", alignItems: "center"}}></LRBlock>
                <LRBlock style={{flexFlow: "row", justifyContent: "flex-end"}}>
                    <LinkAndButtonBox onClick={this.savePassword} to="/" color={color} 
                    height="40px" width="210px" size="18px" sizeLink="18px"
                    linktext="ยกเลิกการแก้ไขรหัสผ่าน" buttontext="ยืนยันการแก้ไขรหัสผ่าน"/>
                </LRBlock>
            </FooterBlock >
            <InputBlock>
                <LRBlock style={{marginRight: "8px"}}>
                    <Label style={{marginBottom: "32px"}} size="24px" weight="800" color= {color}>4. การลบบัญชีผู้ใช้</Label>
                </LRBlock>
                <LRBlock ></LRBlock>
            </InputBlock>
            <InputBlock style={{marginTop: "0", flexDirection: "column", alignItems: "center"}}>
                <Label style={{marginBottom: "16px"}} size="24px" weight="bold" color="rgba(220, 68, 68, 0.9)">เมื่อลบบัญชีผู้ใช้แล้วคุณจะไม่สามารถกู้ข้อมูลกลับมาได้อีกไม่ว่ากรณีใด ๆ </Label>
                <Button style={{marginBottom: "32px"}} onClick={this.handleOpen2} color="rgba(220, 68, 68, 0.9)" height="50px" width="231px" size="24px">ลบบัญชีผู้ใช้</Button>,
            </InputBlock>
            <Footer color={color} />
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
export default EditProfilePage
