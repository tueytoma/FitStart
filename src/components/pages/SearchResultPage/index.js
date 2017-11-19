// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Label, Footer, LinkStyle, ServiceBox } from 'components'

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

const queryString = require('query-string');
const parsed = queryString.parse(location.search)

class SearchResultPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        results: '',
        type: this.props.match.params.type,
        keyword: parsed['keyword'],
    };
  }

  componentDidMount() {
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

  Search = e => {
    // console.log(this.state.results)
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    var resultFeed = []
    if(this.state.results.length == 0) 
    resultFeed.push(<Label style={{marginTop: "48px"}}size="24px" weight="normal" color="#545454">ไม่ค้นพบสิ่งที่ต้องการในหมวดนี้ ...</Label>)
   
    if(this.state.type == 'service' ) {
        for (var i = 0 ; i < this.state.results.length ; i++)
        resultFeed.push(<ServiceBox service={this.state.results[i]} key={i}/>)
    } else {
        for (var i = 0 ; i < this.state.results.length ; i++)
        resultFeed.push(<h1>Trainer</h1>)
    }

    return (
      <Wrapper id="top">
        <Topbar color={color}/>
        <InnerWrapper >
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
