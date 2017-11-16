// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Logo, LinkStyle, Textfield, SearchIcon, Label } from 'components'
import { Link } from 'react-router-dom'
import auth from '../../../auth'

const Wrapper = styled.div`
    background: #F05939;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const WrapperSide = styled.div`
    width: 15vw;
    display: flex;
`

const WrapperInner = styled.div`
    width: 70vw;
    display: flex;
    align-items: center;
`

const Div = styled.div`
    margin: ${props => props.margin};
`

class Topbar extends React.Component {
    constructor(props) {
    super(props)
  }

    Search = e => {
        alert('dsdfsfsf')
    }

    render() {
        return(
          <Wrapper>
                <WrapperSide>
                    <Div margin="2px 0 0 22px">
                        <LinkStyle to= "/" style={{opacity: "1"}}> <Logo color="#F9FAFC" width="91.5px" height="40.5px"/> </LinkStyle>
                    </Div>
                </WrapperSide>
                <WrapperInner>
                    <Div>
                        <Textfield placeholder="อยากฝึกฝนร่างกายเกี่ยวกับ... / อยากฝึกกับ..." width="45vw" height="32px" color="#F05939"/>
                    </Div>
                    <Link to= "/search" style={{textDecoration: "none"}}><a onClick={this.Search}><SearchIcon /></a> </Link>
                </WrapperInner>
                    {auth.isLoggedIn() ? 
                    <a onClick={auth.logout}><LinkStyle to="/login" size="30px" style={{color: "#FFF", opacity: "1"}}>Logout</LinkStyle></a>
                    :
                    <LinkStyle to="/login" size="30px" style={{color: "#FFF", opacity: "1"}}>Login</LinkStyle>}
                <WrapperSide>
                    
                </WrapperSide>
          </Wrapper>
        )
    }
}


export default Topbar
