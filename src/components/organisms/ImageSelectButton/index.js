// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { TraineeIcon, TrainerIcon, SelectIcon, Label, InputBox} from 'components'

const Warper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-self: flex-start;
`

const WarperInner = styled.div`
    width: 70vw;
    display: flex;
    flex-flow: column;
`

const HeaderBlock = styled.div`
    align-self: flex-start;
    margin: 36px 0 16px 0;
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

class ImageSelectButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            trainee: true,
            trainer: false
        };
    }

    traineeSelect = e => {
        this.setState({trainee: true, trainer: false})
    }

    trainerSelect = e => {
        this.setState({trainee: false, trainer: true})
    }

    render() {
        if(this.state.trainee) var col = "#F05939" 
        else var col = "#211F5E"
        return(
            <Warper>
                <WarperInner>
                    <HeaderBlock>
                        <Label size="48px" weight="bold" color="#202020">สมัครสมาชิก</Label>
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
                            <Label style={{marginBottom: "32px"}} size="24px" weight="500" color= {col}>ข้อมูลบัญชี</Label>
                            <InputBox label="ชื่อผู้ใช้งาน" placeholder="username" color={col} width="400px" height="30px"/>
                            <InputBox label="อีเมล" placeholder="e-mail" color={col} width="400px" height="30px"/>
                            <InputBox label="รหัสผ่าน" placeholder="password" color={col} width="400px" height="30px"/>
                            <InputBox label="ยืนยันรหัสผ่าน" placeholder="re-password" color={col} width="400px" height="30px"/>
                        </LRBlock>
                        <LRBlock >
                            <Label style={{marginBottom: "32px"}} size="24px" weight="500" color= {col}>ข้อมูลส่วนตัวผู้ใช้</Label>
                            <Div>
                                <InputBox label="ชื่อจริง" placeholder="firstname" color={col} width="200px" height="30px"/>
                                <InputBox label="นามสกุล" placeholder="lastname" color={col} width="200px" height="30px"/>
                            </Div>
                            <Div>
                                <InputBox dropdown label="ชื่อจริง" color={col} width="240px" height="38px" menu={['ชาย','หญิง','อื่น ๆ ']}/>
                                <InputBox label="นามสกุล" placeholder="lastname" color={col} width="200px" height="30px"/>
                            </Div>
                        </LRBlock>
                    </InputBlock>
                </WarperInner>
            </Warper>
        )
    }
}

export default ImageSelectButton
