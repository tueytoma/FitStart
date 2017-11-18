// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar } from 'components'
import { Link } from 'react-router-dom';
import api from '../../../api'
import auth from '../../../auth'

const Wrapper = styled.div`
`
const InnerWrapper = styled.div`
  height: 200vh;
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
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    return (
      <Wrapper>
        <Topbar color={color}/>
        <InnerWrapper>

        </InnerWrapper>
      </Wrapper>
    )
  }
}
export default HomePage
