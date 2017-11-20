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

const Header = styled.div`
  height: 50vh;
  weight: 100%;
  padding-top: 16px;
  display: flex;  
`

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`

const SearchBox = styled.div`
  margin: 24px 0 0 0;
  display: flex;
  align-items: center;
`

const Howto = styled.div`
  margin: 32px 0 0 0;
  display: flex;  
  flex-direction: column;
  justify-content: center; 
  align-items: center;
`

const ServiceList = styled.div`
  margin-Bottom: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const HowtoInner = styled.div`
  display: flex; 
  width: 100%;
  marginBottom: 24px;
`

const Left2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Right2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const A = styled.a`
  &:hover {
    cursor:pointer;
  }
`

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        results: '',
        search:'',
    };
  }

  componentDidMount() {
    api.getServiceByKeyword("")
    .then((res)=>{
      this.setState({results : res})
    })
	}

  changeSearch = e => {
    this.setState({search : e.target.value})
  }

  fetchAll = e => {
    this.props.history.push({pathname: '/search/service', search: "?keyword="})
    location.reload();
  }

  Search = e => {
    this.props.history.push({pathname: '/search/service', search: "?keyword=" + this.state.search})
    location.reload();
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    var resultFeed = []
    for (var i = 0 ; i < this.state.results.length ; i++)
    if(i < 5) resultFeed.push(<ServiceBox /*final={i == this.props.result.length - 1}*/ service={this.state.results[i]} key={i}/>)

    return (
      <Wrapper id="top">
        <Topbar color={color}/>
        <InnerWrapper >
          <Header>
            <Left>
              {auth.isLoggedIn() && <Label size="64px" weight="bolder" color="#202020">ยินดีต้อนรับเข้าสู่</Label>}
              {auth.isLoggedIn() && <Label size="32px" weight="normal" color="#202020">ระบบศูนย์รวมเทรนเนอร์ที่มีประสิทธิภาพมากมาย</Label>}
              {!auth.isLoggedIn() && <Label size="64px" weight="bolder" color="#202020">กรุณาเข้าสู่ระบบก่อน</Label>}
              {!auth.isLoggedIn() && <Label size="32px" weight="normal" color="#202020">นี่คือระบบศูนย์รวมเทรนเนอร์ที่มีประสิทธิภาพมากมาย</Label>}
              <SearchBox>
                <Textfield onChange={this.changeSearch} placeholder="อยากฝึกฝนร่างกายเกี่ยวกับ... / อยากฝึกกับ..." width="370px" height="30px" color={color}/>
                  <A onClick={this.Search}> <SearchIcon opacity="0.5" color="#545454"/> </A>
              </SearchBox>
            </Left>
            <Right>
              <HeartIcon />
            </Right>
          </Header>
          <SubHeader text="บริการล่าสุด"/>
          <ServiceList>
            {resultFeed}
            {this.state.results.length > 5 && 
                <Button onClick={this.fetchAll} height="40px" width="145px" size="เริ่มค้นหา" color={color}>เพิ่มเติม</Button>
            }
          </ServiceList>
          <SubHeader text="อยากรู้จังว่าระบบ Fit Start ใช้งานอย่างไร ?"/>
          <Howto>
            <HowtoInner>
              <Left2>
                <QuestionIcon />
              </Left2>
              <Right2>
                <Label style={{marginBottom: "16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">1. ค้นหาเทรนเนอร์ / บริการที่ต้องการ</Label>
                <Label style={{marginBottom: "16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">2. เลือกช่วงเวลาที่ต้องการฝึก และ ส่งคำขอ</Label>
                <Label style={{marginBottom: "16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">3. เมื่อเทรนเนอร์อนุมติขอแล้วทำการชำระค่าใช้จ่ายตามข้อกำหนด</Label>
                <Label style={{marginBottom: "16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">4. ศึกษาข้อมูลเพิ่มเติม <LinkStyle to="/detail" size="18px">คลิกที่นี่</LinkStyle></Label>
              </Right2>
            </HowtoInner>
            <a href="#top"><Button height="40px" width="145px" size="เริ่มค้นหา" color={color}>เริ่มค้นหา</Button></a>
          </Howto>
          <Footer color={color} />
        </InnerWrapper>
      </Wrapper>
    )
  }
}
export default HomePage
