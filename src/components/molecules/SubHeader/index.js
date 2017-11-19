// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Label } from 'components'


const Wrapper = styled.div`
  background-color: #EFEFEF;
  width: calc(100vw - 15px);
  height: 60px;
  display: flex;
  justify-content: center;

  align-self: center;
`
const InnerWrapper = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  
`

class SubHeader extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Wrapper>
        <InnerWrapper>
            <Label size="18px" weight="bold" color="#A4A4A4">{this.props.text}</Label>
        </InnerWrapper>
      </Wrapper>
    )
  }
}
export default SubHeader
