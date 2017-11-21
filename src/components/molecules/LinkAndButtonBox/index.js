// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { LinkStyle, Button } from 'components'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`

class LinkAndButtonBox extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Wrapper>
                <LinkStyle to={this.props.to} loginPage={this.props.loginPage} cancleRegis={this.props.cancleRegis}> <p>{this.props.linktext}</p> </LinkStyle> 
                <Button disabled={this.props.disabled} onClick={this.props.onClick} color={this.props.color} style={{marginLeft: "16px"}} loginPage={this.props.loginPage} cancleRegis={this.props.cancleRegis} height={this.props.height} width={this.props.width} size={this.props.size}> {this.props.buttontext} </Button>
            </Wrapper>
        )
    }
}

export default LinkAndButtonBox
