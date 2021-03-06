// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Footer, Label,InputBox, Button2, Button, Checkbox, LinkStyle, LinkStyle2, LinkAndButtonBox, CheckBoxAndLabel, DataBox, StarIcon, Button3, Textarea, DropdownMenu, Textfield } from 'components'
import { font } from 'styled-theme'
import Dialog from 'material-ui/Dialog';
import { Link} from 'react-router-dom'
import api from '../../../api'
import auth from '../../../auth'
import utils from '../../../utils'
import { EALREADY } from 'constants';

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
    width: 100%;
    margin: 36px 0 24px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const LRBlock = styled.div`
    display:flex;
    flex-flow: column;
    flex: 1;
`

const FooterBlock = styled.div`
    margin: 64px 0 0 0;
    display:flex;
`
const ButtonBlock = styled.div`
    margin: 7px 0 0 0;
    display: flex;
`

const ServiceList = styled.div`
    margin-Bottom: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const PicBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 0 24px 0;
`
const TrainerPic = styled.div`
    height: 40vh;
    width: 56.32vh;
    margin: 0 24px 0 0;
    background-color: #C4C4C4;
    ${props => props.image ? `content: url(${'/user' + props.image + '.jpg'})` : ''}
`

const ServicePic = styled.div`
    height: 40vh;
    width: 76.5vh;
    background-color: #C4C4C4;
    ${props => props.image ? `content: url(${'/service' + props.image + '.jpg'})` : ''}
`

const InputBlock = styled.div`
display:flex;
justify-content: center;
flex-direction: column;
margin-top: 48px;
`

const Div = styled.div`
display: flex;
`

const Report = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #DC4444;
    width: 100vw;
    height: 190px;
`
const Pay = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${props=>props.color};
    width: 100vw;
    height: 220px;
`

const A = styled.div`
    &:hover {
        cursor: pointer;
    }
`

const queryString = require('query-string');
const parsed = queryString.parse(location.search)

class SelectServicePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            reservationId: this.props.match.params.reservationId,
            service: '',
            results: '',
            trainer: '',
            checkTrainerHaveService: true,
            time: '',
            selectedTime: [],
            failure: false,
            status:this.props.match.params.status,
            comment:'',
            reportcomment:'',
            commentin:'',
            ratingin:'-',
            rating:0,
            end: false,
            selectedTime: [],

            open: false,
            openReport: false,
        };
    }

    changeComment = e => {
        this.setState({comment : e.target.value})
    }

    changeReportComment = e => {
        this.setState({reportcomment : e.target.value})
    }
    changeRating= e => {
        this.setState({rating: e.target.value})
    }
    sendcomment = e => {
        
        let data = {
            trainerId:this.state.trainer._id,
            reservationId:this.state.reservationId,
            comment:this.state.comment,
            rating:this.state.rating
        }
        api.createReview(data)
        .then(res=>{
            if(res){
            setTimeout(()=>location.reload(),300);
            }
        })
        this.setState({end: true})
        this.props.history.push('/reservations/' + 5)
    }
    pay = e => {
        api.editReservationById(this.props.match.params.reservationId, {status : 3})
        .then(res=>{
            if(res){
            setTimeout(()=>location.reload(),300);
            }
        })
        this.props.history.push('/reservations/' + 3)
    }

    pay2 = e => {
        api.editReservationById(this.props.match.params.reservationId, {status : 5})
        .then(res=>{
            if(res){
            setTimeout(()=>location.reload(),300);
            }
        })
        this.props.history.push('/reservations/' + 5)
    }

    statusOneSelect = e => {
        if(this.state.results.status >= 1){
            this.setState({status:1})
            this.props.history.push('/reservations/' + this.props.match.params.reservationId + '/' + 1)
        }
    }
    statusTwoSelect = e => {
        if(this.state.results.status >= 2){
            this.setState({status:2})
            this.props.history.push('/reservations/' + this.props.match.params.reservationId + '/' + 2)
        }
    }
    statusThreeSelect = e => {
        if(this.state.results.status >= 3){
            this.setState({status:3})
            this.props.history.push('/reservations/' + this.props.match.params.reservationId + '/' + 3)
            }
    }
    statusFourSelect = e => {
        if(this.state.results.status >= 4){
            this.setState({status:4})
            this.props.history.push('/reservations/' + this.props.match.params.reservationId + '/' + 4)
        }
    }
    statusFiveSelect = e => {
        if(this.state.results.status >= 5){
            this.setState({status:5})
            this.props.history.push('/reservations/' + this.props.match.params.reservationId + '/' + 5)
        }
    }
    changeCheckbox = e => {
        this.setState({checkboxPass : e.target.value})
    }

    toggleIsChecked = e => {
        this.setState({checkboxPass: !this.state.checkboxPass});
    }

    onClick = e => {
        api.editReservationById(this.state.results._id,{ timeSlot : this.state.selectedTime})
        .then(res=>{
            if(res) setTimeout(()=>location.reload(),300);
        })
    }

    report = e =>{
        let data = {
            trainerId : this.state.results.trainerId,
            traineeId : this.state.results.traineeId,
            comment : this.state.reportcomment
        }
        api.createReport(data)
        .then(res=>{
            this.setState({openReport: true})
        })
        this.setState({end: true})
    }

    endEx = e => {
        if(this.state.results.status==3){
            api.editReservationById(this.state.reservationId, {status : 4})
            .then(res=>{
                if(res)
                    this.props.history.push('/reservations/' + this.props.match.params.reservationId + '/' + 4)
                    this.state.results.status = 4
            })
        }
    }

    onValue = (id, check) => {
        var temp = this.state.selectedTime
        if(check == false) {
            temp.push(id)     
        } else {
            if(temp.indexOf(id)!=-1){
                temp.splice(temp.indexOf(id),1)
            }
        }
        this.setState({selectedTime : temp})
    }
    validateUsername = () => {
        if(this.state.userName != this.state.trainer.username){
            this.setState({failure : true})
        }
    }

    componentDidMount() {
        this.getData()
    }

    componentWillReceiveProps(nextProps){
        this.setState({status : nextProps.match.params.status})
        this.getData()
    }

    getData(){
        api.getReservationById(this.state.reservationId)
        .then((res)=>{
            this.setState({results : res, selectedTime : res.timeSlot})
        api.getServiceById(this.state.results.serviceId)
        .then((res2) => {
            this.setState({ service : res2 })
            api.getTimeSlotOfService(this.state.results.serviceId)
            .then((res3)=>{
                this.setState({time : res3})
                api.getUserById(this.state.results.trainerId)
                .then((res4)=>{
                    this.setState({trainer : res4})
                })
            })
        })
        })

        api.getReviewOfReservation(this.state.reservationId)
        .then((res)=>{
            this.setState({
                commentin : res.length > 0 ? res[0].comment : '',
                ratingin: res.length > 0 ? res[0].rating : '-',
                end: res.length>0 ? true : false
            })
        })
    }

    openDownload = e => {
        this.setState({open: true})
    }

    closeDownload = e => {
        this.setState({open: false})
    }

    openReport = e => {
        this.setState({openReport: true})
    }

    closeReport = e => {
        this.setState({openReport: false})
    }
    
  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    let textButtonSt1 = auth.isTrainee() ? "1. ส่งคำขอ" : auth.isTrainer() ? "1. ตรวจสอบคำขอ" : "";
    let textButtonSt2 = auth.isTrainee() ? "2. รอชำระค่ามัดจำ" : auth.isTrainer() ? "2. ผลชำระค่ามัดจำ" : "";
    let textButtonSt4 = auth.isTrainee() ? "4. รอชำระเงิน" : auth.isTrainer() ? "4. ผลชำระเงิน" : "";
    let paytext =  auth.isTrainee() ? ' <Button2 mar size = "18px" width="32%" height="43px" radius = "5px" color = {color} onClick={this.pay} >ชำระเงิน</Button2>' : "";
    var starBox = []
    for (var i = 0 ; i < this.state.trainer.rating ; i++)
    starBox.push(<StarIcon key={i} height="40px"/>)

    var starBox2 = []
    for (var i = 0 ; i < this.state.ratingin ; i++)
    starBox2.push(<StarIcon key={i} height="20px"/>)

    const actions = [
        <Button dark style={{marginBottom: "32px"}} onClick={this.closeDownload} color={color} height="40px" width="231px" size="18px">รับทราบ</Button>, 
    ];

    const actions2 = [
        <Button dark style={{marginBottom: "32px"}} onClick={this.closeReport} color="#DC4444" height="40px" width="231px" size="18px">รับทราบ</Button>, 
    ];

    var timeslot = []
    for (var i = 0 ; i < this.state.time.length ; i++) {
        timeslot.push(<CheckBoxAndLabel isChecked={this.state.results.timeSlot.includes(this.state.time[i]._id)} key={this.state.time[i]._id} onValue={this.onValue} id={this.state.time[i]._id} disabled={this.state.results.status>1} time={this.state.time[i]} color={color}/>)
    }


    if(this.state.status == 1 && this.state.results.status >= 1)
        return(
            <Wrapper>
                <Topbar color={color}/>
                <InnerWrapper>
                    <HeaderBlock>
                        <Button2 mar disabled={this.state.results.status >= 1 ? false : true} size = "18px" width="32%" height="43px" radius = "5px" color = {this.state.results.status >= 1 ? color : "#c4c4c4"} onClick={this.statusOneSelect} selected={this.state.status==1}>{textButtonSt1}</Button2>
                        <Button2 mar disabled={this.state.results.status >= 2 ? false : true} size = "18px" width="15%" height="43px" radius = "5px" color = {this.state.results.status >= 2 ? color : "#c4c4c4"} onClick={this.statusTwoSelect} selected={this.state.status==2}>2</Button2>
                        <Button2 mar disabled={this.state.results.status >= 3 ? false : true} size = "18px" width="15%" height="43px" radius = "5px" color = {this.state.results.status >= 3 ? color : "#c4c4c4"} onClick={this.statusThreeSelect} selected={this.state.status==3}>3</Button2>
                        <Button2 mar disabled={this.state.results.status >= 4 ? false : true} size = "18px" width="15%" height="43px" radius = "5px" color = {this.state.results.status >= 4 ? color : "#c4c4c4"} onClick={this.statusFourSelect} selected={this.state.status==4}>4</Button2>
                        <Button2 mar disabled={this.state.results.status >= 5 ? false : true} size = "18px" width="15%" height="43px" radius = "5px" color = {this.state.results.status >= 5 ? color : "#c4c4c4"} onClick={this.statusFiveSelect} selected={this.state.status==5}>5</Button2>
                    </HeaderBlock>
                    <HeaderBlock>
                        <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">ข้อมูลบริการ</Label>
                        {starBox}
                    </HeaderBlock>
                    <PicBlock>
                        <TrainerPic image={this.state.results.trainerId}  />
                        <ServicePic image={this.state.results.serviceId} />
                    </PicBlock>
                    <Label style={{ marginBottom: "16px" }} size="32px" weight="bolder" color="#202020">1. ข้อมูลบริการ</Label>
                    <DataBox textTitle="ชื่อบริการ" textDetail={this.state.service.name} color={color} />
                    <DataBox textTitle="รายละเอียด" textDetail={this.state.service.description} color={color} />
                    <DataBox textTitle="ประสบการณ์" textDetail={this.state.service.experience + " ปี"} color={color} />
                    <DataBox textTitle="ประเภทบริการ" textDetail={this.state.service.type} color={color} />
                    <DataBox textTitle="ช่วงราคา" textDetail={this.state.service.price + " บาท"} color={color} />
                    <Label style={{ margin: "24px 0 16px 0" }} size="32px" weight="bolder" color="#202020">2. ข้อมูลเทรนเนอร์</Label>
                    <DataBox textTitle="สอนโดย" textDetail={<LinkStyle2 decoration={1} to={"/users/" + this.state.trainer.username} color={color} colorhover={color}>{"เทรนเนอร์ " + this.state.trainer.firstName + " " + this.state.trainer.lastName}</LinkStyle2>} color={color} />
                    <DataBox textTitle="เพศ" textDetail={utils.getGenderText(this.state.trainer.gender)} color={color} />
                    <DataBox textTitle="เบอร์โทรศัพท์" textDetail={this.state.trainer.telephoneNumber} color={color} />
                    <Label style={{ margin: "24px 0 16px 0" }} size="32px" weight="bolder" color="#202020">3. สถานที่และวันเวลาของบริการ</Label>
                    <DataBox textTitle="จังหวัด" textDetail={this.state.service.province} color={color} />
                    <DataBox textTitle="บริเวณที่ให้บริการ" textDetail={this.state.service.preferredLocation} color={color} />
                    <DataBox textTitle="วันที่และเวลา" textDetail={timeslot} color={color} />
                    <FooterBlock>
                        <LRBlock style={{ flexFlow: "row", justifyContent: "flex-end" }}>
                            <LinkAndButtonBox disabled={this.state.results.status>1} onClick={this.onClick} to="/reservations/1" color={color} linktext="ไปหน้าแสดงรายการบริการ" buttontext="แก้ไขคำขอ" height="40px" width="122px" size="18px" sizeLink="18px" />
                        </LRBlock>
                    </FooterBlock >
                    <Footer color={color} />
                </InnerWrapper>
            </Wrapper>
        )
    else if(this.state.status == 2 && this.state.results.status >= 2)
        return(
            <Wrapper>
                <Dialog
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.closeDownload}
                actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: color}}
                bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: color}}
                contentStyle={{width:'60%',maxWidth: 'none'}}>
                <Label style={{margin: "8px 0 4px 0"}} size="48px" weight="600" color="#F9FAFC">ยังไม่สามารถดาวน์โหลดได้ในขณะนี้</Label>
                <Label style={{margin: "8px 0 4px 0"}} size="24px" weight="600" color="#F9FAFC">กรุณาติดต่ออีเมล fitstart_co@gmail.com</Label>
            </Dialog>
            <Topbar color={color}/>
            <InnerWrapper>
                <HeaderBlock>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusOneSelect} selected={this.state.status==2}>1</Button2>
                    <Button2 mar disabled={this.state.results.status >= 2 ? false : true} size = "18px" width="32%" height="43px" radius = "5px" color = {this.state.results.status >= 2 ? color : "#c4c4c4"} onClick={this.statusTwoSelect} selected={this.state.status==2}>{textButtonSt2}</Button2>
                    <Button2 mar disabled={this.state.results.status >= 3 ? false : true} size = "18px" width="15%" height="43px" radius = "5px" color = {this.state.results.status >= 3 ? color : "#c4c4c4"} onClick={this.statusThreeSelect} selected={this.state.status==3}>3</Button2>
                    <Button2 mar disabled={this.state.results.status >= 4 ? false : true} size = "18px" width="15%" height="43px" radius = "5px" color = {this.state.results.status >= 4 ? color : "#c4c4c4"} onClick={this.statusFourSelect} selected={this.state.status==4}>4</Button2>
                    <Button2 mar disabled={this.state.results.status >= 5 ? false : true} size = "18px" width="15%" height="43px" radius = "5px" color = {this.state.results.status >= 5 ? color : "#c4c4c4"} onClick={this.statusFiveSelect} selected={this.state.status==5}>5</Button2>
                </HeaderBlock>
                <HeaderBlock>
                    <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">การชำระค่ามัดจำ</Label>
                </HeaderBlock>
                <A onClick={this.openDownload}><DataBox textTitle="ใบเสนอราคา" textDetail='ดาวน์โหลด' color={color} /></A>
                <DataBox textTitle="สถานะการจ่ายค่ามัดจำ" textDetail={this.state.results.status > 2 ?'ชำระเรียบร้อยแล้ว' : 'ยังไม่ได้ชำระเงิน'} color='#202020' />
                {this.state.results.status > 4 && <A onClick={this.openDownload}><DataBox textTitle="ใบเสร็จค่ามัดจำ" textDetail="ดาวน์โหลด" color={color} /></A>}
                <InnerWrapper style={{alignItems: "center"}}>
                    <Pay color={color} >
                        <InnerWrapper style={{alignItems: "flex-end"}}>
                        
                            <Label size="18px" color="rgba(249, 250, 252, 0.5)">จ่ายค่าบริการทั้งสิ้น 
                                <Label size="72px" color="#F9FAFC">&nbsp; {this.state.results.price/10} บาท</Label>
                            </Label>
                            <Label size="18px" color="#F9FAFC">คิดค่ามัดจำล่วงหน้า 10% จากราคาเต็ม {this.state.results.price} บาท</Label>
                        </InnerWrapper>
                    </Pay>
                    {/* {( auth.isTrainee()) && <Button style={{marginTop: "32px", alignSelf: "flex-end"}} size = "18px" width="139px" height="40px" radius = "5px" color = {color} onClick={this.pay} show="false">จ่ายค่ามัดจำ</Button> } */}
                    {( auth.isTrainee()) && <LinkAndButtonBox  disabled={this.state.results.status>2} style={{marginTop: "32px", alignSelf: "flex-end"}} onClick={this.pay} to={'/reservations/' + 2} size = "18px" width="139px" height="40px" radius = "5px" color = {color} linktext="ไปหน้าแสดงรายการบริการ" buttontext="จ่ายค่ามัดจำ"/>}
                </InnerWrapper>
               
                <Footer color={color} />
            </InnerWrapper>
            </Wrapper>
        )
    else if(this.state.status == 3 && this.state.results.status >= 3)
        return(
            <Wrapper>
            <Topbar color={color}/>
            <InnerWrapper>
                <HeaderBlock>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusOneSelect} selected={this.state.status==3}>1</Button2>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusTwoSelect} selected={this.state.status==3}>2</Button2>
                    <Button2 mar disabled={this.state.results.status >= 3 ? false : true} size = "18px" width="32%" height="43px" radius = "5px" color = {this.state.results.status >= 3 ? color : "#c4c4c4"} onClick={this.statusThreeSelect} selected={this.state.status==3}>3. อยู่ระหว่างการฝึก</Button2>
                    <Button2 mar disabled={this.state.results.status >= 4 ? false : true} size = "18px" width="15%" height="43px" radius = "5px" color = {this.state.results.status >= 4 ? color : "#c4c4c4"} onClick={this.statusFourSelect} selected={this.state.status==4}>4</Button2>
                    <Button2 mar disabled={this.state.results.status >= 5 ? false : true} size = "18px" width="15%" height="43px" radius = "5px" color = {this.state.results.status >= 5 ? color : "#c4c4c4"} onClick={this.statusFiveSelect} selected={this.state.status==5}>5</Button2>
                </HeaderBlock>
                <InnerWrapper style={{alignItems: "center"}}>
                    {this.state.results.status==3 ?
                        <Pay color={color} style={{height: "30vh", marginBottom: "32px"}}>
                            {auth.isTrainee() ?
                            <InnerWrapper style={{alignItems: "center", paddingBottom: "24px"}}>
                                <Label size="36px" color="#F9FAFC">กดเมื่อฝึกกับเทรนเนอร์ของท่านเสร็จเรียบร้อยแล้ว</Label>
                                <Label size="36px" color="#F9FAFC">เพื่อเป็นการยืนยันว่าท่านได้ใช้บริการแล้ว</Label>
                            </InnerWrapper> :
                            <InnerWrapper style={{alignItems: "center", paddingBottom: "24px"}}>
                                <Label size="36px" color="#F9FAFC">ผู้ต้องการออกกำลังกาย</Label>
                                <Label size="60px" color="#F9FAFC">ยังไม่ได้กดจบการออกกำลังกาย</Label>
                            </InnerWrapper>
                            }
                        </Pay> :  
                        <Pay color={color} style={{height: "30vh", marginBottom: "32px"}}>
                            {auth.isTrainee() ?
                                <InnerWrapper style={{alignItems: "center", paddingBottom: "24px"}}>
                                    <Label size="48px" color="#F9FAFC">ท่านได้ยืนยันการใช้บริการเรียบร้อยแล้ว</Label> 
                                </InnerWrapper> :
                                <InnerWrapper style={{alignItems: "center", paddingBottom: "24px"}}>
                                    <Label size="36px" color="#F9FAFC">ผู้ต้องการออกกำลังกาย</Label> 
                                    <Label size="60px" color="#F9FAFC">ได้ยืนยันการใช้บริการเรียบร้อยแล้ว</Label>
                                </InnerWrapper>
                            }
                        </Pay>
                    }
                    {this.state.results.status==3 && auth.isTrainee() && <Button onClick={this.endEx} color={color} height="66px" width="557px" size="25px">จบการออกกำลังกาย</Button>}
                </InnerWrapper>
                
                <Footer color={color} />
            </InnerWrapper>
            </Wrapper>
        )
    else if(this.state.status == 4 && this.state.results.status >= 4)
        return(
            <Wrapper>
                <Dialog
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.closeDownload}
                actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: color}}
                bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: color}}
                contentStyle={{width:'60%',maxWidth: 'none'}}>
                <Label style={{margin: "8px 0 4px 0"}} size="48px" weight="600" color="#F9FAFC">ยังไม่สามารถดาวน์โหลดได้ในขณะนี้</Label>
                <Label style={{margin: "8px 0 4px 0"}} size="24px" weight="600" color="#F9FAFC">กรุณาติดต่ออีเมล fitstart_co@gmail.com</Label>
            </Dialog>
            <Topbar color={color}/>
            <InnerWrapper>
                <HeaderBlock>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusOneSelect} selected={this.state.status==4}>1</Button2>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusTwoSelect} selected={this.state.status==4}>2</Button2>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusThreeSelect} selected={this.state.status==4}>3</Button2>
                    <Button2 mar disabled={this.state.results.status >= 4 ? false : true} size = "18px" width="32%" height="43px" radius = "5px" color = {this.state.results.status >= 4 ? color : "#c4c4c4"} onClick={this.statusFourSelect} selected={this.state.status==4}>{textButtonSt4}</Button2>
                    <Button2 mar disabled={this.state.results.status >= 5 ? false : true} size = "18px" width="15%" height="43px" radius = "5px" color = {this.state.results.status >= 5 ? color : "#c4c4c4"} onClick={this.statusFiveSelect} selected={this.state.status==5}>5</Button2>
                </HeaderBlock>
                <HeaderBlock>
                    <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">การชำระค่าบริการ</Label>
                </HeaderBlock>
                <DataBox textTitle="สถานะการชำระเงินส่วนที่เหลือ" textDetail={this.state.results.status > 4 ?'ชำระเรียบร้อยแล้ว' : 'ยังไม่ได้ชำระเงิน'} color='#202020' />
                {this.state.results.status > 4 && <A onClick={this.openDownload}><DataBox textTitle="ใบเสร็จค่าบริการส่วนที่เหลือ" textDetail="ดาวน์โหลด" color={color} /></A>}
                <InnerWrapper style={{alignItems: "center"}}>
                    <Pay color={color} >
                        <InnerWrapper style={{alignItems: "flex-end"}}>
                            <Label size="18px" color="rgba(249, 250, 252, 0.5)">จ่ายค่าบริการทั้งสิ้น 
                                <Label size="72px" color="#F9FAFC">&nbsp; {this.state.results.price*0.9} บาท</Label>
                            </Label>
                            <Label size="18px" color="#F9FAFC">คิดบริการหลังหักค่ามัดจำล่วงหน้า 10% จากราคาเต็ม {this.state.results.price} บาท</Label>
                        </InnerWrapper>
                    </Pay>
                    {( auth.isTrainee()) && <LinkAndButtonBox  disabled={this.state.results.status>4} style={{marginTop: "32px", alignSelf: "flex-end"}} to={'/reservations/' + 4} size = "18px" width="105px" height="40px" radius = "5px" color = {color} onClick={this.pay2} linktext="ไปหน้าแสดงรายการบริการ" buttontext="ชำระเงิน"/>}
                    {/* {( auth.isTrainee()) && <Button style={{marginTop: "32px", alignSelf: "flex-end"}} size = "18px" width="105px" height="40px" radius = "5px" color = {color} onClick={this.pay2} show="false">ชำระเงิน</Button> } */}
                </InnerWrapper>
                <Footer color={color} />
            </InnerWrapper>
            </Wrapper>
        )
    else if(this.state.status == 5 && auth.isTrainee() && this.state.results.status >= 5)
        return(
            <Wrapper>
                <Dialog
                actions={actions2}
                modal={false}
                open={this.state.openReport}
                onRequestClose={this.closeReport}
                actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: "#D44444"}}
                bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#D44444"}}
                contentStyle={{width:'60%',maxWidth: 'none'}}>
                <Label style={{margin: "8px 0 4px 0"}} size="24px" weight="600" color="#F9FAFC">คำร้องเรียนได้ถูกถึงผู้ดูแลระบบแล้ว</Label>
            </Dialog>
            <Topbar color={color}/>
            <InnerWrapper> 
                <HeaderBlock>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusOneSelect} selected={this.state.status==5}>1</Button2>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusTwoSelect} selected={this.state.status==5}>2</Button2>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusThreeSelect} selected={this.state.status==5}>3</Button2>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusFourSelect} selected={this.state.status==5}>4</Button2>
                    <Button2 disabled={this.state.results.status >= 5 ? false : true} mar size = "18px" width="32%" height="43px" radius = "5px" color = {this.state.results.status >= 5 ? color : "#c4c4c4"} onClick={this.statusFiveSelect} selected={this.state.status==5}>5. การฝึกเสร็จสมบูรณ์</Button2>
                </HeaderBlock>

                
                <HeaderBlock>
                        <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">แสดงความคิดเห็น</Label>
                </HeaderBlock>
                <Textarea disabled={this.state.end} color={color} placeholder = "Comments" width="734px" height="131px" onChange ={this.changeComment}></Textarea>
                <Div style={{flexDirection: "row", alignItems:"center", width: "100%", marginTop: "16px"}}><Label style={{marginRight: "8px"}} text-align="center" center size = "18px" >ให้คะแนนบริการนี้  </Label><DropdownMenu  disabled={this.state.end}onChange ={this.changeRating} style={{margin: "0"}} width="149px" height="30px" menu={['0','1','2','3','4','5']}></DropdownMenu></Div>
                {/* <Button style={{marginTop: "32px", alignSelf: "flex-end"}} size = "18px" width="130px" height="40px" radius = "100px" color={color} onClick={this.sendcomment}>ส่งความเห็น</Button> */}
                <LinkAndButtonBox disabled={this.state.end} style={{marginTop: "32px", alignSelf: "flex-end"}} onClick={this.sendcomment} to={'/reservations/' + 5} size = "18px" width="130px" height="40px" radius = "100px" color={color} linktext="ไปหน้าแสดงรายการบริการ" buttontext="ส่งความเห็น"/>
                <InnerWrapper style={{alignItems: "center"}}>
                    <Report style={{height: "auto"}}>
                        <Label style={{margin: "16px 0 0 0"}}size ="48px" color="#F9FAFC">หรือ</Label>
                        <Textarea style={{marginBottom: "16px"}} placeholder = "report" width="734px" height="131px" color={color} onChange ={this.changeReportComment}></Textarea>
                        <Button style={{marginBottom: "16px"}} dark size = "18px" width="300px" height="40px" radius = "100px" color="#DC4444" onClick={this.report}>ส่งคำร้องเรียนเทรนเนอร์</Button>
                    </Report>
                </InnerWrapper>
                

                <Footer color={color} />
            </InnerWrapper>
            </Wrapper>
        )
    else if(this.state.status == 5 && this.state.results.status >= 5){
        return(
            <Wrapper>
            <Topbar color={color}/>
            <InnerWrapper> 
                <HeaderBlock>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusOneSelect} selected={this.state.status==5}>1</Button2>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusTwoSelect} selected={this.state.status==5}>2</Button2>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusThreeSelect} selected={this.state.status==5}>3</Button2>
                    <Button2 mar size = "18px" width="15%" height="43px" radius = "5px" color = "rgba(115, 194, 118, 0.8)" onClick={this.statusFourSelect} selected={this.state.status==5}>4</Button2>
                    <Button2 disabled={this.state.results.status >= 5 ? false : true} mar size = "18px" width="32%" height="43px" radius = "5px" color = {this.state.results.status >= 5 ? color : "#c4c4c4"} onClick={this.statusFiveSelect} selected={this.state.status==5}>5. การฝึกเสร็จสมบูรณ์</Button2>
                </HeaderBlock>

                
                <HeaderBlock style={{marginBottom: "0"}}>
                <Label size="48px" weight="bolder" color="#202020">ความเห็นจากผู้ต้องการออกกำลัง</Label>
                </HeaderBlock>
                {/* <HeaderBlock>

                <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020"> มาฟังคอมเม้นกันเถอะ! </Label>
                </HeaderBlock> */}
                {this.state.commentin == "" &&
                    <InnerWrapper style={{marginTop: "16px"}} >
                        <Label style={{marginLeft: "32px"}} size="18px" weight="bolder" color="#c4c4c4">ยังไม่มีความเห็นจากผู้ต้องการออกกำลัง</Label>
                    </InnerWrapper>
                }
                {this.state.commentin != "" &&
                <InnerWrapper style={{marginTop: "16px"}} >
                        <Label style={{marginLeft: "32px"}} size="18px" weight="bolder" color="#202020">{this.state.commentin}</Label>
                        <Div style={{marginTop: "16px", display: "flex", flexDirection: "row", alignItems: "center"}} >
                        <Label style={{marginRight: "16px"}} size="18px" weight="bolder" color="#545454">ให้คะแนนบริการนี้</Label> 
                        {starBox2}
                        </Div>
                </InnerWrapper>
                }
               
                

                <Footer color={color} />
            </InnerWrapper>
            </Wrapper>
        )





    }
    else
    return(<Wrapper>
        <Topbar color={color}/>
        <InnerWrapper>
            <HeaderBlock>
                <Label size="32px" weight="bolder">ไม่สามารถทำรายการนี้ได้</Label>
            </HeaderBlock>
            <Footer color={color}/>
        </InnerWrapper>
    </Wrapper>)
  }
}
export default SelectServicePage
