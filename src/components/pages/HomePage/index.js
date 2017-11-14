// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Checkbox } from 'components'

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
      <Checkbox/>
      <span> dddd </span>
    </Warper>
  )
}

export default HomePage
