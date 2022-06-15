const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate, validateCards,validateUserUpdate } = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();






router.get('/allCards', auth, async (req, res) => {
  if (!req.query.numbers) res.status(400).send('Missing numbers data');

  let data = {};
  data.cards = req.query.numbers.split(",");
});

router.get('/getAllUsers', auth, async (req, res) => {
  const users = await User.find();
  const lowRankUsers = users.filter(user=>{
    return user.access!=="manager"
  })
  res.send(lowRankUsers)
});



router.get('/usersList',async (req, res) => {
  const user = await User.findOne({ access: 'manager'})
  res.status(200).send(user)
})

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.send(user);
});

router.patch('/cards', auth, async (req, res) => {
  
  const { error } = validateCards(req.body);
  if (error) res.status(400).send(error.details[0].message);

  if (cards.length != req.body.cards.length) res.status(400).send("Card numbers don't match");

  let user = await User.findById(req.user._id);
  user.cards = req.body.cards;
  user = await user.save();
  res.send(user);

});


router.put('/endOrder', auth, async (req, res) => {
  debugger
  let user = await User.findById(req.user._id)
  const orders= user.order.filter(or=>{
    return or._id!==req.body.id
  })
  user.order = orders
  await User.findByIdAndUpdate(req.user._id,user);

  res.send(orders)
})

router.put('/changeAccess',auth, async (req, res) => {
  debugger
  let user = await User.findById(req.body.idUser)
  user.access = req.body.value
  await User.findByIdAndUpdate(req.body.idUser,user);
  const users = await User.find()
  const lowRankUsers = users.filter(user=>{
    return user.access!=="manager"
  })
  res.send(lowRankUsers)
})
router.put('/changeStatusOrder',auth, async (req, res) => {
  let user = await User.findById(req.body.idUser)
  const orders =  user.order.map(or=>{
    if (or._id === req.body.idOrder) {
      let order = or
      order.statusOrder = req.body.value
      return order
    }
    return or
  })
  user.order = orders
  await User.findByIdAndUpdate(req.body.idUser,user);
  const users = await User.find()
  const lowRankUsers = users.filter(user=>{
    return user.access!=="manager"
  })
  res.send(lowRankUsers)
})
router.put('/', auth, async (req, res) => {
  const { error } = validateUserUpdate(req.body);
  if (error) {
    return res.send(error)
  }
  let user = await User.findById(req.user._id);
  let email = await User.find({email:req.body.email});
  if (!email || req.body.email===user.email) {
    user.email = req.body.email
    user.name = req.body.name
    user.phone = req.body.phone
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await User.findByIdAndUpdate(req.user._id,user);
    return res.send(user)
  }
  res.send(null)
  
})
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');
  user = new User(_.pick(req.body, ['name', 'email', 'password','phone', 'access','cards','order']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email']));

});



module.exports = router; 
