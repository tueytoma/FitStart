// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Textfield, Tooltip, ErrorIcon, CorrectIcon} from 'components'

const Wrapper = styled.div`
    display: flex;
    align-items: center;

    margin: 14px 0 0 0;
`

class TextfieldWithIcon extends React.Component {
    constructor(props) {
    super(props)
  }

    render() {
        let none = true
        if(this.props.noneToolTip == null) none = false
        return(
            <Wrapper>
                <Textfield value={this.props.value} none={none} type={this.props.type} correct={this.props.correct} error={this.props.error} onChange={this.props.onChange} width={this.props.width} height={this.props.height} placeholder={this.props.placeholder} error={this.props.error} color={this.props.color}/> 
                {this.props.error==true && !none && <Tooltip reverse data-title="รูปแบบไม่ถูกต้อง กรุณากรอกข้อมูลใหม่" >
                    <span > <ErrorIcon/> </span>
                </Tooltip>}
                {this.props.correct== true ? <span > <CorrectIcon/> </span> : <span ></span > }
            </Wrapper>
        )
    }
}

export default TextfieldWithIcon
