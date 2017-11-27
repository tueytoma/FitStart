// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Label, LinkStyle, LinkStyle2, CalendarIcon } from 'components'
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

const Result = styled.div`
    display: flex;
    flex-direction: row;
`

class ServiceBox2 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            trainerName: '',
            trainerUsername: '',
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
                serviceName : res.name,
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
            <Result>
            <LinkStyle2 to={linkService} style={{margin: "4px 0 0 0"}} color="#202020" colorhover={color} size="32px" weight="bolder">
                    {this.state.serviceName}
            </LinkStyle2>
            <Label style={{margin: "8px 0 4px 0"}} size="18px" weight="600" color="#202020">สอนโดย
            <LinkStyle2 to={linkTrainer} style={{margin: "0 0 0 16px"}} color="rgba(32, 32, 32, 0.8)" colorhover={color} size="18px" weight="normal">
                เทรนเนอร์ {this.state.trainerName}
            </LinkStyle2>
            </Label>
            </Result>
            <div onClick={this.seeTimeSlots}><CalendarIcon/></div>
        </Wrapper>
        )
    }
}
export default ServiceBox2
