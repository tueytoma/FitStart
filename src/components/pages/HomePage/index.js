// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { ImageSelectButton, Label, InputBox, LinkAndButtonBox, LinkStyle } from 'components'
import { Link } from 'react-router-dom';
import api from '../../../api'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F9FAFC;
  display: flex;
`

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        
    };
  }

  toggleError = e => {
    if(!this.state.error)
      this.setState({error: true })
  }

  render() {
    return (
      <Wrapper>
        <LinkStyle to="/login" size="13px"><p>LOGIN</p></LinkStyle>
      </Wrapper>
    )
  }
}
export default HomePage
