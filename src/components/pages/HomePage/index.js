// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { InputBox } from 'components'

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
      <InputBox label="ชื่อผู้ใช้" width="400px" height="30px" placeholder="555"/>
    </Warper>
  )
}

export default HomePage
