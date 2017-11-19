// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Label, LinkStyle, StarIcon } from 'components'
import { Link} from 'react-router-dom';
import api from '../../../api'
import auth from '../../../auth'

const Wrapper = styled.div`
    background-color: #F9FAFC;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: 24px 0 24px 0;
`

const TrainerPic = styled.div`
    height: 160px;
    width: 225.28px;
    margin: 0 24px 0 0;
    background-color: #C4C4C4;
`

const ServicePic = styled.div`
    height: 160px;
    width: 306px;
    margin: 0 24px 0 0;
    background-color: #C4C4C4;
`

const Result = styled.div`
    display: flex;
    flex-direction: column;
`

const Rating = styled.div`
    display:flex;
    flex-direction; row;
    align-items: center;
`

class ServiceBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        trainerName: '',
    };
  }

  componentDidMount() {
    api.getServiceOfTrainer(this.props.service.trainer)
        .then((res)=>{
        this.setState({trainerName : res})
        console.log(this.state.trainerName)
        })
    }


  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    var starBox = []
    // for (var i = 0 ; i < this.state.results.length ; i++)
    // starBox.push(<StarIcon />)

    return (
      <Wrapper>
        <TrainerPic />
        <ServicePic />
        <Result>
            <Label style={{margin: "4px 0 0 0"}} size="32px" weight="bolder" color="#202020">{this.props.service.name} </Label>
            <Label style={{margin: "8px 0 4px 0"}} size="18px" weight="600" color="#202020">สอนโดย
                <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">เทรนเนอร์ </Label>
            </Label>
            <Label style={{margin: "4px 0 8px 0"}} size="18px" weight="600" color="#202020">ช่วงราคา
                <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">{this.props.service.price} บาท</Label>
            </Label>
            <Rating>
                <Label style={{margin: "0 16px 0 0"}} size="18px" weight="600" color="#202020">คะแนน</Label>
            <StarIcon/><StarIcon/><StarIcon/>
            </Rating>
        </Result>
      </Wrapper>
    )
  }
}
export default ServiceBox
