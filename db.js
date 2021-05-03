const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let repSchema = new Schema({
    userID : {
    type: String,
    required : true
  },
  marketID: {
    type: String,
    required : true
  },
  marketName: {
    type: String,
    required : true
  },
  cmdtyID: {
    type: String,
    required : true
  },
  marketType: {
    type: String,
    required : true
  },
  cmdtyName: {
    type: String,
    required : true
  },
  convFctr: {
    type: Number,
    required : true 
  },
  priceUnit: {
    type: String,
    required: true,
    default: 'kg'
  },
  price: {
    type: Number,
    required : true
  },
  users:[String],
  timestamps: 
  { type: Number,
    default : Math.floor(Date.now() / 1000)
  }
});

module.exports = mongoose.model('Report',repSchema);