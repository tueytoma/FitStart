// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Label } from 'components'


const Wrapper = styled.div`
  background-color: ${props => props.color};
  width: calc(100vw - 15px);
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 56px;

  align-self: center;
`

class Footer extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Wrapper color={this.props.color}>
        <Label style={{opacity: "0.8"}} size="18px" weight="light" color="#F9FAFC;">© 2017 Untitled Team SE Sec 1</Label>
      </Wrapper>
    )
  }
}
export default Footer
