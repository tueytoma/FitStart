// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Textfeild,Tooltip } from 'components'

const Warper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F9FAFC;
  padding: 500px 0 0 0;
`

const HomePage = () => {
  return (
    <Warper>
      <Textfeild/> <span> dddd </span>
      <Tooltip reverse data-title="Another tooltip aligned differently" >
        <span> dddd </span>
      </Tooltip>
    </Warper>
  )
}

export default HomePage
