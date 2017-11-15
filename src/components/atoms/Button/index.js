import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font } from 'styled-theme'
import { ifProp } from 'styled-tools'

const Button = styled.button`
    padding: auto 30px;
    border: 1px solid ${props => props.color};
    border-radius: 100px;

    background-color: #F9FAFC; 
    height: ${props => props.cancleRegis ? "40px" : props.loginPage ? "29px" : props.height};
    width: ${props => props.cancleRegis ? "175px" : props.loginPage ? "95px" : props.width};
    margin: 0 8px 0 0;
    

    font-family: ${font('primary')};
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: ${props => props.cancleRegis ? "18px" : props.loginPage ? "12px" : props.size};
    color: ${props => props.color};

    outline: none;
    cursor: pointer;

    &:hover {
        color: #F4F4F4;
        background-color: ${props => props.color};
    }
`
  

export default Button;

