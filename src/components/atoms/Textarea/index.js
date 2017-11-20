import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font } from 'styled-theme'
import { ifProp } from 'styled-tools'

const InputTextareaStyled = styled.textarea`
    border: ${props => props.error ? "1px solid #DC4444" : "1px solid #C4C3C3" };
    border-radius: 6px;

    padding: 2px 16px 4px 16px;
    background-color: #F9FAFC;
    width: calc(${props => props.width} - ${props => props.error || props.correct ? "17px" : "0px" });
    ${props => props.width};
    height: ${props => props.height};
    margin: 8px 8px 0 0;

    font-family: ${font('primary')};
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 16px;
    color: #202020;

    outline: none;

    &::placeholder {
        color: rgba(84, 84, 84, 0.2);
    }

    &:focus {
        width: calc(${props => props.width} - ${props => props.error || props.correct ? "17px" : "0px" });
        height: ${props => props.height};

        border: 2px solid ${props => props.color};
        box-shadow: 0px 0px 4px ${props => props.color};
        border-radius: 6px; 
    }
`

class Textarea extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <InputTextareaStyled error={this.props.error} onChange={this.props.onChange} rows="4" cols="50" placeholder= {this.props.placeholder} color= {this.props.color}/>
        )
    }
}

export default Textarea;

