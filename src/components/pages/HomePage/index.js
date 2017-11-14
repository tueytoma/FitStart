// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { ImageSelectButton } from 'components'

const Warper = styled.div`
  width: 100vw;
  background-color: #F9FAFC;

  display: flex;
  align-items: center;
`

const HomePage = () => {
  return (
    <Warper>
      <ImageSelectButton/>
    </Warper>
  )
}

export default HomePage
