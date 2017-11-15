// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { TraineeIcon, TrainerIcon, SelectIcon, Label, InputBox, Checkbox, Link, LinkAndButtonBox, LinkStyle} from 'components'
import { Switch, Route } from 'react-router-dom'
import api from '../../../api'

const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-self: flex-start;
    background-color: #F9FAFC;
`

const WrapperInner = styled.div`
    width: 70vw;
    display: flex;
    flex-flow: column;
`

const HeaderBlock = styled.div`
    align-self: flex-start;
    margin: 36px 0 35px 0;
    display: flex;
    flex-flow: column;
`

const SelectBlock = styled.div`
    align-self: center;
    display:flex;
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

const FooterBlock = styled.div`
    margin: 64px 0 53px 0;
    display:flex;
`


const Div = styled.div`
    display: flex;
`

const ImageButton = styled.button`
    background: transparent;
    border: ${props => props.select ? `5px solid `+ props.color : "5px solid #C4C4C4;" };
    box-shadow: ${props => props.select ? `0px 0px 10px `+ props.color : `0px 0px 0px #C4C4C4`};
    box-sizing: border-box;
    border-radius: 10px;
    width: 481.6px;
    height: 273.6px;
    outline: none;
    cursor: pointer;

    &:hover {
        border: 5px solid ${props => props.color};
        box-shadow: 0px 0px 0px ${props => props.color};
    }
`

class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            trainee: true,
            trainer: false,
            username: '',
            password: '',
            repassword: '',
            email: '',
            first_name: '',
            last_name: '',
            gender: '',
            telephone_number: '',
            address: '',
        };
    }

    traineeSelect = e => {
        this.setState({trainee: true, trainer: false})
    }

    trainerSelect = e => {
        this.setState({trainee: false, trainer: true})
    }

    changeUsername = e => {
        this.setState({username : e.target.value})
      }

    changeEmail = e => {
        this.setState({email : e.target.value})
    }
    
    changePassword = e => {
        this.setState({password : e.target.value})
    }

    changeRepassword = e => {
        this.setState({repassword : e.target.value})
    }

    changeFirstname = e => {
        this.setState({first_name : e.target.value})
    }

    changeLastname = e => {
        this.setState({last_name : e.target.value})
    }

    changeTelephoneNumber = e => {
        this.setState({telephone_number : e.target.value})
    }

    changeGender = e => {
        this.setState({gender : e.target.value})
    }

    changeAddress = e => {
        this.setState({address : e.target.value})
    }

    signup = e => {
        let data = {
            username : this.state.username,
            password : this.state.password,
            email : this.state.email,
            first_name : this.state.first_name,
            last_name : this.state.last_name,
            gender : this.state.gender == 'ชาย' ? 'Male' : (this.state.gender == 'หญิง' ? 'Female' : 'Other'),
            address : this.state.address,
            telephone_number : this.state.telephone_number,
            role : this.state.trainer ? 'Trainer' : 'Trainee',
        }
        console.log(data)
        api.signup(data)
            .then((res)=>{
                console.log(res)
            })
    }

    render() {
        if(this.state.trainee) var col = "#F05939" 
        else var col = "#211F5E"
        return(
            <Wrapper>
                <WrapperInner>
                    <HeaderBlock>
                        <Label size="48px" weight="bolder" color="#202020">สมัครสมาชิก</Label>
                        <Label style={{marginTop: "-2px"}} size="24px" weight="500" color="rgba(32, 32, 32, 0.7)">เลือกประเภทของการสมัคร</Label>
                    </HeaderBlock>
                    <SelectBlock>
                        {this.state.trainee ? <SelectIcon color="#F05939"/> : <SelectIcon opacity="0"/>}
                        <ImageButton select={this.state.trainee} color="#F05939" onClick={this.traineeSelect} style={{margin: "0 60px 0 16px"}}><TraineeIcon opacity={this.state.trainee ? "1" : "0.4"}/></ImageButton>
                        <ImageButton select={this.state.trainer} color="#211F5E" onClick={this.trainerSelect} style={{margin: "0 16px 0 0"}}><TrainerIcon opacity={this.state.trainer ? "1" : "0.4"}/></ImageButton>
                        {this.state.trainer ? <SelectIcon color="#211F5E"/> : <SelectIcon opacity="0"/>}
                    </SelectBlock>
                    <InputBlock>
                        <LRBlock style={{marginRight: "8px"}}>
                            <Label style={{marginBottom: "32px"}} size="24px" weight="800" color= {col}>1. ข้อมูลบัญชี</Label>
                            <InputBox onChange={this.changeUsername} label="ชื่อผู้ใช้งาน" placeholder="username" color={col} width="400px" height="30px"/>
                            <InputBox onChange={this.changeEmail} label="อีเมล" placeholder="e-mail" color={col} width="400px" height="30px"/>
                            <InputBox onChange={this.changePassword} label="รหัสผ่าน" placeholder="password" color={col} width="400px" height="30px"/>
                            <InputBox onChange={this.changeRepassword} label="ยืนยันรหัสผ่าน" placeholder="re-password" color={col} width="400px" height="30px"/>
                        </LRBlock>
                        <LRBlock >
                            <Label style={{marginBottom: "32px"}} size="24px" weight="800" color= {col}>2. ข้อมูลส่วนตัวผู้ใช้</Label>
                            <Div>
                                <InputBox onChange={this.changeFirstname} error={true} label="ชื่อจริง" placeholder="firstname" color={col} width="200px" height="30px"/>
                                <InputBox onChange={this.changeLastname} label="นามสกุล" placeholder="lastname" color={col} width="200px" height="30px"/>
                            </Div>
                            <Div>
                                <InputBox onChange={this.changeGender} error={true} style={{marginRight: "16px"}} dropdown label="เพศ" color={col} width="240px" height="38px" menu={['ชาย','หญิง','อื่น ๆ ']}/>
                                <InputBox onChange={this.changeTelephoneNumber} label="เบอร์โทรศัพท์" placeholder="xxx-xxx-xxxx" color={col} width="200px" height="30px"/>
                            </Div>
                            <InputBox onChange={this.changeAddress} label="ที่อยู่อาศัย" placeholder="location" color={col} textarea/>
                        </LRBlock>
                    </InputBlock>
                    <FooterBlock>
                        <LRBlock style={{flexFlow: "row", alignItems: "center"}}>
                            <Checkbox/> 
                            <Label size="13px" weight="normal" color= "rgba(84, 84, 84, 0.8)">ยอมรับในข้อตกลงของผู้ให้บริการ Fit Start ศึกษาข้อมูลเพิ่มเติม &nbsp;</Label>
                            <LinkStyle to="/detail" size="13px"><p>คลิกที่นี่</p></LinkStyle>
                        </LRBlock>
                        <LRBlock style={{flexFlow: "row", justifyContent: "flex-end"}}>
                            <LinkAndButtonBox onClick={this.signup} to="/login" cancleRegis color={col} linktext="ยกเลิกการสมัครสมาชิก" buttontext="ยืนยันการสมัคร"/>
                        </LRBlock>
                    </FooterBlock >
                </WrapperInner>
            </Wrapper>
        )
    }
}

export default RegisterPage
