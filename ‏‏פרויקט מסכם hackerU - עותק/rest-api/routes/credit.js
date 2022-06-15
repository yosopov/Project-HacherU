const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { Credit, validateCredit } = require('../models/credit');
const auth = require('../middleware/auth');
const router = express.Router();

router.delete('/:id',auth,async(req,res)=>{
  let user = await User.findById(req.user._id).select('password');
  const  valueUser = await bcrypt.compare(req.params.id,user.password)

  if (valueUser) {
    await Credit.deleteOne({ user_id: req.user._id})
    return res.send(true)
  }
    res.send(false)
})

router.get('/',auth,async(req,res)=>{
  const credit = await Credit.find({ user_id: req.user._id})
  res.send(credit)
})

router.post('/', auth ,async(req,res)=>{
  const creditNumber = await Credit.findOne({ creditNumber: req.body.form.creditNumber})
  if (creditNumber) {
    res.send('it is not possible to register a Credit')
  }
    let credit = new Credit({
        creditNumber: req.body.form.creditNumber,
        creditDate: req.body.form.creditDate,
        creditSecretNumber: req.body.form.creditSecretNumber,
        user_id:req.user._id
    });
    const salt = await bcrypt.genSalt(10);
    credit.creditNumber = await  bcrypt.hash(credit.creditNumber, salt); 
    credit.creditSecretNumber = await  bcrypt.hash(credit.creditSecretNumber, salt);       
    await  credit.save()  
    res.send(credit);
  })

module.exports = router; 
