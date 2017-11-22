// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Logo, LinkStyle, Textfield, SearchIcon, Label } from 'components'
import { Link } from 'react-router-dom'
import auth from '../../../auth'

const Wrapper = styled.div`
    background: ${props => props.color};
    position: fixed;
    top: 0;
    width: calc(100vw - 15px);
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
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
        this.state = {
            search:'',
        };
    }
    
    Search = e => {
        location.reload();
        // this.props.history.push({pathname: '/search/service', search: "?keyword=" + this.state.search})
    }

    changeSearch = e => {
        this.setState({search : e.target.value})
    }

    onLogout = e => {
        auth.logout()
    }

    render() {
        return(
          <Wrapper color={this.props.color}>
                <WrapperSide>
                    <Div margin="4.5px 5px 0 22px">
                        <LinkStyle to= "/" style={{opacity: "1"}}> <Logo color="#F9FAFC" width="91.5px" height="39px"/> </LinkStyle>
                    </Div>
                </WrapperSide>
                <WrapperInner>
                    <Div>
                        <Textfield onChange={this.changeSearch} placeholder="อยากฝึกฝนร่างกายเกี่ยวกับ... / อยากฝึกกับ..." width="45vw" height="32px" color="#F9FAFC"/>
                    </Div>
                    <Link to= {'/search/service?keyword=' + this.state.search} style={{textDecoration: "none"}}>
                        <a onClick={this.Search}><SearchIcon opacity="1" color="#F9FAFC"/></a>
                    </Link>
                    {auth.isLoggedIn() && auth.isTrainer() && <Div>
                        <LinkStyle to="/createservice" size="30px" style={{color: "#FFF", opacity: "1", marginLeft: "32px"}}>สร้างบริการ</LinkStyle>
                    </Div>}
                </WrapperInner>
                <WrapperSide style={{justifyContent: "center"}}>
                    {auth.isLoggedIn() ? 
                    <a onClick={auth.logout}><LinkStyle to="/" size="30px" style={{color: "#FFF", opacity: "1"}}>Logout</LinkStyle></a>
                    :
                    <LinkStyle to="/login" size="30px" style={{color: "#FFF", opacity: "1"}}>Login</LinkStyle>}
                </WrapperSide>
          </Wrapper>
        )
    }
}


export default Topbar
