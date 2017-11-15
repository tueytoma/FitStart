import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font } from 'styled-theme'
import { ifProp } from 'styled-tools'

const Label = styled.span`
    font-family: ${font('primary')};
    font-style: normal;
    font-size: ${props => props.textfield == true ? "18px" : props.error ? "12px" : props.size};
    font-weight: ${props => props.textfield == true ? "normal" : props.error ? "300" : props.weight};
    color: ${props => props.textfield == true ? "#545454" : props.error ? "#DC4444" : props.color};
`

export default Label;

