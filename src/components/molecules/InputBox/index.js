// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Label, TextfeildWithIcon, DropdownMenu, Textarea } from 'components'

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
            {!this.props.dropdown && !this.props.textarea && <TextfeildWithIcon error={this.props.error} placeholder= {this.props.placeholder} width={this.props.width} height={this.props.height} color= {this.props.color}/> }
            {this.props.dropdown && !this.props.textarea && <DropdownMenu menu={this.props.menu} width={this.props.width} height={this.props.height} color= {this.props.color}/> }
            {!this.props.dropdown && this.props.textarea && <Textarea rows="4" cols="50" placeholder= {this.props.placeholder} color= {this.props.color}/>}
          </Warper>
        )
    }
}


export default InputBox
