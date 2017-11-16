import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font } from 'styled-theme'
import { ifProp } from 'styled-tools'

const Button = styled.button`

    padding: auto 30px;
    border: 2px solid ${props => props.disabled ? "#c4c4c4" : props.color}; 
    border-radius: 100px;

    background-color: #F9FAFC;
    height: ${props => props.cancleRegis ? "40px" : props.loginPage ? "40px" : props.height};
    width: ${props => props.cancleRegis ? "175px" : props.loginPage ? "125px" : props.width};
    margin: 0 8px 0 0;
    

    font-family: ${font('primary')};
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    font-size: ${props => props.cancleRegis ? "18px" : props.loginPage ? "16px" : props.size};
    color: ${props => props.disabled ? "#c4c4c4" : props.color}; 

    outline: none;
    cursor: pointer;

    &:hover {
        color: ${props => props.disabled ? "#c4c4c4" : "#F9FAFC"}; 
        background-color: ${props => props.disabled ? "#F9FAFC" : props.color}; 
        cursor: ${props => props.disabled ? "default" : "pointer"};
    }
`
  

export default Button;

