const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://nimba:JT9z0KHMUyyMm6pH@cluster0.kryju.mongodb.net/test?authSource=admin&replicaSet=atlas-139jy3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log(" Mongoose is connected"));
// IIFE
(async () => {
    try {
        await mongoose.connect('mongodb+srv://nimba:JT9z0KHMUyyMm6pH@cluster0.kryju.mongodb.net/test?authSource=admin&replicaSet=atlas-139jy3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
         //{ useCreateIndex: true, useNewUrlParser: true }
         );
      } catch (err) {
        console.log('mongodb connection error' + err);
      }
})();

const { Schema } = mongoose;
const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: false },
  phone: { type: Number, required: false },
  isUserTypeAdmin:{type: Boolean, required: false },
});

module.exports = mongoose.model('userDetails', userSchema, 'userDetails');
