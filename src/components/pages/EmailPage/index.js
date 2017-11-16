// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { ImageSelectButton, Label, InputBox, LinkAndButtonBox, LinkStyle } from 'components'
import { Link } from 'react-router-dom';
import api from '../../../api'
import auth from '../../../auth'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F9FAFC;

  display: flex;
`

const Left = styled.div`
  flex: 15;
  background-color: #202020;
`

const Middle = styled.div`
  flex: 50;
  background-color: #F9FAFC;
  display: flex;
  flex-direction: column ;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 32px 0 40px 0;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`

const Footer = styled.div`
  margin: auto 0 0 10%;
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: center;
`

const LinkAndButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 30%;
`

const Right = styled.div`
  flex: 35;
  background-color: #202020;

`

class EmailPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        error: false,
        email: '',
    };
  }

  sendEmail = e => {
    if(this.checkEmail(this.state.email)) this.setState({error: false})
    else this.setState({error: true })
    

  }

  checkEmail = (input) => {
    let check = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;  
    if(input.match(check)) return true
    else return false   
  }

  changeEmail = e => {
    this.setState({email : e.target.value})
  }

  render() {
    return (
      <Wrapper>
        <Left>

        </Left>
        <Middle>
          <Header>
            <Label size="36px" weight="900" color="#202020">กรอกอีเมลของคุณ</Label>
          </Header>
          <Form>
            <InputBox type="text" onChange={this.changeEmail} error={this.state.error} label="อีเมล" placeholder="email" color="#F05939" width="500px" height="30px"/>
            {this.state.error ? <Label style={{margin: "12px 0 32px 0"}} size="12px" weight="500" color="#DC4444">ไม่มีอีเมลนี้ในระบบ หรือ อีเมลผิดรูปแบบ</Label> : <Label style={{margin: "12px 0 32px 0"}} size="12px"></Label>}
            <LinkAndButtonDiv>
              <LinkAndButtonBox onClick={this.sendEmail} to="/login" loginPage color="#F05939" linktext="กลับไปหน้าล็อคอิน" buttontext="ส่งคำขอ"/>
            </LinkAndButtonDiv>
          </Form>
        </Middle>
        <Right>
          
        </Right>
      </Wrapper>
    )
  }
}
export default EmailPage
