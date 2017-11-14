// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Label } from 'components'

const Warper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F9FAFC;
  padding: 500px 0 0 0;

  display: flex;
  align-items: center;
`

const HomePage = () => {
  return (
    <Warper>
      <Label size="36px" weight="500" color="#202020" error>เข้าสู่ระบบ Fit Start</Label>
    </Warper>
  )
}

export default HomePage
