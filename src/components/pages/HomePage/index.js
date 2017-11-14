// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { DropdownMenu } from 'components'

const Warper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F9FAFC;
  padding: 500px 0 0 0;

  display: flex;
  align-items: center;

`

const HomePage = () => {
  let myArray = ['s','555','fsfsfdsfsdfsdf'];
  return (
    <Warper>
      <DropdownMenu width="500px" height="50px" menu={myArray}/>
    </Warper>
  )
}

export default HomePage
