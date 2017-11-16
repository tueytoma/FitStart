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

class NewPasswprdPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        error: false,
        username: '',
        password: '',
    };
  }

  toggleError = e => {
    if(!this.state.error)
      this.setState({error: true })
  }

  signin = e => {
    e.preventDefault();
    api.signin({username : this.state.username, password: this.state.password})
      .then((res)=>{
        console.log(res)
        auth.setCookieAndToken(res)
        this.props.history.push('/')
      },(err)=>{
        this.toggleError()
      })
  }

  changeUsername = e => {
    this.setState({username : e.target.value})
  }

  changePassword = e => {
    this.setState({password : e.target.value})
  }

  render() {
    return (
      <Wrapper>
        <Left>

        </Left>
        <Middle>
          <Header>
            <Label size="36px" weight="900" color="#202020">ตั้งรหัสผ่านใหม่</Label>
          </Header>
          <Form>
            <InputBox type="password" onChange={this.changePassword} error={this.state.error} label="รหัสผ่าน" placeholder="password" color="#F05939" width="500px" height="30px"/>
            <InputBox type="password" onChange={this.changePassword} error={this.state.error} label="ยืนยันรหัสผ่าน" placeholder="repassword" color="#F05939" width="500px" height="30px"/>
            {this.state.error ? <Label style={{margin: "12px 0 32px 0"}} size="12px" weight="500" color="#DC4444">รหัสผ่านและยืนยันรหัสผ่านมีค่าไม่ตรงกัน กรุณากรอกใหม่</Label> : <Label style={{margin: "12px 0 32px 0"}} size="12px"></Label>}
            <LinkAndButtonDiv>
              <LinkAndButtonBox onClick="" to="/login" loginPage color="#F05939" linktext="" buttontext="ยืนยัน"/>
            </LinkAndButtonDiv>
          </Form>
        </Middle>
        <Right>
          
        </Right>
      </Wrapper>
    )
  }
}
export default NewPasswprdPage
