const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

const app = express()

mongoose.connect('mongodb://localhost/tenants');

//Schema
// Create tenants schema
var tenantSchema = new mongoose.Schema({
  name: String,
  phone: String
});

// Create room-tenants relationship schema
var roomTenantRelationSchema = new mongoose.Schema({
  room: String,
  tenantId: String
});

// Create user schema
var roomTenantRelationSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Models
// Create tenants model based on the schema
var tenantModel = mongoose.model('tenant', tenantSchema);

// Create room-tenants relationship model based on the schema
var roomTenantRelationModel = mongoose.model('room', roomTenantRelationSchema);

// Create user model based on the schema
var userModel = mongoose.model('user', userSchema);

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
app.get('/tenants', function(req, res){
	console.log('GET - /tenants')
	tenantModel.find(function (err, data) {
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
app.get('/rooms', function(req, res){
	console.log('GET - /rooms')
	roomTenantRelationModel.find(function (err, data) {
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
	console.log('GET - /room')
	var roomNo = req.params.roomNumber;
	roomTenantRelationModel.find({room: roomNo}, function (err, data) {
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
	console.log('GET - /tenants/new')
	tenantModel.create({name: req.body.name, 
  		phone: req.body.phone
	}, function(err, data){
		if(err) console.log(err);
		else { 
			roomTenantRelationModel.create({room: req.body.room, 
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


app.listen(3000, function () {
  console.log('App listening on port 3000!')
})