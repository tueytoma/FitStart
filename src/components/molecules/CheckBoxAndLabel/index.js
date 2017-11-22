// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label, Checkbox} from 'components'
import { font } from 'styled-theme'

import { Link} from 'react-router-dom';
import api from '../../../api'
import auth from '../../../auth'

const Wrapper = styled.div`
  width: calc(100% - 24px);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 8px 0;

`

class CheckBoxAndLabel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        checkboxPass: '',
    }

  }

  toggleIsChecked = e => {
    this.setState({checkboxPass: !this.state.checkboxPass});
  }

  render() {
    var weekday = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์' ]
    var monthyear = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตถลาคม', 'พฤศจิกายน', 'ธันวาคม']
    var start = new Date(this.props.time.startTime)
    var end = new Date(this.props.time.endTime)
    var day  = weekday[start.getDay()]
    var date = start.getDate()
    var month = monthyear[start.getMonth()]
    var year = start.getFullYear()+543
    var startHour = start.getHours()
    var startMinute = ("0" + start.getMinutes()).slice(-2)
    var endHour = end.getHours()
    var endMinute = ("0" + end.getMinutes()).slice(-2)

    var output = day + 'ที่ ' + date + ' ' + month + ' ' + year + ' เวลา ' + startHour + '.' + startMinute + ' - ' + endHour + '.' + endMinute + ' น.'


    return (
        <Wrapper style={this.props.styled}>
            <Checkbox disabled={this.props.disabled} style={{marginRight: "16px"}} checked={this.state.checkboxPass} onClick={this.toggleIsChecked}/> 
            <Label size="20px" weight="bold" color={this.props.color}>{output}</Label>
        </Wrapper>
    )
  }
}
export default CheckBoxAndLabel
