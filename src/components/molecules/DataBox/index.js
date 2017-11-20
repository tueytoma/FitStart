// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label} from 'components'
import { font } from 'styled-theme'

import { Link} from 'react-router-dom';
import api from '../../../api'
import auth from '../../../auth'

const Wrapper = styled.div`
  width: calc(100% - 24px);
  display: flex;
  flex-direction: row;
  margin: 0 0 8px 24px;

  &:hover {
      background-color: #F0f0f0;
  }
`

const DataLeft = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

const DataRight = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

class DataBox extends React.Component {

  constructor(props) {
    super(props)

  }

  render() {

    return (
        <Wrapper>
            <DataLeft>
                <Label size="20px" weight="normal" color="rgba(84, 84, 84, 0.8)">{this.props.textTitle}</Label>
            </DataLeft>
            <DataRight>
                <Label size="20px" weight="bold" color={this.props.color}>{this.props.textDetail}</Label>
            </DataRight>
        </Wrapper>
    )
  }
}
export default DataBox
