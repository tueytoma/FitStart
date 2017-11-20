// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label} from 'components'
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

const HeaderBlock = styled.div`
    align-self: flex-start;
    margin: 36px 0 35px 0;
    display: flex;
    flex-flow: column;
`
const queryString = require('query-string');
const parsed = queryString.parse(location.search)

class ServicePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        userName: this.props.match.params.user,
        serviceID: this.props.match.params.service,
    };
  }

  componentDidMount() {
    console.log(this.state.userName)
    console.log(this.state.serviceID)
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";

    return (
      <Wrapper>
        <Topbar color={color}/>
        <InnerWrapper >
            <HeaderBlock>
                <Label size="48px" weight="bolder" color="#202020">ข้อมูลบริการ</Label>
            </HeaderBlock>
            <Footer color={color} />
        </InnerWrapper>
      </Wrapper>
    )
  }
}
export default ServicePage
