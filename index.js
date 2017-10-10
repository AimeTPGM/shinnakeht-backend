const express = require('express')
var bodyParser = require('body-parser')
var dbModel = require("./model/schema")
const app = express()

// Models
// Create tenants model based on the schema
var tenant = dbModel.tenant

// Create room-tenants relationship model based on the schema
var room = dbModel.room

// Create user model based on the schema
var user = dbModel.user

// Create payment model based on the schema
var payment = dbModel.payment

app.use(bodyParser.json())

/**
* test server
* Req: GET
* params:
* return:
**/
app.get('/', function (req, res) {
	console.log('GET - /')
	res.send('Hello World!')
})

/**
* get all tenants
* Req: GET
* params:
* return: list of tenants
**/
app.get('/tenant/all', function(req, res){
	console.log('GET - /tenant/all')
	tenant.find(function (err, data) {
		if (err) return console.error(err)
		res.send(data)
	})

})

/**
* get a tenant
* Req: GET
* params:
* return: a tenant
**/
app.get('/tenant/:tenantId', function(req, res){
	var tenantId = req.params.tenantId
	console.log('GET - /tenant/'+tenantId)
	tenant.find({_id: tenantId}, function (err, data) {
		if (err) return console.error(err)
		res.send(data)
	})

})

/**
* add new tenant
* Req: POST
* params:
*	name – tenant's name
*	phone – phone number
* return:
**/
app.post('/tenant/new', function(req, res){
	console.log('POST - /tenants/new')
	tenant.create({name: req.body.name, 
  		phone: req.body.phone
	}, function(err, data){
		if(err) console.log(err)
		res.send()
	})
})

/**
* get all rooms
* Req: GET
* params:
* return: list of room
**/
app.get('/room/all', function(req, res){
	console.log('GET - /room/all')
	room.find(function (err, data) {
	 	if (err) return console.error(err)
		res.send(data)
	})

})

/**
* get a room
* Req: GET
* params: 
*	roomNumber - ex. 101, 102, 103
* return: a room's information
**/
app.get('/room/:roomNumber', function(req, res){
	var roomNo = req.params.roomNumber
	console.log('GET - /room/'+roomNo)
	room.find({room: roomNo}, function (err, data) {
		if (err) return console.error(err)
		res.send(data)
	})

})

/**
* create a room
* Req: GET
* params: 
*	roomNumber - ex. 101, 102, 103
* return: a room's information
**/
app.post('/room/new', function(req, res){
	console.log('POST - /room/new')
	room.create({roomNumber: req.body.roomNumber, 
  		currentUser: req.body.userId
	}, function(err, data){
		if(err) console.log(err)
		res.send(data)
	})
})

/**
* add user
* Req: POST
* params:
*	username – user's name (for login)
*	password – password (Encrypted)
* return: 
**/
app.post('/user/new', function(req, res){
	console.log('POST - /new/user')
	user.create({username: req.body.username, 
  		password: req.body.password,
  		tenantId: req.body.tenantId
	}, function(err, data){
		if(err) console.log(err)
		res.send(data)
		
	})
})

/**
* return all users
* Req: GET
* params:
* return: list of all user
**/
app.get('/user/all', function(req, res){
	console.log('GET - /user/all')
	user.find(function (err, data) {
	 	if (err) return console.error(err)
		res.send(data)
	})
})

/**
* return a users
* Req: GET
* params:
* return: list of all user
**/
app.get('/user/:username', function(req, res){
	var username = req.params.username
	console.log('GET - /user/'+username)
	user.find({username: username},function (err, data) {
	 	if (err) return console.error(err)
		res.send(data)
	})
})

/**
* return all payment
* Req: GET
* params:
* return: list of all payment
**/
app.get('/payment/all', function(req, res){
	console.log('GET - /user/all')
	payment.find(function (err, data) {
	 	if (err) return console.error(err)
		res.send(data)
	})
})

/**
* return a payment
* Req: GET
* params:
* return: list of a payment
**/
app.get('/payment/:roomNumber', function(req, res){
	var roomNumber = req.params.roomNumber
	console.log('GET - /payment/'+roomNumber)
	payment.find({roomNumber: roomNumber},function (err, data) {
	 	if (err) return console.error(err)
		res.send(data)
	})
})

/**
* create a new payment
* Req: POST
* params:
* return: list of all payment
**/
app.post('/payment/new', function(req, res){
	var data = req.body
	var date = new Date()
	var currentDate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
	console.log(currentDate)
	console.log('POST - /payment/new')
	payment.create(
		{
			roomNumber: data.roomNumber, 
  		rent: data.rent,
  		tenantId: data.tenantId,
  		water: data.water,
  		electricity: data. electricity,
  		date: currentDate,
  		status: "unpaid"
	}, function(err, data){
		if(err) console.log(err)
		res.send(data)
	})
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})