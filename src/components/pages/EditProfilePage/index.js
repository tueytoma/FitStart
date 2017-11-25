// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Label, Textfield, SearchIcon, HeartIcon, SubHeader, QuestionIcon, Button, Footer, LinkStyle, ServiceBox } from 'components'
import { Link} from 'react-router-dom';
import api from '../../../api'
import auth from '../../../auth'

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

class EditProfilePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        _id: auth.getUser()._id,
        role: auth.getUser().role,
        username : auth.getUser().username,
        password : auth.getUser().password,
        email : auth.getUser().email,
        firstName : auth.getUser().firstName,
        lastName : auth.getUser().lastName,
        gender : auth.getUser().gender == 1 ? "ชาย" : (auth.getUser().gender == 2 ? "หญิง" : "อื่น ๆ"),
        address : auth.getUser().address,
        telephoneNumber : auth.getUser().telephoneNumber,
        role : auth.getUser().trainer ? 'Trainer' : 'Trainee'
    };
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";

    return (
      <Wrapper id="top">
        <Topbar color={color}/>
        { this.props.match.params.user == this.state.username ?
        <InnerWrapper >
          
            <Footer color={color} />
        </InnerWrapper>
        :
        <InnerWrapper >
            <Label style={{marginTop: "32px"}} size="48px" weight="bolder" color="#202020">คุณไม่มีสิทธิ์ในหน้านี้</Label>
            <Footer color={color} />
        </InnerWrapper>
        }
      </Wrapper>
    )
  }
}
export default EditProfilePage
