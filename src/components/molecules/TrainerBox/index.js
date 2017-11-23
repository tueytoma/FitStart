// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Label, LinkStyle2, StarIcon } from 'components'
import { Link} from 'react-router-dom'
import api from '../../../api'
import auth from '../../../auth'
import utils from '../../../utils'

const Wrapper = styled.div`
    background-color: #F9FAFC;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 24px 0 24px 0;

    &:hover {
      background-color: #F0f0f0;
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

class TrainerBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        trainerService: '',
        ServiceID: '',
    };
  }

  componentDidMount() {
    api.getServiceOfTrainer(this.props.trainer._id)
        .then((res)=>{
            this.setState({trainerService : res[0].name,
                ServiceID : res[0]._id
            })
        })
    }


  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    let linkService = `/users/` + this.props.trainer.username + `/` + this.state.ServiceID;
    let linkTrainer = `/users/` + this.props.trainer.username;

    return (
      <Wrapper>
        <TrainerPic />
        <Result>
            <LinkStyle2 to={linkTrainer} style={{margin: "4px 0 0 0"}} color="#202020" colorHover={color} size="32px" weight="bolder">
                เทรนเนอร์ {this.props.trainer.firstName} {this.props.trainer.lastName} 
            </LinkStyle2>
            <Label style={{margin: "8px 0 4px 0"}} size="18px" weight="600" color="#202020">เบอร์โทรศัพท์
                <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">{this.props.trainer.telephoneNumber}</Label>
            </Label>
            <Label style={{margin: "4px 0 8px 0"}} size="18px" weight="600" color="#202020">เพศ
                <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">{utils.getGender(this.props.trainer.gender)}</Label>
            </Label>
            <Label size="18px" weight="600" color="#202020">บริการที่เคยสร้างมาล่าสุด
                <LinkStyle2 to={linkService} style={{margin: "0 0 0 16px"}} color="rgba(32, 32, 32, 0.8)" colorHover={color} size="18px" weight="normal">
                    {this.state.trainerService}
                </LinkStyle2>
            </Label>
        </Result>
      </Wrapper>
    )
  }
}
export default TrainerBox
