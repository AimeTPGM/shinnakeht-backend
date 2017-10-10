const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/tenants');

//Schema
// Create tenants schema
var tenantSchema = new mongoose.Schema({
  name: String,
  phone: String
});

// Create room-tenants relationship schema
var roomSchema = new mongoose.Schema({
  roomNumber: String,
  currentUser: String,
  currentPrice: String
});

// Create room schema
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  tenantId: String
});

// Create room schema
var paymentSchema = new mongoose.Schema({
  roomNumber: String,
	rent: String,
  date: String,
  tenantId: String,
  water: String,
  electicity: String
});

// Models
// Create tenants model based on the schema
var tenantModel = mongoose.model('tenant', tenantSchema);

// Create room-tenants relationship model based on the schema
var roomModel = mongoose.model('room', roomSchema);

// Create user model based on the schema
var userModel = mongoose.model('user', userSchema);

// Create payment model based on the schema
var paymentModel = mongoose.model('payment', paymentSchema);

module.exports = {
  tenant: tenantModel,
  room: roomModel,
  user: userModel,
  payment: paymentModel
}