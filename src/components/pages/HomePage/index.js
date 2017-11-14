// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { TextfeildWithIcon } from 'components'

const Warper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F9FAFC;
  padding: 500px 0 0 0;

`

const HomePage = () => {
  return (
    <Warper>
      <TextfeildWithIcon width="300px" height="30px" error/>
    </Warper>
  )
}

export default HomePage
