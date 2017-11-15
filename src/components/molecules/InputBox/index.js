// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Label, TextfieldWithIcon, DropdownMenu, Textarea } from 'components'

const Wrapper = styled.div`
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
          <Wrapper>
            <Label textfield> {this.props.label} </Label>
            {!this.props.dropdown && !this.props.textarea && <TextfieldWithIcon onChange={this.props.onChange} error={this.props.error} placeholder= {this.props.placeholder} width={this.props.width} height={this.props.height} color= {this.props.color}/> }
            {this.props.dropdown && !this.props.textarea && <DropdownMenu onChange={this.props.onChange} menu={this.props.menu} width={this.props.width} height={this.props.height} color= {this.props.color}/> }
            {!this.props.dropdown && this.props.textarea && <Textarea onChange={this.props.onChange} rows="4" cols="50" placeholder= {this.props.placeholder} color= {this.props.color}/>}
          </Wrapper>
        )
    }
}


export default InputBox
