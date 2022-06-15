const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const cardSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  productPrice: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  productImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  attribution:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  weight:{
    type:Boolean,
    required:true
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Card = mongoose.model("Card", cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    productName: Joi.string().min(2).max(255).required(),
    productPrice: Joi.number().min(1).max(255).required(),
    productImage: Joi.string().min(11).required().max(1024),
    attribution: Joi.string().min(2).max(1024).required(),
    weight: Joi.boolean().required(),
  });

  return schema.validate(card);
}

exports.Card = Card;
exports.validateCard = validateCard;
