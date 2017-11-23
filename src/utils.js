let utils = {}

utils.getGender = genderCode =>{
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

module.exports = utils