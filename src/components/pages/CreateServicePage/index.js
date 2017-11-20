// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label, InputBox} from 'components'
import { font } from 'styled-theme'

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

const InputBlock = styled.div`
display:flex;
justify-content: center;
margin-top: 48px;
`

const LRBlock = styled.div`
display:flex;
flex-flow: column;
flex: 1;
`

class CreateServicePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    };
  }

  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";

    return (
      <Wrapper>
        <Topbar color={color}/>
        {auth.isLoggedIn() && auth.isTrainer() ?
        <InnerWrapper>
            <HeaderBlock>
              <Label size="48px" weight="bolder" color="#202020">สร้างบริการใหม่</Label>
            </HeaderBlock>
            <InputBlock id = "inputblock">
              <LRBlock>
                <InputBox type="text" label="ชื่อบริการ" placeholder="Service name" color={color} width="345px" height="30px"/>
                <InputBox type="text" label="รายละเอียด" placeholder="Details" color={color} width="345px" height="30px" textarea />
                <InputBox style={{marginRight: "16px"}} dropdown label="จังหวัด" color={color} width="345px" height="30px" menu={['ชาย','หญิง','อื่น ๆ ']}/>
                <InputBox type="text" label="บริเวณที่ให้บริการ" placeholder="Service Place" color={color} width="345px" height="30px"/>
                <LRBlock>
                  <span>
                    <Label size="18px"  style={{marginLeft: "20px"}} /*how much margin??*/ color ="#545454">ช่วงราคา</Label> <Label size="12px" color="#545454">(บาท)</Label>
                  </span>
                  <span>
                    <InputBox type = "number" placeholder="xx.xx" width ="155px" height="30px"/><InputBox type = "number" placeholder="xx.xx" width ="155px" height="30px"/>
                  </span>  
                </LRBlock>
              </LRBlock>
              <LRBlock>
                
              </LRBlock>
            </InputBlock>
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
export default CreateServicePage
