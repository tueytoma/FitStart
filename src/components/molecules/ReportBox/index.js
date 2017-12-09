// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Logo, Label, LinkStyle, LinkStyle2, CalendarIcon, TrashIcon, BahtIcon, EditSuccessIcon, Button, CheckBoxAndLabel, SelectServiceIcon, DeleteServiceIcon} from 'components'
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
            trainerUsername:'',
            trainerName:'',
            traineeUsername:'',
            traineeName:'',
            open:false,
            open2:false,
        }
    }

    componentDidMount() {
        api.getUserById(this.props.report.trainerId)
        .then(res=>{
            this.setState({trainerUsername : res.username, trainerName : `${res.firstName} ${res.lastName}`})
        })
        api.getUserById(this.props.report.traineeId)
        .then(res=>{
            this.setState({traineeUsername : res.username, traineeName : `${res.firstName} ${res.lastName}`})
        })
    }

    componentWillReceiveProps(nextProps){
    }

    acceptReport = e => {
        api.editUserById(this.props.report.trainerId, {status : 0})
        .then(res=>{
            if(res){
                api.editReportById(this.props.report._id, {status : 1})
                .then(res=>{
                    if(res)
                        setTimeout(()=>location.reload(),300);
                })
            }
        })
        this.handleClose()
    }

    removeReport = e =>{
        api.removeReportById(this.props.report._id)
        .then(res=>{
            setTimeout(()=>location.reload(),300);
        })
        this.handleClose2()
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
        let color = "#202020"
        let linkTrainer = `/users/` + this.state.trainerName
        let linkTrainee = `/users/` + this.state.traineeName

        const actions = [
            <Button dark style={{marginBottom: "32px"}} onClick={this.acceptReport} color={color} height="40px" width="231px" size="18px">ยืนยัน</Button>,
        ];

        const actions2 = [
            <Button dark style={{marginBottom: "32px"}} onClick={this.removeReport} color={color} height="40px" width="231px" size="18px">ยืนยัน</Button>,
        ];

        return (
        <Wrapper>
            <Result2>
                {/* <ServicePic image={this.props.reservation.serviceId} /> */}
                <Result>
                    <Label style={{margin: "4px 0 8px 16px"}} size="18px" weight="600" color="#202020">เทรนเนอร์ที่ถูกแจ้ง
                        <LinkStyle2 to={linkTrainer} style={{margin: "0 0 0 16px"}} color="rgba(32, 32, 32, 0.8)" colorhover={color} size="18px" weight="600">
                            เทรนเนอร์ {this.state.trainerName}
                        </LinkStyle2>
                    </Label>
                    <Label style={{margin: "4px 0 8px 16px"}} size="18px" weight="600" color="#202020">รายละเอียดคำร้องเรียน
                        <Label style={{margin: "0 0 0 16px"}} size="18px" weight="normal" color="rgba(32, 32, 32, 0.8)">{this.props.report.comment}</Label>
                    </Label>
                    <Label style={{margin: "4px 0 8px 16px"}} size="18px" weight="600" color="#202020">โดย
                        <LinkStyle2 to={linkTrainee} style={{margin: "0 0 0 16px"}} color="rgba(32, 32, 32, 0.8)" colorhover={color} size="18px" weight="600">
                            {this.state.traineeName}
                        </LinkStyle2>
                    </Label>
                    
                </Result>
            </Result2>

            <Result2 style={{margin: "0 100px 0 0"}}>
                {this.props.report.status==0 && <div onClick={this.handleOpen}><SelectServiceIcon width="91.5px" height="39px"/></div>}
                <div onClick={this.handleOpen2}><DeleteServiceIcon width="91.5px" height="39px"/></div>
            </Result2>
            <Dialog
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: color}}
                bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: color}}
                contentStyle={{width:'60%',maxWidth: 'none'}}>
                <Label style={{margin: "8px 0 4px 0"}} size="48px" weight="600" color="#F9FAFC">ต้องการแบนเทรนเนอร์คนนี้ ?</Label>
            </Dialog>
            <Dialog
                actions={actions2}
                modal={false}
                open={this.state.open2}
                onRequestClose={this.handleClose2}
                actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: color}}
                bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: color}}
                contentStyle={{width:'60%',maxWidth: 'none'}}>
                <Label style={{margin: "8px 0 4px 0"}} size="48px" weight="600" color="#F9FAFC">ต้องการลบคำร้องเรียนอันนี้ ?</Label>
            </Dialog>
        </Wrapper>
        )
    }
}
export default ServiceBox2
