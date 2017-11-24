// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Logo, LinkStyle, Textfield, SearchIcon, Label } from 'components'
import { hashHistory } from 'react-router'
import { font } from 'styled-theme'
import { Link } from 'react-router-dom'
import auth from '../../../auth'

const Wrapper = styled.div`
    width: calc(100% - 24px);
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 24px;

    font-family: Kanit;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    
    &:hover {
        background-color: rgba(249, 250, 252, 1);
        cursor:pointer;
    }
`

class MenuItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search:'',
            open: false,
        };
    }

    changeSearch = e => {
        this.setState({search : e.target.value})
    }

    onLogout = e => {
        auth.logout()
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return(
          <Wrapper>
                <p>{this.props.text}</p>
          </Wrapper>
        )
    }
}


export default MenuItem
