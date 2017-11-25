const cookieService = require('./cookieService')
const config = require('./config')

let auth = {}
auth = {
    setCookieAndToken(cookieAndToken) {
    if (cookieAndToken.user) cookieService.set('user', cookieAndToken.user)
    if (cookieAndToken.token) cookieService.set('token', cookieAndToken.token)
    },

    getUser() {
        return cookieService.get('user');
    },

    getToken(){
        return cookieService.get('token'); 
    },

    logout() {
        cookieService.remove('user');
        cookieService.remove('token');
    },

    isLoggedIn(){
        if(cookieService.get('user')){
            return true
        } else
            return false
    },
    isTrainer(){
        if(cookieService.get('user').role == 'Trainer'){
            return true
        } else 
            return false
    },
    isTrainee(){
        if(cookieService.get('user').role == 'Trainee'){
            return true
        } else 
            return false
    }

}

module.exports = auth;