import React from 'react'
import styled from 'styled-components'

const SVG = styled.svg`
&:hover {
  cursor:pointer;
  fill: ${props => props.color};
  fill-opacity:1;
}
`


export default class DeletetServiceIcon extends React.Component {

  render() {
    return (
        <SVG fill="#202020"  fillOpacity="0.2" color="#D44444" width={this.props.width} height={this.props.height} viewBox="0 0 33 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <g id="Canvas" transform="translate(-4987 -6685)">
                <g id="forbidden-mark">
                    <g id="Vector">
                        <use href="#path0_fill" transform="translate(4987 6685)"/>
                    </g>
                </g>
            </g>
            <defs>
                <path id="path0_fill" d="M 27.7535 0.198297C 27.4891 -0.0660989 27.0564 -0.0660989 26.792 0.198297L 16.9809 10.0093C 16.7165 10.2737 16.2837 10.2737 16.0193 10.0093L 6.2084 0.198297C 5.94401 -0.0660989 5.51124 -0.0660989 5.24684 0.198297L 0.198298 5.24662C -0.0660992 5.51102 -0.0660992 5.94378 0.198298 6.20818L 10.0094 16.0192C 10.2738 16.2836 10.2738 16.7164 10.0094 16.9808L 0.198298 26.7918C -0.0660992 27.0562 -0.0660992 27.489 0.198298 27.7534L 5.24665 32.8017C 5.51105 33.0661 5.94382 33.0661 6.20822 32.8017L 16.0193 22.9907C 16.2837 22.7263 16.7165 22.7263 16.9809 22.9907L 26.7918 32.8015C 27.0562 33.0659 27.489 33.0659 27.7533 32.8015L 32.8017 27.7532C 33.0661 27.4888 33.0661 27.056 32.8017 26.7916L 22.9908 16.9808C 22.7264 16.7164 22.7264 16.2836 22.9908 16.0192L 32.8017 6.20837C 33.0661 5.94397 33.0661 5.51121 32.8017 5.24681L 27.7535 0.198297Z"/>
            </defs>
        </SVG>

    )
  }

}