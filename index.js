const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

const app = express()

mongoose.connect('mongodb://localhost/tenants');


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

// Create tenants model based on the schema
var tenantModel = mongoose.model('tenant', tenantSchema);
var roomTenantRelationModel = mongoose.model('room', roomTenantRelationSchema);

app.use(bodyParser.json())

app.get('/', function (req, res) {
	console.log('GET - /')
	res.send('Hello World!')
})

app.get('/test', function(req, res){
	console.log('GET - /test')
	tenant1.save(function(err){
		if(err)
			console.log(err);
		else
		console.log(tenant1);
	});
	res.send()
})

app.get('/tenants', function(req, res){
	console.log('GET - /tenants')
	tenantModel.find(function (err, data) {
		if (err) return console.error(err);
		res.send(data)
	});

})

app.get('/rooms', function(req, res){
	console.log('GET - /rooms')
	roomTenantRelationModel.find(function (err, data) {
	 	if (err) return console.error(err);
		res.send(data)
	});

})

app.get('/room/:roomNumber', function(req, res){
	console.log('GET - /room')
	var roomNo = req.params.roomNumber;
	roomTenantRelationModel.find({room: roomNo}, function (err, data) {
		if (err) return console.error(err);
		res.send(data)
	});

})


app.post('/tenants/new', function(req, res){
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
					res.send(data)
			  	}
			});
		}
	});

	
})


app.listen(3000, function () {
  console.log('App listening on port 3000!')
})