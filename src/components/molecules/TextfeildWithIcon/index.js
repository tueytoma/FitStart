// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Textfeild,Tooltip, ErrorIcon, CorrectIcon} from 'components'

const Warper = styled.div`
    display: flex;
    align-items: center;

    margin: 14px 0 0 0;
`

class TextfeildWithIcon extends React.Component {
    constructor(props) {
    super(props)
  }

    render() {
        return(
            <Warper>
                <Textfeild width={this.props.width} height={this.props.height} placeholder={this.props.placeholder} error={this.props.error}/> 
                <Tooltip reverse data-title="รูปแบบไม่ถูกต้อง กรุณากรอกข้อมูลใหม่" >
                    {this.props.error ? <span > <ErrorIcon/> </span> : <span ></span > }
                </Tooltip>
                {this.props.correct ? <span > <CorrectIcon/> </span> : <span ></span > }
            </Warper>
        )
    }
}

export default TextfeildWithIcon
