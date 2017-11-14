// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Label, TextfeildWithIcon, DropdownMenu } from 'components'

const Warper = styled.div`
  background-color: #F9FAFC;
  margin: 0 0 16px 20px;

  display: flex;
  flex-flow: column;
`

class InputBox extends React.Component {
    constructor(props) {
    super(props)
  }

    render() {
        return(
            <Warper>
            <Label textfeild> {this.props.label} </Label>
            {!this.props.dropdown && <TextfeildWithIcon placeholder= {this.props.placeholder} width={this.props.width} height={this.props.height} color= {this.props.color}/> }
            {this.props.dropdown && <DropdownMenu menu={this.props.menu} width={this.props.width} height={this.props.height} color= {this.props.color}/> }
          </Warper>
        )
    }
}


export default InputBox