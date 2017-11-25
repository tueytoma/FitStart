import React from 'react'

import { Label, Topbar } from 'components'
import styled, { css } from 'styled-components'
import auth from '../../../auth'

const Wrapper = styled.div`
  width: calc(100vw - 15px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`

const NotFoundPage = () => {
  let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
  return (
    <Wrapper>
      <Topbar color={color}/>
      <Label size="50vh" weight="normal" color= {color}>404</Label>
    </Wrapper>
  )
}

export default NotFoundPage
