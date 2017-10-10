const express = require('express')
var bodyParser = require('body-parser')
var dbModel = require("./model/schema")
const app = express()

// Models
// Create tenants model based on the schema
var tenant = dbModel.tenant;

// Create room-tenants relationship model based on the schema
var room = dbModel.room;

// Create user model based on the schema
var user = dbModel.user;

// Create payment model based on the schema
var payment = dbModel.payment;

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
		if (err) return console.error(err);
		res.send(data)
	});

})

/**
* get a tenant
* Req: GET
* params:
* return: a tenant
**/
app.get('/tenant/:tenantId', function(req, res){
	var tenantId = req.params.tenantId;
	console.log('GET - /tenant/'+tenantId)
	tenant.find({_id: tenantId}, function (err, data) {
		if (err) return console.error(err);
		res.send(data)
	});

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
	 	if (err) return console.error(err);
		res.send(data)
	});

})

/**
* get a room
* Req: GET
* params: 
*	roomNumber - ex. 101, 102, 103
* return: a room's information
**/
app.get('/room/:roomNumber', function(req, res){
	var roomNo = req.params.roomNumber;
	console.log('GET - /room/'+roomNo)
	room.find({room: roomNo}, function (err, data) {
		if (err) return console.error(err);
		res.send(data)
	});

})

/**
* add new tenant
* Req: POST
* params:
*	name – tenant's name
*	phone – phone number
*	room – tenant's room
* return:
**/
app.post('/tenant/new', function(req, res){
	console.log('POST - /tenants/new')
	tenant.create({name: req.body.name, 
  		phone: req.body.phone
	}, function(err, data){
		if(err) console.log(err);
		else { 
			room.create({room: req.body.room, 
		  		tenantId: data._id
			}, function(err, data){
				if(err) console.log(err);
				else {
					res.send()
			  	}
			});
		}
	});
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
  		password: req.body.password
	}, function(err, data){
		if(err) console.log(err);
		else { 
			res.send(data)
		}
	});
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
	 	if (err) return console.error(err);
		res.send(data)
	});
})

/**
* return all users
* Req: GET
* params:
* return: list of all user
**/
app.get('/user/:username', function(req, res){
	var username = req.params.username
	console.log('GET - /user/'+username)
	user.find({username: username},function (err, data) {
	 	if (err) return console.error(err);
		res.send(data)
	});
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})