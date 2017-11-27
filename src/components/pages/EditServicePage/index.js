// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import styled, { css } from 'styled-components'
import { Topbar, Label, InputBox, Footer, LinkAndButtonBox, Button, EditSuccessIcon, DeleteUserIcon, DateItems, HandIcon } from 'components'
import Dialog from 'material-ui/Dialog';
import { Link} from 'react-router-dom';
import api from '../../../api'
import auth from '../../../auth'
import utils from '../../../utils'

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
    margin: 36px 0 24px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const InputBlock = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 48px;
`

const LRBlock = styled.div`
    display:flex;
    flex-flow: column;
    flex: 1;
`

const Div = styled.div`
    display: flex;
`

const FooterBlock = styled.div`
    margin: 16px 0 0 0;
    display:flex;
`

class EditServicePage extends React.Component {

  constructor(props) {
        super(props)
        this.state = {
            _id: this.props.match.params.serviceid,
            trainerId : '',
            name : '',
            description : '',
            province : '',
            preferredLocation : '',
            experience : '',
            type : '', 

            minCost: '',
            maxCost:'',

            namePass: true,
            detailPass: true,
            provincePass: true,
            placePass: true,
            minPass: true,
            maxPass: true,
            expPass: true,
            typePass: true,
            timePass: true,

            timeSlots : '',

            open: false,
            open2: false,
            open3: false,

            tempTimeSlotTemp: [],
            tempTimeDesc: [],
            tempTimeSlotTemp2: [],
            tempTimeDesc2: [],
            slot: [],
            deleteTemp:[],
            realId:[],
        };
    }

    componentDidMount() {
        api.getServiceById(this.state._id)
        .then(res =>{
            this.setState({
                trainerId : res.trainerId,
                name : res.name,
                description : res.description,
                province : res.province,
                preferredLocation : res.preferredLocation,
                experience : res.experience,
                type : res.type, 

                minCost : res.price.split(" - ")[0],
                maxCost : res.price.split(" - ")[1],
            })

            api.getTimeSlotOfService(this.state._id)
            .then(res2 =>{
                this.setState({
                    timeSlots: res2,
                })
                var time = []
                var st = []
                var realId =[]
                for (var i = 0 ; i < this.state.timeSlots.length ; i++) {
                    time.push({"startTime": this.state.timeSlots[i].startTime, "endTime": this.state.timeSlots[i].endTime})
                    st.push(this.state.timeSlots[i].startTime+""+this.state.timeSlots[i].endTime)
                    realId.push(this.state.timeSlots[i]._id)
                }
                this.setState({tempTimeSlotTemp: time})
                this.setState({tempTimeDesc: st})
                this.setState({realId: realId})

                var resultFeed = []
                for (var i = 0 ; i < this.state.tempTimeSlotTemp.length ; i++)
                resultFeed.push(<DateItems onDelete={this.onDelete} id={this.state.tempTimeDesc[i]} time={this.state.tempTimeSlotTemp[i]} key={i} />)

                this.setState({slot: resultFeed})

            })
        })
    }

    saveDetail = () => {
        let data = {
            trainerId : this.state.trainerId,
            name : this.state.name,
            description : this.state.description,
            province : this.state.province,
            preferredLocation : this.state.preferredLocation,
            price : this.state.minCost + " - " + this.state.maxCost,
            experience : this.state.experience,
            type : this.state.type, 

        }

        if(this.validate()){
            api.editServiceById(this.state._id, data).then(res=>{
                this.setState({open: true});
            },err => {alert('failure')})
        }
    }

    saveTime = () => {
        let data1 = {timeSlots: this.state.deleteTemp}
        let data2 = {timeSlots: this.state.tempTimeSlotTemp2}

        if(this.validate2()) {
            api.removeTimeSlotOfService(this.state._id, data1)
            .then(res =>{
                api.createTimeSlotOfService(this.state._id, data2)
                .then(res2 =>{
                    this.setState({open: true});
                })
            })
        }
    }

    deleteService = () => {
        api.removeServiceById(this.state._id).then(res=>{
            if(res.success){
                this.setState({open2: false});
                this.props.history.push('/edit/service/')
            }
        },err => { 
            this.setState({open2: false});
            this.setState({open3: true});
        })
    }

    checkFormat = (input) => {
        let check = /^[0-9a-zA-Zก-ฮๆไำะัี้่าิืใๅุึ+๐-๙ู"ํ๊ฯ,/ฤโ็๋()ฺ์?ฦ., ]+$/g;  
        if(input.match(check)) return true
        else return false 
    }
    
    checkNumber = (input) => {
        let check = /\d*(\.\d+)+$|\d*/g;
        if(String(input).match(check)) return true
        else return false
    }

    validate = () => {
        var check = 0
        if(this.state.name.length<1||this.state.name.length>300 || !this.checkFormat(this.state.name)) {
          this.setState({namePass:false}) 
          check--
        } else {this.setState({namePass:true})
        }
        if(this.state.description.length<1||this.state.description.length>300 || !this.checkFormat(this.state.description)) {
          this.setState({detailPass:false})
          check--
        }  else {
          this.setState({detailPass:true})
        }
        if(this.state.province == 'ps' || this.state.province == '') {
          this.setState({provincePass:false})
          check--
        } else {
          this.setState({provincePass:true})
        }
        if(this.state.preferredLocation.length<1||this.state.preferredLocation.length>20) {
          this.setState({placePass:false})
          check--
        } else {
          this.setState({placePass:true})
        }
        if(this.state.minCost <= 0 || !this.checkNumber(this.state.minCost)) {
          this.setState({minPass:false})
          check--
        } else {
          this.setState({minPass:true})
        }
        if(this.state.maxCost <= 0 || Number(this.state.minCost) > Number(this.state.maxCost)) {
          this.setState({maxPass:false})
          check--
        } else {
          this.setState({maxPass:true})
        }
        if(this.state.type == 'ps' || this.state.type == '') {
          this.setState({typePass:false})
          check--
        } else {
          this.setState({typePass:true})
        }
        if(this.state.experience == 'ps' || this.state.experience == '') {
          this.setState({expPass:false})
          check--
        } else {
          this.setState({expPass:true})
        }
        return check==0
    }

    validate2 = () => {
        var check = 0

        if(this.state.slot.length == 0) {
            this.setState({timePass:false})
            check--
        } else {
            this.setState({timePass: true})
        }

        return check==0
    }

      onDelete = (id) => {
        let tempTimeDesc = this.state.tempTimeDesc
        let tempTimeSlotTemp  = this.state.tempTimeSlotTemp
        let tempTimeDescNew = this.state.tempTimeDesc2
        let tempTimeSlotTempNew  = this.state.tempTimeSlotTemp2
        let deleteTemp = this.state.deleteTemp
        let realId = this.state.realId
    
        if(tempTimeDesc.indexOf(id)!=-1){

          deleteTemp.push(realId[tempTimeDesc.indexOf(id)])
          
          tempTimeSlotTemp.splice(tempTimeDesc.indexOf(id),1)
          tempTimeDesc.splice(tempTimeDesc.indexOf(id),1)   
    
          this.setState({timeDesc: tempTimeDesc})
          this.setState({timeSlotTemp: tempTimeSlotTemp})
    
          var tempSlot = []
          var i
          for (i = 0 ; i < tempTimeSlotTemp.length ; i++)
            tempSlot.push(<DateItems onDelete={this.onDelete} id={tempTimeDesc[i]} time={tempTimeSlotTemp[i]} key={i} />)
          for (var j = i ; j-i < tempTimeSlotTempNew.length ; j++)
            tempSlot.push(<DateItems onDelete={this.onDelete} id={tempTimeDescNew[j-i]} time={tempTimeSlotTempNew[j-i]} key={j} />)
          this.setState({slot: tempSlot})
          this.setState({deleteTemp: deleteTemp})
        } else if(tempTimeDescNew.indexOf(id)!=-1){

            tempTimeSlotTempNew.splice(tempTimeDescNew.indexOf(id),1)
            tempTimeDescNew.splice(tempTimeDescNew.indexOf(id),1)   
    
            this.setState({timeDesc2: tempTimeDescNew})
            this.setState({timeSlotTemp2: tempTimeSlotTempNew})
    
            var tempSlot = []
            var i
            for (i = 0 ; i < tempTimeSlotTemp.length ; i++)
            tempSlot.push(<DateItems onDelete={this.onDelete} id={tempTimeDesc[i]} time={tempTimeSlotTemp[i]} key={i} />)
            for (var j = i ; j-i < tempTimeSlotTempNew.length ; j++)
            tempSlot.push(<DateItems onDelete={this.onDelete} id={tempTimeDescNew[j-i]} time={tempTimeSlotTempNew[j-i]} key={j} />)
            this.setState({slot: tempSlot})
            this.setState({deleteTemp: deleteTemp})
            
        }
      }

      onPlus = e => {
        let tempTimeDesc = this.state.tempTimeDesc2
        let tempTimeSlotTemp  = this.state.tempTimeSlotTemp2
        let tempTimeDescOld = this.state.tempTimeDesc
        let tempTimeSlotTempOld  = this.state.tempTimeSlotTemp
        let dateStart  =  (new Date(this.state.serviceDate + " " + this.state.serviceStartTime).getUTCFullYear()) + "-" + ("0" + (new Date(this.state.serviceDate + " " + this.state.serviceStartTime).getUTCMonth())).slice(-2) + "-" + ("0" + (new Date(this.state.serviceDate + " " + this.state.serviceStartTime).getUTCDate())).slice(-2)
        let dateEnd =  (new Date(this.state.serviceDate + " " + this.state.serviceEndTime).getUTCFullYear()) + "-" + ("0" + (new Date(this.state.serviceDate + " " + this.state.serviceEndTime).getUTCMonth())).slice(-2) + "-" + ("0" + (new Date(this.state.serviceDate + " " + this.state.serviceEndTime).getUTCDate())).slice(-2)
        let start = ("0" + (new Date(this.state.serviceDate +" "+ this.state.serviceStartTime).getUTCHours())).slice(-2) + ":" +  ("0" + (new Date(this.state.serviceDate +" "+ this.state.serviceStartTime).getUTCMinutes())).slice(-2)
        let end = ("0" + (new Date(this.state.serviceDate +" "+ this.state.serviceEndTime).getUTCHours())).slice(-2) + ":" +  ("0" + (new Date(this.state.serviceDate +" "+ this.state.serviceEndTime).getUTCMinutes())).slice(-2)
        let startTemp = dateStart + "T" + start + ":00.000Z"
        let endTemp = dateEnd + "T" + end + ":00.000Z"
        let state = {"startTime": startTemp, "endTime": endTemp}
    
        function haveDate(state) {
          if(state.startTime == startTemp) return state.endTime == endTemp
          else return false;
        }

        console.log(tempTimeSlotTempOld.findIndex(haveDate))
        console.log(state)
        console.log(tempTimeSlotTempOld)
    
        if(tempTimeSlotTemp.findIndex(haveDate)==-1 && tempTimeSlotTempOld.findIndex(haveDate)==-1 && this.state.serviceEndTime > this.state.serviceStartTime) {
            tempTimeSlotTemp.push(state)    
          tempTimeDesc.push(startTemp + endTemp)
          this.setState({timePass: true})
        } else this.setState({timePass: false})
    
        this.setState({tempTimeDesc2: tempTimeDesc})
        this.setState({tempTimeSlotTemp2: tempTimeSlotTemp})
    
        var tempSlot = []
        var i = 0
        for (i = 0 ; i < tempTimeSlotTempOld.length ; i++)
            tempSlot.push(<DateItems onDelete={this.onDelete} id={tempTimeDescOld[i]} time={tempTimeSlotTempOld[i]} key={i} />)
        for (var j = i ; j-i < tempTimeSlotTemp.length ; j++)
            tempSlot.push(<DateItems onDelete={this.onDelete} id={tempTimeDesc[j-i]} time={tempTimeSlotTemp[j-i]} key={j} />)
        this.setState({slot: tempSlot})
      }

    changeServiceName = e => {
        this.setState({name : e.target.value})
    }

    changeServiceDetail = e => {
        this.setState({description : e.target.value})
    }

    changeServiceProvince = e => {
        this.setState({province : e.target.value})
    }

    changeServicePlace = e => {
        this.setState({preferredLocation : e.target.value})
    }

    changeServiceMinCost = e => {
        this.setState({minCost : e.target.value})
    }

    changeServiceMaxCost = e => {
        this.setState({maxCost : e.target.value})
    }

    changeExperience = e => {
        this.setState({experience : e.target.value})
    }

    changeServiceType = e => {
        this.setState({type : e.target.value})
    }

    changeServiceDate = e => {
        this.setState({serviceDate : e.target.value})
        // console.log(this.state.serviceDate)
    }
    
    changeServiceStartTime = e => {
        this.setState({serviceStartTime : e.target.value})
        // console.log(this.state.serviceStartTime)
    }

    changeServiceEndTime = e => {
        this.setState({serviceEndTime : e.target.value})
        // console.log(this.state.serviceEndTime)
    }

    handleOpen = () => {
        this.setState({open: true});
    }
    
    handleClose = () => {
        this.setState({open: false});
        setTimeout(function(){ location.reload(); }, 300);
    }
    
    handleOpen2 = () => {
        this.setState({open2: true});
    }
    
    handleClose2 = () => {
        this.setState({open2: false});
    }

    handleOpen3 = () => {
        this.setState({open3: true});
    }
    
    handleClose3 = () => {
        this.setState({open3: false});
    }
  render() {
    let color = auth.isLoggedIn() ? auth.isTrainer() ? "#211F5E" : auth.isTrainee() ? "#F05939" : "" : "#202020";
    let province = ['กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา', 
    'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก', 'นครปฐม', 'นครพนม', 
    'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 
    'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'พะเยา', 
    'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยะลา', 'ยโสธร', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 
    'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 
    'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อุดรธานี', 'อุทัยธานี', 
    'อุตรดิตถ์', 'อุบลราชธานี', 'อำนาจเจริญ'];

    const actions = [
        <Button style={{marginBottom: "32px"}} onClick={this.handleClose} color={color} height="40px" width="231px" size="18px">รับทราบ</Button>,
    ];

    const actions2 = [
        <Button dark style={{marginBottom: "32px"}} onClick={this.deleteService} color="#DC4444" height="40px" width="231px" size="18px">ยืนยันการลบบริการ</Button>,
    ];

    const actions3 = [
        <Button dark style={{marginBottom: "32px"}} onClick={this.handleClose3} color="#DC4444" height="40px" width="231px" size="18px">รับทราบ</Button>,
    ];
    
    return (
      <Wrapper id="top">
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: "#F9FAFC"}}
          bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#F9FAFC"}}
          contentStyle={{width:'60%',maxWidth: 'none'}}
        >
          <EditSuccessIcon />
          <Label style={{marginLeft: "12px"}} weight="bolder" size="48px" color={color}>ข้อมูลของท่านได้ถูกแก้ไขเรียบร้อยแล้ว</Label>
        </Dialog>
        <Dialog
          actions={actions3}
          modal={false}
          open={this.state.open3}
          onRequestClose={this.handleClose3}
          actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: "#DC4444"}}
          bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#DC4444"}}
          contentStyle={{width:'60%',maxWidth: 'none'}}
        >
          <HandIcon />
          <Label weight="bolder" size="48px" color="#F9FAFC">ลบบริการไม่ได้</Label>
          <Label weight="bolder" size="24px" color="#F9FAFC">เนื่องจากมีสถานนะอยู่ในช่วงผลชำระค่ามัดจำ / อยู่ระหว่างการฝึก / ผลชำระเงิน</Label>
        </Dialog>
        <Dialog
          actions={actions2}
          modal={false}
          open={this.state.open2}
          onRequestClose={this.handleClose2}
          actionsContainerStyle={{display: "flex", justifyContent: "center", backgroundColor: "#DC4444"}}
          bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#DC4444"}}
          contentStyle={{width:'60%',maxWidth: 'none'}}
        >
          <DeleteUserIcon />
          <Label weight="bolder" size="48px" color="#F9FAFC">คุณแน่ใจใช้ไหมที่จะลบบริการนี้</Label>
          <Label weight="bolder" size="24px" color="#F9FAFC">(จิ้มข้างนอกหน้าต่างหากไม่มั้นใจ)</Label>
        </Dialog>
        <Topbar color={color}/>
        { this.props.match.params.user == this.state.username ?
        <InnerWrapper >
            <HeaderBlock>
                <Label style={{marginRight: "32px"}} size="48px" weight="bolder" color="#202020">แก้ไขข้อมูลข้อมูลบริการ</Label>
            </HeaderBlock>
            <InputBlock>
              <Label style={{marginBottom: "32px"}} size="24px" weight="800" color= {color}>1. ข้อมูลทั่วไป</Label>
              <Div>
                <LRBlock>
                    <InputBox value={this.state._id} disabled type="text" label="ไอดีของบริการ" placeholder="id" color={color} width="400px" height="30px" />
                    <InputBox value={this.state.name} type="text" onChange={this.changeServiceName} error={!this.state.namePass} label="ชื่อบริการ" placeholder="Service name" color={color} width="400px" height="30px"/>
                    <InputBox value={this.state.description}  type="text" onChange={this.changeServiceDetail} error={!this.state.detailPass} label="รายละเอียด" placeholder="Details" color={color} width="400px" height="160px" textarea />
                </LRBlock>
                <LRBlock>
                    <InputBox value={this.state.province}  onChange={this.changeServiceProvince} error={!this.state.provincePass} dropdown label="จังหวัด" color={color} width="435px" height="30px" menu={province}/>
                    <InputBox value={this.state.preferredLocation} type="text" onChange={this.changeServicePlace} error={!this.state.placePass} label="บริเวณที่ให้บริการ" placeholder="Service Place" color={color} width="400px" height="30px"/>
                    <Label size="18px" style={{margin: "0 6px 6px 20px"}} color ="#545454">ช่วงราคา
                        <Label weight="normal" size="12px" color="#545454">   (บาท)</Label>
                    </Label> 
                    <LRBlock>
                        <Div style={{alignItems: "center"}}>
                            <InputBox  value={this.state.minCost} noneToolTip type = "number" onChange={this.changeServiceMinCost} error={!this.state.minPass} placeholder="xx.xx" width ="155px" height="30px" color={color}/>
                            <Label style={{marginLeft: "12px"}} weight="bolder" size="30px" color="#C4C3C3">-</Label>
                            <InputBox value={this.state.maxCost} noneToolTip type = "number" onChange={this.changeServiceMaxCost} error={!this.state.maxPass} placeholder="xx.xx" width ="155px" height="30px" color={color}/>
                        </Div>  
                        <InputBox value={this.state.experience} onChange={this.changeExperience} error={!this.state.expPass} dropdown label="ประสบการณ์ (ปี)" color={color} width="435px" height="30px" menu={['น้อยกว่า 1','1 - 5','5 - 10', 'มากกว่า 10']}/>
                        <InputBox value={this.state.type} onChange={this.changeServiceType} error={!this.state.typePass} dropdown label="ประเภทบริการ" color={color} width="435px" height="30px" menu={['Freelance','ประจำฟิตเนส']}/>
                    </LRBlock>
                </LRBlock>
              </Div>
              <FooterBlock>
                <LRBlock style={{flexFlow: "row", alignItems: "center"}}></LRBlock>
                <LRBlock style={{flexFlow: "row", justifyContent: "flex-end"}}>
                    <LinkAndButtonBox onClick={this.saveDetail} to="/edit/service/" color={color} 
                    height="40px" width="210px" size="18px" sizeLink="18px"
                    linktext="ยกเลิกการแก้ไข" buttontext="ยืนยันการแก้ไข"/>
                </LRBlock>
              </FooterBlock >

            </InputBlock>

            <InputBlock>
              <Label style={{marginBottom: "32px"}} size="24px" weight="800" color= {color}>2. วันที่และเวลา</Label>
              <Div>
                <LRBlock>
                    {this.state.slot}
                </LRBlock>
                <LRBlock>
                    <Div style={{flexDirection: "column", marginBottom: "-10px"}}>
                        <Label size="18px" color ="#545454">วันที่และเวลา <Label size="12px" color="#545454">(สามารถเลือกได้มากกว่า 1)</Label></Label> 
                        <Div style={{alignItems:"center", marginTop: "-17px"}}>
                        <InputBox noneToolTip style={{margin: "0 -10px 16px 0"}} type="date" onChange={this.changeServiceDate} error={!this.state.timePass} placeholder="DD/MM/YY" color={color} width="153px" height="30px"/>
                        <InputBox noneToolTip type="time" onChange={this.changeServiceStartTime} error={!this.state.timePass} placeholder="HH.MM" color={color} width="83px" height="30px"/>
                        <Label style={{marginLeft: "12px"}}weight="bolder" size="30px" color="#C4C3C3">-</Label>
                        <InputBox noneToolTip type="time" onChange={this.changeServiceEndTime} error={!this.state.timePass} placeholder="HH.MM" color={color} width="83px" height="30px"/>
                        <Label onClick={this.onPlus} hover style={{marginLeft: "12px",marginBottom: "13px"}} weight="bolder" size="60px" colorhover="#73C276" color="rgba(115, 194, 118, 0.5)">+</Label>
                        </Div>
                    </Div>
                </LRBlock>
              </Div>
              <FooterBlock>
                <LRBlock style={{flexFlow: "row", alignItems: "center"}}></LRBlock>
                <LRBlock style={{flexFlow: "row", justifyContent: "flex-end"}}>
                    <LinkAndButtonBox onClick={this.saveTime} to="/edit/service/" color={color} 
                    height="40px" width="210px" size="18px" sizeLink="18px"
                    linktext="ยกเลิกการแก้ไข" buttontext="ยืนยันการแก้ไข"/>
                </LRBlock>
              </FooterBlock >

              <InputBlock>
                <LRBlock style={{marginRight: "8px"}}>
                    <Label style={{marginBottom: "32px"}} size="24px" weight="800" color= {color}>3. การลบบริการ</Label>
                </LRBlock>
                <LRBlock ></LRBlock>
            </InputBlock>
            <InputBlock style={{marginTop: "0", flexDirection: "column", alignItems: "center"}}>
                <Label style={{marginBottom: "16px"}} size="24px" weight="bold" color="rgba(220, 68, 68, 0.9)">ถ้าบริการนั้น ๆ มีสถานนะอยู่ในช่วงผลชำระค่ามัดจำ / อยู่ระหว่างการฝึก / ผลชำระเงิน จะไม่สามารถลบได้</Label>
                <Button style={{marginBottom: "32px"}} onClick={this.handleOpen2} color="rgba(220, 68, 68, 0.9)" height="50px" width="231px" size="24px">ลบบริการ</Button>,
            </InputBlock>
              
            </InputBlock>
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
export default EditServicePage
