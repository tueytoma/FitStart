// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { ImageSelectButton } from 'components'
import { Button } from 'components'
import api from '../../../api'

const Warper = styled.div`
  width: 100vw;
  background-color: #F9FAFC;

  display: flex;
  align-items: center;
`

const doSomething = (e) => {
  api.getUserByName('test2').then((err,res) => {
    if(err)
    console.log(err)
    else
    console.log(res)
  })
}

const HomePage = () => {
  return (
    <Warper>
      <Button onClick={doSomething} to="" cancleRegis="true" trainer> เข้าสู่ระบบ </Button>
    </Warper>
  )
}

export default HomePage
