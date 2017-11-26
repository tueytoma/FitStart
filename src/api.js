var Request = require('superagent')
var config = require('./config')
var auth = require('./auth')

let api = {}

api.err = err => {
    throw err.response
	/*if (err.response && err.response.body.error) throw err.response.body.error
	else throw err*/
}

/* SEARCH PART */

api.getUserByName = name =>{
    return Request.get(config.BACKURL + '/users/search/items')
        .query({name : name})
        .set('Accept', 'application/json')
        .then(res => {
            return res.body.users
        })
}

api.getTrainerByName = name =>{
    return Request.get(config.BACKURL + '/trainers/search/items')
        .query({name : name})
        .set('Accept', 'application/json')
        .then(res => {
            return res.body.trainers
        })
}

api.getServiceByKeyword = keyword =>{
    return Request.get(config.BACKURL + '/services/search/items')
        .query({keyword : keyword})
        .set('Accept', 'application/json')
        .then(res => {
            return res.body.services
        })
}

/* GET PART */

api.getUserById = id =>{
    return Request.get(config.BACKURL + '/users/' + id)
        .set('Accept', 'application/json')
        .then(res => {
            return res.body.user
        })
}

api.getUserByUsername = username =>{
    return Request.get(config.BACKURL + '/users/username/' + username)
        .set('Accept', 'application/json')
        .then(res => {
            return res.body.user
        })
}

api.getServiceById = serviceId =>{
    return Request.get(config.BACKURL + '/services/' + serviceId)
        .set('Accept', 'application/json')
        .then(res => {
            return res.body.service
        })
}

api.getServiceOfTrainer = trainerId =>{
    return Request.get(config.BACKURL + '/services/trainer/' + trainerId)
        .set('Accept', 'application/json')
        .then(res => {
            return res.body.services
        })
}

api.getTimeSlotOfService = serviceId => {
    return Request.get(config.BACKURL + '/timeSlots/service/' + serviceId)
        .set('Accept','application/json')
        .then(res => {
            return res.body.timeSlots
        })
}

api.getReviewOfReservation = reservationId => {
  return Request.get(config.BACKURL + '/reviews/reservation/' + reservationId)
    .set('Accept', 'application/json')
    .then(res => {
      return res.body.reviews
    })
}

api.getReviewById = reviewId => {
  return Request.get(config.BACKURL + '/reviews/' + reviewId)
    .set('Accdept', 'application/json')
    .then(res => {
      return res.body.reviews
    })
}

api.getReviewByTrainerId = trainerId => {
  return Request.get(config.BACKURL + '/reviews/trainer/' + trainerId)
    .set('Accdept', 'application/json')
    .then(res => {
      return res.body.reviews
    })
}

api.getReportById = reportId => {
  return Request.get(config.BACKURL + '/reports/' + reportId)
    .set('Accdept', 'application/json')
    .then(res => {
      return res.body.reports
    })
}

api.getReportByTrainerId = trainerId => {
  return Request.get(config.BACKURL + '/reports/trainer/' + trainerId)
    .set('Accdept', 'application/json')
    .then(res => {
      return res.body.reports
    })
}

/* CREATION PART */

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

/* PATCH PART */

api.editUserById = (id, data) => {
    return Request.patch(config.BACKURL + '/users/' + id)
        .set('x-access-token', auth.getToken() || '')
        .set('Accept', 'application/json')
        .send(data)
        .then(res => {
            return res.body
        },api.err)
}

api.editServiceById = (id, data) => {
    return Request.patch(config.BACKURL + '/services/' + id)
        .set('x-access-token', auth.getToken() || '')
        .set('Accept', 'application/json')
        .send(data)
        .then(res => {
            return res.body
        },api.err)
}

api.renewPassword = data => {
    return Request.post(config.BACKURL + '/renewPassword')
        .set('x-access-token', auth.getToken() || '')
        .set('Accept', 'application/json')
        .send(data)
        .then(res => {
            return res.body
        },api.err)
}

/* DELETE PART */

api.removeUserById = id => {
    return Request.delete(config.BACKURL + '/users/' + id)
        .set('x-access-token', auth.getToken() || '')
        .set('Accept', 'application/json')
        .then(res => {
            return res.body
        },api.err)
}

api.removeServiceById = id => {
    return Request.delete(config.BACKURL + '/services/' + id)
        .set('Accept', 'application/json')
        .then(res => {
            return res.body
        },api.err)
}

/* AUTHENTICATION PART */

api.signin = data => {
	return Request.post(config.BACKURL + '/signin')
        .set('Accept', 'application/json')
        .send(data)
		.then(res => {
			return res.body
		},api.err)
}

api.hasEmail = email =>{
    return Request.get(config.BACKURL + '/users/hasEmail/' + email)
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
