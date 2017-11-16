import React from 'react'

import { Label } from 'components'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  width: 100w;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const NotFoundPage = () => {
  return (
    <Wrapper>
      <Label size="50vh" weight="normal" color= "rgba(84, 84, 84, 0.8)">404</Label>
    </Wrapper>
  )
}

export default NotFoundPage
