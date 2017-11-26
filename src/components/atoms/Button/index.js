import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font } from 'styled-theme'
import { ifProp } from 'styled-tools'

const Button = styled.button`

    padding: auto 30px;
    border: 2px solid ${props => props.disabled ? "#c4c4c4" : props.dark ? "#F9FAFC" : props.color}; 
    border-radius: 100px;

    background-color: ${props => props.dark ? props.color : "#F9FAFC"};
    height: ${props => props.cancelregis ? "40px" : props.loginpage ? "40px" : props.height};
    width: ${props => props.cancelregis ? "175px" : props.loginpage ? "125px" : props.width};
    margin: 0 8px 0 0;
    

    font-family: ${font('primary')};
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    font-size: ${props => props.cancelregis ? "18px" : props.loginpage ? "16px" : props.size};
    color: ${props => props.disabled ? "#c4c4c4" : props.dark ? "#F9FAFC" : props.color}; 

    outline: none;
    cursor: pointer;

    &:hover {
        color: ${props => props.disabled ? "#c4c4c4" : props.dark ? props.color : "#F9FAFC"}; 
        background-color: ${props => props.disabled ? "#F9FAFC" : props.dark ? "#F9FAFC" : props.color}; 
        cursor: ${props => props.disabled ? "default" : "pointer"};
    }
`
  

export default Button;

