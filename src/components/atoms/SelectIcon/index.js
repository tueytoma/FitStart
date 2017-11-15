import React from 'react'

export default class SelectIcon extends React.Component {

    constructor(props) {
        super(props)
    }

  render() {
    return (
        <svg opacity={this.props.opacity} width= "60.4px" height= "60.4px" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 61.7 61.7" enableBackground="new 0 0 61.7 61.7" >
            <g id="การสมัคร">
                <g id="ประเภท">
                    <circle fill={this.props.color} cx="30.8" cy="30.8" r="30.2"/>
                    <g>
                        <g>
                            <path fill="#F7F8F8" d="M44.3,23.1l-2.5-2.5c-0.3-0.3-0.7-0.5-1.2-0.5c-0.5,0-0.9,0.2-1.2,0.5L27.6,32.5l-5.3-5.3
                                c-0.3-0.3-0.7-0.5-1.2-0.5s-0.9,0.2-1.2,0.5l-2.5,2.5c-0.3,0.3-0.5,0.7-0.5,1.2c0,0.5,0.2,0.9,0.5,1.2l6.5,6.5l2.5,2.5
                                c0.3,0.3,0.7,0.5,1.2,0.5s0.9-0.2,1.2-0.5l2.5-2.5l13.1-13.1c0.3-0.3,0.5-0.7,0.5-1.2S44.6,23.4,44.3,23.1L44.3,23.1z
                                    M44.3,23.1"/>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
  }

}