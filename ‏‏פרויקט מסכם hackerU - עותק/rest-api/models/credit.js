const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const creditSchema = new mongoose.Schema({
    creditNumber: {
    type: String,
    required: true,
    minlength: 16,
    maxlength: 255,
    unique: true,
  },
  creditDate:{
    type: String,
    required: true,
  },
  creditSecretNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Credit = mongoose.model("Credit", creditSchema);

function validateCredit(credit) {
  const schema = Joi.object({
    creditNumber: Joi.string().min(16).max(255).unique().required(),
    creditDate: Joi.string().min(1).max(255).required(),
    creditSecretNumber: Joi.string().min(3).max(255).required(),
    user_id:Joi.string().required()
  });

  return schema.validate(credit);
}

exports.Credit = Credit;
exports.validateCredit = validateCredit;
