var Request = require('superagent')
var config = require('./config')

let api = {}

api.err = err => {
    throw err.response
	/*if (err.response && err.response.body.error) throw err.response.body.error
	else throw err*/
}

api.getUserByName = username =>{
    return Request.get(config.BACKURL + '/users/search')
        .query({username : username})
        .set('Accept', 'application/json')
        .then(res => {
            return res.body.users
        })
}

api.getServiceByKeyword = keyword =>{
    return Request.post(config.BACKURL + '/services/search')
        .send({keyword : keyword})
        .set('Accept', 'application/json')
        .then(res => {
            return res.body.services
        })
}

api.getServiceOfTrainer = trainerId =>{
    return Request.get(config.BACKURL + '/services/' + trainerId)
        .set('Accept', 'application/json')
        .then(res => {
            return res.body
        })
}

api.signup = data => {
	return Request.post(config.BACKURL + '/signup')
        .set('Accept', 'application/json')
        .send(data)
		.then(res => {
			return res.body
		},api.err)
}

api.createService = data => {
	return Request.post(config.BACKURL + '/service')
        .set('Accept', 'application/json')
        .send(data)
		.then(res => {
			return res.body
		},api.err)
}

api.signin = data => {
	return Request.post(config.BACKURL + '/signin')
        .set('Accept', 'application/json')
        .send(data)
		.then(res => {
			return res.body
		},api.err)
}

api.hasEmail = email =>{
    return Request.get(config.BACKURL + '/users/' + email)
        .set('Accept', 'application/json')
        .then(res => {
            return res.body
        })
}

api.forgetPassword = email =>{
    return Request.post(config.BACKURL + '/forgetPassword')
        .set('Accept', 'application/json')
        .send(email)
        .then(res => {
            return res.body
        })
}

api.hasToken = token =>{
    return Request.get(config.BACKURL + '/reset/' + token)
        .set('Accept', 'application/json')
        .then(res => {
            return res.body
        })
}

api.resetPassword = data =>{
    return Request.post(config.BACKURL + '/resetPassword')
        .set('Accept', 'application/json')
        .send(data)
        .then(res => {
            return res.body
        })
}

module.exports = api