import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font } from 'styled-theme'
import { ifProp } from 'styled-tools'
import NavLink from 'react-router-dom/NavLink'
  

const styles = css`
    font-family: ${font('primary')};
    font-style: normal;
    text-decoration: none;
    font-size: ${props => props.size};
    font-weight: ${props => props.weight};
    line-height: normal;
    color: ${props => props.color};
    opacity: ${props => props.decoration ? "1": "0.8"};
    z-index: 10;
    &:hover {
        opacity: 1;
        text-decoration: ${props => props.decoration ? "underline": "none"};
        color: ${props => props.colorhover};
    }
`

const StyledNavLink = styled(({
  ...props
}) => <NavLink {...props} />)`${styles}`

const LinkStyle2 = ({ ...props }) => {
      return <StyledNavLink {...props} />
  }

export default LinkStyle2;

