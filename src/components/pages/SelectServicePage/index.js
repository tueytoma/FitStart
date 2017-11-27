// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label, Button2, Checkbox, LinkStyle, LinkStyle2, LinkAndButtonBox, CheckBoxAndLabel } from 'components'
import { font } from 'styled-theme'

import { Link} from 'react-router-dom'
import api from '../../../api'
import auth from '../../../auth'
import utils from '../../../utils'

const Wrapper = styled.div`
  background-color: #F9FAFC;
  width: calc(100vw - 15px);
  display: flex;
  justify-content: center;
  
  align-self: center;
`

const InnerWrapper = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`

const HeaderBlock = styled.div`
    align-self: flex-start;
    margin: 36px 0 24px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const LRBlock = styled.div`
    display:flex;
    flex-flow: column;
    flex: 1;
`

const FooterBlock = styled.div`
    margin: 64px 0 0 0;
    display:flex;
`
const ButtonBlock = styled.div`
    margin: 7px 0 0 0;
    display: flex;
`

const ServiceList = styled.div`
    margin-Bottom: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


const queryString = require('query-string');
const parsed = queryString.parse(location.search)

class SelectServicePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        userName: this.props.match.params.user,
        serviceID: this.props.match.params.service,
        service: '',
        results: '',
        trainer: '',
        checkTrainerHaveService: true,
        time: '',
        selectedTime: [],
        failure: false,
        status:0
    };
  }

    statusZeroSelect = e => {
        this.setState({status:0})
    }
    statusOneSelect = e => {
        this.setState({status:1})
    }
    statusTwoSelect = e => {
        this.setState({status:2})
    }
    statusThreeSelect = e => {
        this.setState({status:3})
    }
    statusFourSelect = e => {
        this.setState({status:4})
    }
    statusFiveSelect = e => {
        this.setState({status:5})
    }
  changeCheckbox = e => {
    this.setState({checkboxPass : e.target.value})
  }

  toggleIsChecked = e => {
    this.setState({checkboxPass: !this.state.checkboxPass});
  }

  onClick = e => {
    console.log(this.state.selectedTime)  
  }

  onValue = (id, check) => {
     var temp = this.state.selectedTime
     if(check == false) {
        temp.push(id)
        // console.log(id + "== true")
        
    } else {
        // console.log(this.state.selectedTime.indexOf(id) + "ddd");
        // console.log(temp.indexOf(id))
        if(temp.indexOf(id)!=-1){
            console.log(temp.indexOf(id))
            temp.splice(temp.indexOf(id),1)
        }
        // console.log(id + "== false")
    }
    this.setState({selectedTime : temp})
}
  validateUsername = () => {
      if(this.state.userName != this.state.trainer.username){
        this.setState({failure : true})
      }
  }

  componentDidMount() {
    api.getReservationByStatus(this.state.status)
    .then((res)=>{
      this.setState({results : res})
    })
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    let textButtonSt1 = auth.isTrainee() ? "1. ส่งคำขอ" : auth.isTrainer() ? "1. ตรวจสอบคำขอ" : "";
    let textButtonSt2 = auth.isTrainee() ? "2. รอชำระค่ามัดจำ" : auth.isTrainer() ? "2. ผลชำระค่ามัดจำ" : "";
    let textButtonSt4 = auth.isTrainee() ? "4. รอชำระเงิน" : auth.isTrainer() ? "4. ผลชำระเงิน" : "";

    return(
        <Wrapper>
            <Topbar color={color}/>
            <InnerWrapper>
                <Footer color={color}/>
            </InnerWrapper>
        </Wrapper>
    )
  }
}
export default SelectServicePage