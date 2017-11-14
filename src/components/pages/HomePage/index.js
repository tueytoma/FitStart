// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { ImageSelectButton } from 'components'
import { Button } from 'components'

const Warper = styled.div`
  width: 100vw;
  background-color: #F9FAFC;

  display: flex;
  align-items: center;
`

const HomePage = () => {
  return (
    <Warper>
      <Button to="" loginPage="true"> เข้าสู่ระบบ </Button>
    </Warper>
  )
}

export default HomePage
