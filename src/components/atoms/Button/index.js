import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font } from 'styled-theme'
import { ifProp } from 'styled-tools'

const Button = styled.button`
    border: 1px solid #F05939;
    border-radius: 100px;

    background-color: #F9FAFC;
    width: ${props => props.cancleRegis ? "95" : props.loginPage ? "29" : props.width};
    height: ${props => props.cancleRegis ? "175" : props.loginPage ? "40" : props.height};
    margin: 0 8px 0 0;
    

    font-family: ${font('primary')};
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: ${props => props.cancleRegis ? "18px" : props.loginPage ? "12px" : props.size};
    color: #F05939;

    outline: none;

    &:hover {
        color: #F4F4F4;
        background-color: #F05939;
    }
`

export default Button;

