import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font } from 'styled-theme'
import { ifProp } from 'styled-tools'
import NavLink from 'react-router-dom/NavLink'
  

const styles = css`
    font-family: ${font('primary')};
    font-style: normal;
    text-decoration: underline;
    font-size: ${props => props.cancleRegis ? "18px" : props.loginPage ? "16px" : props.size};
    font-weight: normal;
    line-height: normal;
    color: #545454;
    opacity: 0.8;
    &:hover {
      color: #1A1A1A;
    }
`

const StyledNavLink = styled(({
  ...props
}) => <NavLink {...props} />)`${styles}`

const LinkStyle = ({ ...props }) => {
      return <StyledNavLink {...props} />
  }

export default LinkStyle;

