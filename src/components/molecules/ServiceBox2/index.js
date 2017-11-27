// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Logo, Label, LinkStyle, LinkStyle2, CalendarIcon, TrashIcon, BahtIcon, EditSuccessIcon, Button, CheckBoxAndLabel} from 'components'
import { Link} from 'react-router-dom';
import api from '../../../api'
import auth from '../../../auth'
import Dialog from 'material-ui/Dialog';

const Wrapper = styled.div`
    background-color: #F9FAFC;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 24px 0 24px 0;
    justify-content:space-between;

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

const Result2 = styled.div`
    display:flex;
    align-items:center;
`

class ServiceBox2 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            trainerName: '',
            trainerUsername: '',
            price:'',
            serviceName:'',
            open:false,
            open2:false,
            timeSlots:'',
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () =>{
        api.getUserById(this.props.reservation.trainerId)
        .then((res)=>{
            let name = `${res.firstName} ${res.lastName}`
            this.setState({
                trainerName : name, 
                trainerUsername : res.username,
            })
            api.getServiceById(this.props.reservation._id)
            .then((res)=>{
                this.setState({
                    price : res.price,
                    serviceName : res.name
                })
                api.getTimeSlotOfService(this.props.reservation.serviceId)
                .then(res=>{
                    this.setState({
                        timeSlots : res,
                    })
                })
            })
        })
    }

    componentWillReceiveProps(nextProps){
        this.getData()
    }

    payment = e => {
        alert('Payment Page')
    }

    removeReservation = e =>{
        api.removeReservationById(this.props.reservation._id)
        .then(res=>{
            setTimeout(()=>location.reload(),300);
        })
        this.setState({open2 : false})
    }

    handleOpen = e =>{
        this.setState({open : true})
    }

    handleOpen2 = e =>{
        this.setState({open2 : true})
    }

    handleClose = e =>{
        this.setState({open : false})
    }

    handleClose2 = e =>{
        this.setState({open2 : false})
    }

    render() {
        let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
        let linkService = `/services/` + this.props.reservation._id + `/` + this.props.reservation.status
        let linkTrainer = `/users/` + this.state.trainerUsername

        const actions = [
            <Link onClick={this.handleClose} to={'/services/'+this.props.reservation._id + '/' +this.props.reservation.status} style={{textDecoration: "none"}}>
                <Button dark style={{marginBottom: "32px"}} onClick={this.editReservation} color={color} height="40px" width="231px" size="18px">แก้ไขคำขอ</Button>,
            </Link>
        ];

        const actions2 = [
            <Button style={{marginBottom: "32px"}} onClick={this.removeReservation} color={color} height="40px" width="231px" size="18px">ยืนยัน</Button>,
        ];

        var timeItems = []
        for (var i = 0 ; i < this.state.timeSlots.length ; i++) {
            timeItems.push(<CheckBoxAndLabel isChecked={this.props.reservation.timeSlot.includes(this.state.timeSlots[i]._id)} key={this.state.timeSlots[i]._id} onValue={this.onValue} id={this.state.timeSlots[i]._id} disabled={color != "#F05939"} time={this.state.timeSlots[i]} color={"#F9FAFC"}/>)
        }

        return (
        <Wrapper>
            <Result2>
                <ServicePic image={this.props.reservation._id} />
                <Result>
                    <LinkStyle2 to={linkService} style={{margin: "4px 0 0 0"}} color="#202020" colorhover={color} size="32px" weight="bolder">
                        {this.state.serviceName}
                    </LinkStyle2>
                    <Label style={{margin: "8px 0 4px 0"}} size="18px" weight="600" color="#202020">สอนโดย
                    <LinkStyle2 to={linkTrainer} style={{margin: "0 0 0 16px"}} color="rgba(32, 32, 32, 0.8)" colorhover={color} size="18px" weight="normal">
                        เทรนเนอร์ {this.state.trainerName}
                    </LinkStyle2>
                    </Label>
                    <Label style={{margin: "4px 0 8px 0"}} size="18px" weight="600" color="#202020">ช่วงราคา
                        <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">
                            {this.props.reservation.price ? this.props.reservation.price : this.state.price} บาท
                            {this.props.reservation.status==2 ? ' (' + this.props.reservation.price / 10 + ' บาท)' : ''}
                        </Label>
                    </Label>
                    <Label style={{margin: "4px 0 8px 0"}} size="18px" weight="600" color="#202020">ช่วงเวลาที่จอง
                        <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">{this.props.reservation.timeSlot.length} ช่วงเวลา</Label>
                    </Label>
                </Result>
            </Result2>

            <Result2 style={{margin: "0 100px 0 0"}}>
                {(this.props.reservation.status==2 || this.props.reservation.status==4) && <div onClick={this.payment}><BahtIcon width="91.5px" height="39px"/> </div>}
                {(this.props.reservation.status!=4) && <div onClick={this.handleOpen}><CalendarIcon width="91.5px" height="39px"/> </div>}
                {(this.props.reservation.status==1|| this.props.reservation.status==2) && <div onClick={this.handleOpen2}><TrashIcon width="91.5px" height="39px"/> </div>}
            </Result2>
            <Dialog
                actions={this.props.reservation.status==1 && actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: color}}
                bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: color}}
                contentStyle={{width:'60%',maxWidth: 'none'}}>
                <Label style={{margin: "8px 0 4px 0"}} size="48px" weight="600" color="#F9FAFC">
                    {this.props.reservation.status==1 ? 'รายการส่งคำขอ' : 'สรุปคำขอ'}
                </Label>
                {timeItems}
            </Dialog>
            <Dialog
                actions={actions2}
                modal={false}
                open={this.state.open2}
                onRequestClose={this.handleClose2}
                actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: color}}
                bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: color}}
                contentStyle={{width:'60%',maxWidth: 'none'}}>
                <Label style={{margin: "8px 0 4px 0"}} size="48px" weight="600" color="#F9FAFC">ต้องการลบการจองนี้ ?</Label>
            </Dialog>
        </Wrapper>
        )
    }
}
export default ServiceBox2
