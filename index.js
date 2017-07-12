const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

const app = express()

mongoose.connect('mongodb://localhost/tenants');


// Create a schema
var tenantsSchema = new mongoose.Schema({
  name: String,
  room: String,
  phone: String
});
// Create a model based on the schema
var tenantsModel = mongoose.model('tenant', tenantsSchema);

// Create a todo in memory
var tenant1 = new tenantsModel({
  name: 'Aime',
  room: '101',
  phone: '086-975-9039'
});

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
	tenantsModel.find(function (err, data) {
	  if (err) return console.error(err);
	  console.log(data)
	  res.send(data)
	});

})


app.post('/tenants/new', function(req, res){
	console.log('GET - /tenants/new')
	console.log(req.body)
	res.send()
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})