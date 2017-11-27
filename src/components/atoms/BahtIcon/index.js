import React from 'react'
import styled from 'styled-components'

const SVG = styled.svg`
&:hover {
  cursor:pointer;
}
`

export default class BahtIcon extends React.Component {

    constructor(props) {
        super(props)
    }

  render() {
    return (
        <SVG width={this.props.width} height={this.props.height} viewBox="0 0 20 38" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <g id="Vector">
          <path fill={"#202020"} fillOpacity={"0.2"} d="M 15.186 18.1213L 13.9265 17.7201L 15.1255 17.1299C 17.5748 15.9533 18.7657 14.158 18.7657 11.6422C 18.7657 10.9169 18.6494 10.2202 18.4208 9.57153C 18.1924 8.92387 17.8549 8.32257 17.4185 7.78465C 16.9806 7.24592 16.4701 6.79435 15.9022 6.4439C 15.23 6.02184 14.4599 5.73306 13.6096 5.5836C 12.7213 5.42925 11.6541 5.35065 10.438 5.35065L 9.48377 5.35065L 9.48377 1.28452C 9.4837 0.574503 8.92875 0 8.24391 0C 7.55902 0 7.00413 0.574503 7.00413 1.28452L 7.00413 5.35106L 2.70744 5.35106C 1.72078 5.35106 1.01475 5.56348 0.609951 5.98288C 0.205154 6.40228 9.21297e-08 7.14596 9.21297e-08 8.19338L 9.21297e-08 28.629C 9.21297e-08 29.6563 0.202136 30.3974 0.6005 30.8298C 0.992302 31.2559 1.70115 31.4713 2.70704 31.4713L 7.0038 31.4713L 7.0038 36.7155C 7.0038 37.4252 7.55875 38 8.24359 38C 8.92822 38 9.4837 37.4253 9.4837 36.7155L 9.4837 31.4713L 9.95426 31.4713C 11.3096 31.4713 12.5094 31.4014 13.5204 31.2624C 14.5088 31.1281 15.3921 30.8934 16.1458 30.567C 17.3134 30.0349 18.261 29.1949 18.9535 28.0735C 19.6482 26.9482 20 25.6629 20 24.2522C 20 21.196 18.4251 19.1905 15.186 18.1213ZM 12.8725 9.14689C 14.009 9.69012 14.5855 10.7738 14.5855 12.3652C 14.5855 13.1023 14.411 13.7805 14.0657 14.381C 13.6321 15.2091 12.9799 15.7927 12.1366 16.0955C 11.4659 16.3367 10.593 16.4709 9.48364 16.5055L 9.48364 8.45136C 10.936 8.52792 12.0552 8.75503 12.8725 9.14689ZM 3.51519 8.42001L 7.00413 8.42001L 7.00413 16.5153L 3.51519 16.5153L 3.51519 8.42001ZM 3.51519 28.4023L 3.51519 19.3986L 7.00413 19.3986L 7.00413 28.4023L 3.51519 28.4023ZM 9.73952 28.4023L 9.4837 28.4023L 9.4837 19.3986L 9.56029 19.3986C 11.5287 19.3986 12.9835 19.7298 14.0083 20.4107C 15.0922 21.1301 15.6414 22.2851 15.6414 23.8446C 15.6414 25.9241 14.6177 28.4023 9.73952 28.4023Z"/>
        </g>
        </SVG>
        
        
    )
  }

}