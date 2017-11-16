const cookieService = require('./cookieService')
const config = require('./config')

let auth = {}
auth = {
    setCookieAndToken(cookieAndToken) {
    if (cookieAndToken.user) cookieService.set('user', cookieAndToken.user);
    },

    getUser() {
    return cookieService.get('user');
    },

    logout() {
    cookieService.remove('token');
    cookieService.remove('user');
    cookieService.remove('roles');
    },

    isLoggedIn(){
        if(cookieService.get('user')){
            return true
        } else
            return false
    },
    isTrainer(){
        if(cookieService.get('user').role.equals('Trainer')){
            return true
        } else 
            return false
    }
}

module.exports = auth;