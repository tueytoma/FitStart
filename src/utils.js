let utils = {}

utils.getGenderText = genderCode =>{
    switch(genderCode){
        case 0 : {
            return 'อื่น ๆ'
            break
        } case 1 :{
            return 'ชาย'
            break;
        } case 2 :{
            return 'หญิง'
            break;
        }
    }
}

utils.getGenderCode = genderName =>{
    switch(genderName){
        case 'อื่น ๆ' : {
            return 0
            break
        } case 'ชาย' :{
            return 1
            break;
        } case 'หญิง' :{
            return 2
            break;
        }
    }
}

module.exports = utils