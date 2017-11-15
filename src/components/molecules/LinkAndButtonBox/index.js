// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { LinkStyle, Button } from 'components'

const Warper = styled.div`
    display: flex;
    align-items: center;
`

class LinkAndButtonBox extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Warper>
                <LinkStyle to={this.props.to} loginPage={this.props.loginPage} cancleRegis={this.props.cancleRegis}> <p>{this.props.linktext}</p> </LinkStyle> 
                <Button color={this.props.color} style={{marginLeft: "16px"}} loginPage={this.props.loginPage} cancleRegis={this.props.cancleRegis}> {this.props.buttontext} </Button>
            </Warper>
        )
    }
}

export default LinkAndButtonBox
