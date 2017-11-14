// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Label, TextfeildWithIcon } from 'components'

const Warper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F9FAFC;
  padding: 500px 0 0 0;

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
            <TextfeildWithIcon placeholder= {this.props.placeholder} width={this.props.width} height={this.props.height}/>
          </Warper>
        )
    }
}


export default InputBox
