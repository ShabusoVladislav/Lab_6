const mongoose = require('mongoose');

const { Schema, model } = mongoose;

require('dotenv').config();

mongoose.connect(process.env.MONGODB_KEY, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Connected'))
  .catch(() => {
    console.log("Connection error");
    process.exit()
  });

  const Payments = new Schema({
    username: String,
    total_sum: Number,
    payment_method: String
  });
  
  const PaymentsModel = model('Payments', Payments);
  
  module.exports = {
    PaymentsModel
  }