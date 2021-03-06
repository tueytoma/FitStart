// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Label, LinkStyle2, StarIcon } from 'components'
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
            trainerRating: '',
            trainerUsername: '',
            trainerId: '',
        }
    }

    componentDidMount() {
        api.getUserById(this.props.service.trainerId)
        .then((res)=>{
            let name = `${res.firstName} ${res.lastName}`
            this.setState({trainerName : name, 
                trainerRating : res.rating,
                trainerUsername : res.username,
                trainerId : res._id
            })
        })
    }

    render() {
        let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
        var starBox = []
        for (var i = 0 ; i < this.state.trainerRating ; i++)
        starBox.push(<StarIcon key={i} height="24px"/>)
        let linkService = `/users/` + this.state.trainerUsername + `/` + this.props.service._id
        let linkTrainer = `/users/` + this.state.trainerUsername
        return (
        <Wrapper>
            <TrainerPic image={this.state.trainerId} />
            <ServicePic image={this.props.service._id} />
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
                <Rating>
                    <Label style={{margin: "0 16px 0 0"}} size="18px" weight="600" color="#202020">คะแนน</Label>
                {starBox}
                </Rating>
            </Result>
        </Wrapper>
        )
    }
}
export default ServiceBox
