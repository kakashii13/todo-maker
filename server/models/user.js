const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashPassword: String,
  isAdmin: Boolean,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (doc, rto) => {
    rto.id = rto._id;
    delete rto._id;
    delete rto.hashPassword;
    delete rto.__v;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
