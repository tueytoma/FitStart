// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer} from 'components'
import { font } from 'styled-theme'

import { Link} from 'react-router-dom';
import api from '../../../api'
import auth from '../../../auth'

const Wrapper = styled.div`
  background-color: #F9FAFC;
  width: calc(100vw - 15px);
  display: flex;
  justify-content: center;

  align-self: center;
`
const InnerWrapper = styled.div`
  width: 70vw;

  display: flex;
  flex-direction: column;
  margin-top: 60px;
`

class CreateServicetPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    };
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";

    return (
      <Wrapper>
        <Topbar color={color}/>
        <InnerWrapper >
            <Footer color={color} />
        </InnerWrapper>
      </Wrapper>
    )
  }
}
export default CreateServicetPage
