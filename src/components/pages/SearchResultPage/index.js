// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Label, Footer, LinkStyle, ServiceBox, TrainerBox} from 'components'
import { font } from 'styled-theme'
import queryString from 'query-string'

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

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  padding-top: 32px;
`

const SelectSearchButton = styled.button`
  padding: auto 88px;
  border: 2px solid ${props => props.color};
  border-radius: 5px;

  background-color: ${props => props.active ? props.color : "#F9FAFC"};
  height: 78px;
  width: 45%;
  margin: 0 5% 0 0;
  

  font-family: ${font('primary')};
  font-style: normal;
  font-weight: bolder;
  line-height: normal;
  font-size: 48px;
  color: ${props => props.active ? "#F9FAFC" : props.color};

  outline: none;
  cursor: pointer;

  &:hover {
      color: #F9FAFC;
      background-color: ${props => props.color};
      cursor: ${props => props.active ? "default" : "pointer"};
  }
`

class SearchResultPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        results: '',
        type: this.props.match.params.type,
        keyword: queryString.parse(this.props.location.search)['keyword'],
    };
  }

  componentDidMount() {
    this.getSearchResult()
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      keyword : queryString.parse(nextProps.location.search)['keyword'],
      type : nextProps.match.params.type
    },()=>{
      this.getSearchResult()
    })
  }

  getSearchResult = () => {
    if(this.state.type == 'service' ) {
      api.getServiceByKeyword(this.state.keyword)
      .then((res)=>{
        this.setState({results : res})
      })
    } else if(this.state.type == 'trainer' ) {
      api.getTrainerByName(this.state.keyword)
      .then((res)=>{
        this.setState({results : res})
      })
    } else {
      this.props.history.push({pathname: '/search/service', search: "?keyword="})
      this.props.history.push("/404")
    }
  }

  SelectServiceClick = e => {
    this.props.history.push({pathname: '/search/service', search: "?keyword=" + this.state.keyword})
  }

  SelectTrainerClick = e => {
    this.props.history.push({pathname: '/search/trainer', search: "?keyword=" + this.state.keyword})
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    var resultFeed = []
    if(this.state.results){
      if(this.state.results.length == 0) 
      resultFeed.push(<Label key={0} style={{marginTop: "48px"}} size="24px" weight="normal" color="#545454">ไม่ค้นพบสิ่งที่ต้องการในหมวดนี้ ...</Label>)
    
      if(this.state.type == 'service' ) {
          for (var i = 0 ; i < this.state.results.length ; i++)
          resultFeed.push(<ServiceBox service={this.state.results[i]} key={this.state.results[i]._id}/>)
      } else {
          for (var i = 0 ; i < this.state.results.length ; i++)
          resultFeed.push(<TrainerBox trainer={this.state.results[i]} key={this.state.results[i]._id}/>)
      }
    }

    return (
      <Wrapper id="top">
        <Topbar color={color}/>
        <InnerWrapper >
            <ButtonBox>
              <SelectSearchButton onClick={this.SelectServiceClick} disabled={this.state.type == 'service'} active={this.state.type == 'service'} color={color}>บริการ</SelectSearchButton>
              <SelectSearchButton onClick={this.SelectTrainerClick} disabled={this.state.type == 'trainer'} active={this.state.type == 'trainer'} color={color}>เทรนเนอร์</SelectSearchButton>
            </ButtonBox>
            <Label style={{marginTop: "32px"}} size="48px" weight="bolder" color="#202020">ผลลัพธ์การค้นหา
                {this.state.keyword != '' ?
                <Label size="48px" weight="bolder" color="rgba(32, 32, 32, 0.8)"> "{this.state.keyword}"</Label>
                :
                <Label size="48px" weight="bolder" color="#202020">ทั้งหมด</Label>}
            </Label>
            {resultFeed}
            <Footer color={color} />
        </InnerWrapper>
      </Wrapper>
    )
  }
}
export default SearchResultPage
