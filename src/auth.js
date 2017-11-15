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

    logout(cb) {
    cookieService.remove('token');
    cookieService.remove('user');
    cookieService.remove('roles');
    if (cb) cb();
    },

}

module.exports = auth;