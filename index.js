const express = require('express')
const mongoose = require('mongoose')
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

app.get('/findAll', function(req, res){
	console.log('GET - /findAll')
	tenantsModel.find(function (err, data) {
	  if (err) return console.error(err);
	  console.log(data)
	  res.send(data)
	});

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})