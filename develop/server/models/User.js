const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');

  // Setting the criteria for sign up
  const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: 7
    },
    orders: [Order.schema]
  });

  // using pre-save Middleware for creating a password
  userSchema.pre('save', async function(proceed) {
    if(this.newPassword || this.isModified('password')) {
        const passwordSecurityRounds = 15;
        this.password = await bcrypt.hash(this.password, passwordSecurityRounds);
    }
       proceed();
  });

  // Verify the entered password against the stored encrypted password(hashed)
  userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  const User = mongoose.model("User", userSchema);

  module.exports = User