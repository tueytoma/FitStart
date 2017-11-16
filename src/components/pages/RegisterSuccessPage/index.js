// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Label, Button, EmailSuccessIcon, Logo } from 'components'
import { Link } from 'react-router-dom';


const Wrapper = styled.div`
    width: calc(100vw - 0px);
    height: 100vh; 
    background-color: #F9FAFC;
`

const Header = styled.div`
    width: 100vw;
    height: 40vh;
    background-color: #F05939;
`

const Div = styled.div`
    padding: ${props => props.padding};
`

const Bottom = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: -40vh;
    z-index: -1;
`

class RegisterSuccessPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        
    };
  }

  onClick = e => {
        this.props.history.push('/login')
  }

  render() {
    return (
        <Wrapper>
            <Header>
                <Div padding="20px 0 0 20px">
                     <Logo color="#F9FAFC" width="91.5px" height="40.5px"/> 
                </Div>
            </Header>
            <Bottom>
                <EmailSuccessIcon width="63.12vh" height="40vh"/>
                <Label style={{margin: "0 auto 48px auto"}} size="3vw" weight="900" color="">ยินดีด้วยท่านสามารถใช้งานระบบเราได้แล้วขณะนี้</Label>
                <Button onClick={this.onClick} color="#F05939" height="70px" width="400px" size="25px">กลับเข้าสู่หน้าเข้าสู่ระบบ</Button>
            </Bottom>
        </Wrapper>
    )
  }
}
export default RegisterSuccessPage
