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

class TrainerBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        trainerService: '',
    };
  }

  componentDidMount() {
    api.getServiceOfTrainer(this.props.trainer._id)
        .then((res)=>{
            this.setState({trainerService : res.services[0].name})
            console.log(res.services[0].name)
        })
    }


  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";

    return (
      <Wrapper>
        <TrainerPic />
        <Result>
            <Label style={{margin: "4px 0 0 0"}} size="32px" weight="bolder" color="#202020">เทรนเนอร์ {this.props.trainer.first_name} {this.props.trainer.last_name}  </Label>
            <Label style={{margin: "8px 0 4px 0"}} size="18px" weight="600" color="#202020">เบอร์โทรศัพท์
                <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">{this.props.trainer.telephone_number}</Label>
            </Label>
            <Label style={{margin: "4px 0 8px 0"}} size="18px" weight="600" color="#202020">เพศ
                <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">{this.props.trainer.gender}</Label>
            </Label>
            <Label size="18px" weight="600" color="#202020">บริการที่เคยสร้างมาล่าสุด
                <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">{this.state.trainerService}</Label>
            </Label>
        </Result>
      </Wrapper>
    )
  }
}
export default TrainerBox
