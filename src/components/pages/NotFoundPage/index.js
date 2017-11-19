import React from 'react'

import { Label } from 'components'
import styled, { css } from 'styled-components'
import auth from '../../../auth'

const Wrapper = styled.div`
  width: 100w;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const NotFoundPage = () => {
  let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
  return (
    <Wrapper>
      <Label size="50vh" weight="normal" color= {color}>404</Label>
    </Wrapper>
  )
}

export default NotFoundPage
