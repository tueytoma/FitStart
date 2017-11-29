// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Label, LinkStyle, LinkStyle2, CalendarIcon, TrashIcon, BahtIcon, Button } from 'components'
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

const Result = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

class ServiceBox3 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            trainerName: '',
            trainerUsername: '',
            serviceName:'',
            open:false,
        }
    }

    componentDidMount() {
        api.getUserById(this.props.reservation.trainerId)
        .then((res)=>{
            let name = `${res.firstName} ${res.lastName}`
            this.setState({
                trainerName : name, 
                trainerUsername : res.username,
            })
        })
        api.getServiceById(this.props.reservation.serviceId)
        .then((res)=>{
            this.setState({
                serviceName : res.name,
            })
        })
    }

    componentWillReceiveProps(nextProps){
        api.getUserById(nextProps.reservation.trainerId)
        .then((res)=>{
            let name = `${res.firstName} ${res.lastName}`
            this.setState({
                trainerName : name, 
                trainerUsername : res.username,
            })
        })
        api.getServiceById(nextProps.reservation.serviceId)
        .then((res)=>{
            this.setState({
                serviceName : res.name,
            })
        })
    }

    getData = () => {
        
    }

    removeReservation = e => {
        api.removeReservationById(this.props.reservation._id)
        .then(res=>{
            if(res)
            setTimeout(()=>location.reload(),300);
        })
    }

    handleOpen = e => {
        this.setState({open : true})
    }

    handleClose = e =>{
        this.setState({open : false})
    }

  

    render() {
        let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
        let linkService = this.props.reservation.status==5 ? `/reservations/` + this.props.reservation._id + `/` + this.props.reservation.status : `/users/` + this.state.trainerUsername + `/` + this.props.reservation._id
        let linkTrainer = `/users/` + this.state.trainerUsername

        const actions = [
            <Button style={{marginBottom: "32px"}} onClick={this.removeReservation} color={color} height="40px" width="231px" size="18px">ยืนยัน</Button>,
        ];

        return (
        <Wrapper>
            <Result>
                <LinkStyle2 to={linkService}  style={{margin: "0 16px 0 0"}} color="#202020" colorhover={color} size="32px" weight="bolder">
                        {this.state.serviceName}
                </LinkStyle2>
                <Label style={{margin: "8px 0 4px 0"}} size="18px" weight="600" color="#202020">สอนโดย
                <LinkStyle2 to={linkTrainer} style={{margin: "0 0 0 16px"}} color="rgba(32, 32, 32, 0.8)" colorhover={color} size="18px" weight="normal">
                    เทรนเนอร์ {this.state.trainerName}
                </LinkStyle2>
                </Label>
            </Result>
            <div style={{margin: "0 100px 0 0"}} onClick={this.handleOpen}><TrashIcon width="91.5px" height="39px"/></div>
            <Dialog
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: color}}
                bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: color}}
                contentStyle={{width:'60%',maxWidth: 'none'}}>
                <Label style={{margin: "8px 0 4px 0"}} size="48px" weight="600" color="#F9FAFC">ต้องการลบข้อมูลของบริการนี้ ?</Label>
            </Dialog>
        </Wrapper>
        )
    }
}
export default ServiceBox3
