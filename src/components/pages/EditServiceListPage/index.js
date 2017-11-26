// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label, InputBox, Checkbox, LinkStyle, LinkAndButtonBox, DateItems, Button, CreateSuccessIcon} from 'components'
import { font } from 'styled-theme'
import Dialog from 'material-ui/Dialog';
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

const HeaderBlock = styled.div`
  align-self: flex-start;
  margin: 36px 0 35px 0;
  display: flex;
  flex-flow: column;
`

const Box = styled.div`
    width: 100%;
    height: 48px;
    border-bottom: 1px solid #c4c4c4;
    display: flex;
    flex-direction: row;
    align-Items: center;

    &:hover {
        background-color: ${props => props.noHover ? "none" : "rgba(239, 239, 239, 0.8)"};
        cursor: ${props => props.noHover ? "default" : "pointer"};
    }
`
const Box1 = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    
    font-family: Kanit;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-size: 24px;
    color: rgba(32, 32, 32, 0.8);
`

const Box5 = styled.div`
    flex: 5;
    display: flex;

    font-family: Kanit;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-size: 24px;
    color: rgba(32, 32, 32, 0.8);
`


class EditServiceListPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        services: [],
    };
  }

  componentDidMount() {
    api.getServiceOfTrainer(auth.getUser()._id)
        .then(res=>{
            this.setState({services: res})
            // console.log(this.state.services)
        } 
    )
  }

  onClick = e => {
    location.reload();
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    var resultFeed = []
    for (var i = 0 ; i < this.state.services.length ; i++)
    resultFeed.push(
        <Link onClick={this.onClick} to= {'/edit/service/' + this.state.services[i]._id} style={{textDecoration: "none"}}>
            <Box key={i}> 
                <Box1 >{i+1}</Box1>
                <Box1 >{"Id: " + this.state.services[i]._id}</Box1>
                <Box5 style={{paddingLeft: "24px"}}>{this.state.services[i].name}</Box5>
            </Box>
        </Link>
    )

    
    return (
      <Wrapper>
        <Topbar color={color}/>
        {auth.isLoggedIn() && auth.isTrainer() ?
        <InnerWrapper>
            <HeaderBlock>
                <Label size="48px" weight="bolder" color="#202020">รายการบริการของท่าน</Label>
                <Label style={{marginRight: "32px"}} size="24px" weight="normal" color="#202020">คลิกที่บริการที่ต้องการทำการแก้ไขข้อมูลหรือลบบริการ</Label>    
            </HeaderBlock>
            
            <Box noHover> 
                <Box1 style={{fontWeight: "700",fontSize: "24px", color: "rgb(32, 32, 32)", justifyContent: "center"}}>ลำดับ</Box1>
                <Box1 style={{fontWeight: "700",fontSize: "24px", color: "rgb(32, 32, 32)", justifyContent: "center"}}>ไอดีของบริการ</Box1>
                <Box5 style={{fontWeight: "700",fontSize: "24px", color: "rgb(32, 32, 32)", justifyContent: "center"}}>ชื่อบริการ</Box5>
            </Box>
            {resultFeed}

            <Footer color={color} />
        </InnerWrapper>
        :
        <InnerWrapper >
            <Label style={{marginTop: "32px"}} size="64px" weight="bolder" color="#202020">คุณไม่มีสิทธิ์ในหน้านี้</Label>
            <Footer color={color} />
        </InnerWrapper>
        }
      </Wrapper>
    )
  }
}
export default EditServiceListPage
