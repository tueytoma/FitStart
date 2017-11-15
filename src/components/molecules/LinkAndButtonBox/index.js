// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import styled, { css } from 'styled-components'
import { Link, Button } from 'components'

const Warper = styled.div`
    display: flex;
    align-items: center;
`

class LinkAndButtonBox extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Warper>
                <Link to="#" cancleRegis> <p>ยกเลิกการสมัครสมาชิก</p> </Link> 
                <Button color={this.props.color} style={{marginLeft: "16px"}} cancleRegis> ยืนยันการสมัคร </Button>
            </Warper>
        )
    }
}

export default LinkAndButtonBox
