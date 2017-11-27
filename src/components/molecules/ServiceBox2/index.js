// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Label, LinkStyle2, CalendarIcon } from 'components'
import { Link} from 'react-router-dom';
import api from '../../../api'
import auth from '../../../auth'

const Wrapper = styled.div`
    background-color: #F9FAFC;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 24px 0 24px 0;

    &:hover {
      background-color: #F0f0f0;
    }
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

class ServiceBox2 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            trainerName: '',
            trainerUsername: '',
            timeSlot:'',
        }
    }

    componentDidMount() {
        api.getUserById(this.props.service.trainerId)
        .then((res)=>{
            let name = `${res.firstName} ${res.lastName}`
            this.setState({
                trainerName : name, 
                trainerUsername : res.username,
            })
        })
        api.getTimeSlotOfService(this.props.reservation._id)
        .then((res)=>{
            this.setState({
                timeSlot : res.timeSlot.length,
            })
        })
    }

    render() {
        let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
        let linkService = `/users/` + this.state.trainerUsername + `/` + this.props.service._id
        let linkTrainer = `/users/` + this.state.trainerUsername

        return (
        <Wrapper>
            <ServicePic />
            <Result>
                <LinkStyle2 to={linkService} style={{margin: "4px 0 0 0"}} color="#202020" colorhover={color} size="32px" weight="bolder">
                    {this.props.service.name}
                </LinkStyle2>
                <Label style={{margin: "8px 0 4px 0"}} size="18px" weight="600" color="#202020">สอนโดย
                <LinkStyle2 to={linkTrainer} style={{margin: "0 0 0 16px"}} color="rgba(32, 32, 32, 0.8)" colorhover={color} size="18px" weight="normal">
                    เทรนเนอร์ {this.state.trainerName}
                </LinkStyle2>
                </Label>
                <Label style={{margin: "4px 0 8px 0"}} size="18px" weight="600" color="#202020">ช่วงราคา
                    <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">{this.props.service.price} บาท</Label>
                </Label>
                <Label style={{margin: "4px 0 8px 0"}} size="18px" weight="600" color="#202020">ช่วงเวลาที่จอง
                    <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">{this.state.timeSlot} ช่วงเวลา</Label>
                </Label>
            </Result>
            <CalendarIcon/>
        </Wrapper>
        )
    }
}
export default ServiceBox2
