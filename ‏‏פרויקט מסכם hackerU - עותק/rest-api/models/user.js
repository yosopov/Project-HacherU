const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  phone:{
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  access:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  createdAt: { type: Date, default: Date.now },
  cards: Array,
  order:Array,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, biz: this.biz },
    config.get("jwtKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    phone:Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
    access:Joi.string().min(2).max(255).required(),
  });

  return schema.validate(user);
}
function validateUserUpdate(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    phone:Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
  });

  return schema.validate(user);
}

function validateCards(data) {
  const schema = Joi.object({
    cards: Joi.array().min(1).required(),
  });

  return schema.validate(data);
}

exports.User = User;
exports.validate = validateUser;
exports.validateCards = validateCards;
exports.validateUserUpdate = validateUserUpdate;
