import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font } from 'styled-theme'
import { ifProp } from 'styled-tools'

const Checkbox = styled.input.attrs({
	// we can define static props
	    type: 'checkbox',
    })`
        width: 20px;
        height: 20px;
        cursor: pointer;
        color: #73C276;
        border: 1px solid #757576;
        background #F9FAFC;
        margin: 0 6px 0 0;

        &:checked {
            cursor: pointer;
        }
    `;

export default Checkbox;

