// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Logo, Label, LinkStyle, LinkStyle2, CalendarIcon, TrashIcon, BahtIcon } from 'components'
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
    ${props => props.image ? `content: url(${'/user' + props.image + '.jpg'})` : ''}
`

const ServicePic = styled.div`
    height: 160px;
    width: 306px;
    margin: 0 24px 0 0;
    background-color: #C4C4C4;
    ${props => props.image ? `content: url(${'/service' + props.image + '.jpg'})` : ''}
`

const Result = styled.div`
    display: flex;
    flex-direction: column;
`

const Result2 = styled.div`
    width: 15vw;
    display:flex;
    align-items:center;
`

class ServiceBox2 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            trainerName: '',
            trainerUsername: '',
            price:'',
            serviceName:'',
        }
    }

    componentDidMount() {
        api.getUserById(this.props.reservation.trainerId)
        .then((res)=>{
            let name = `${res.firstName} ${res.lastName}`
            this.setState({
                trainerName : name, 
                trainerUsername : res.username,
            })
        })
        api.getServiceById(this.props.reservation._id)
        .then((res)=>{
            this.setState({
                price : res.price,
                serviceName : res.name
            })
        })
    }

    seeTimeSlots = e => {
        alert('hi')
    }

    render() {
        let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
        let linkService = `/users/` + this.state.trainerUsername + `/` + this.props.reservation._id
        let linkTrainer = `/users/` + this.state.trainerUsername

        return (
        <Wrapper>
            <ServicePic image={this.props.reservation._id} />
            <Result>
                <LinkStyle2 to={linkService} style={{margin: "4px 0 0 0"}} color="#202020" colorhover={color} size="32px" weight="bolder">
                    {this.state.serviceName}
                </LinkStyle2>
                <Label style={{margin: "8px 0 4px 0"}} size="18px" weight="600" color="#202020">สอนโดย
                <LinkStyle2 to={linkTrainer} style={{margin: "0 0 0 16px"}} color="rgba(32, 32, 32, 0.8)" colorhover={color} size="18px" weight="normal">
                    เทรนเนอร์ {this.state.trainerName}
                </LinkStyle2>
                </Label>
                <Label style={{margin: "4px 0 8px 0"}} size="18px" weight="600" color="#202020">ช่วงราคา
                    <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">{this.props.reservation.price ? this.props.reservation.price : this.state.price} บาท</Label>
                </Label>
                <Label style={{margin: "4px 0 8px 0"}} size="18px" weight="600" color="#202020">ช่วงเวลาที่จอง
                    <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">{this.props.reservation.timeSlot.length} ช่วงเวลา</Label>
                </Label>
            </Result>

            <Result2>
                {(this.props.reservation.status==2 || this.props.reservation.status==4) && <div onClick={this.seeTimeSlots}><BahtIcon width="91.5px" height="39px"/> </div>}
                {(this.props.reservation.status!=4) && <div onClick={this.seeTimeSlots}><CalendarIcon width="91.5px" height="39px"/> </div>}
                {(this.props.reservation.status==1|| this.props.reservation.status==2) && <div onClick={this.seeTimeSlots}><TrashIcon width="91.5px" height="39px"/> </div>}
            </Result2>
        </Wrapper>
        )
    }
}
export default ServiceBox2
