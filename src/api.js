var Request = require('superagent')
var config = require('./config')

let api = {}

api.getUserByName = username =>{
    return Request.get(config.BACKURL + '/search')
        .query({username : username})
        .set('Accept', 'application/json')
        .then(res => {
            return res.body.users
        })
}

api.signup = data => {
	return Request.post(config.BACKURL + '/signup')
        .set('Accept', 'application/json')
        .send(data)
		.then(res => {
			return res.body
		})
}

api.signin = data => {
	return Request.post(config.BACKURL + '/signin')
        .set('Accept', 'application/json')
        .send(data)
		.then(res => {
			return res.body
		})
}

module.exports = api