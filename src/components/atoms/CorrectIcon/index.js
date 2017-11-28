import React from 'react'
import styled from 'styled-components'

const SVG = styled.svg`
&:hover {
  cursor:pointer;
}
`

export default class CorrectIcon extends React.Component {

  render() {
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" x="0px" y="0px" viewBox="0 0 29.9 22.9" enableBackground="new 0 0 29.9 22.9" >
            <g id="การสมัคร">
                <g>
                    <path fill="#73C276" d="M28.4,3.7L26,1.3c-0.3-0.3-0.7-0.5-1.2-0.5c-0.5,0-0.9,0.2-1.2,0.5L11.7,13.1L6.4,7.8
                        C6.1,7.4,5.6,7.3,5.2,7.3S4.3,7.4,3.9,7.8l-2.5,2.5C1.1,10.6,1,11,1,11.5c0,0.5,0.2,0.9,0.5,1.2L8,19.2l2.5,2.5
                        c0.3,0.3,0.7,0.5,1.2,0.5s0.9-0.2,1.2-0.5l2.5-2.5L28.4,6.2c0.3-0.3,0.5-0.7,0.5-1.2S28.8,4,28.4,3.7L28.4,3.7z M28.4,3.7"/>
                </g>
            </g>
        </svg>
    )
  }

}