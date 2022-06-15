const express = require('express');
const _ = require('lodash');
const { Card, validateCard } = require('../models/card');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();
const uuidv4 = require("uuid")


router.delete('/removeCard/:id', auth, async (req, res) => {
  const user = await User.findOne({_id: req.user._id });
  const cards = user.cards.filter(card => {
    if(card._id !== req.params.id){
      return card
    } 
  });
  user.cards= cards
  await User.findOneAndUpdate({ _id: req.user._id }, user);
  res.send(cards);
});


router.put('/add', auth ,async(req,res)=>{
  let user = await User.findById(req.user._id);
  for (const card of user.cards) {
    if (card._id === req.body._id) {
      if (card.amount + req.body.amount<100) {
        card.amount = card.amount + req.body.amount
        card.totalPrice = (Number(card.totalPrice)+Number(req.body.totalPrice)).toFixed(2)
         await User.findOneAndUpdate({ _id: req.user._id }, user);
        return res.send(user.cards);
      }
      return res.send(false);
    }
  }
  user.cards = [...user.cards,req.body]
  await User.findOneAndUpdate({ _id: req.user._id }, user);
  res.send(user.cards);
})

router.put('/openAnOreder', auth, async (req, res) => {
  const users = await User.findOne({ _id: req.user._id});
  users.order = [...users.order,{_id:uuidv4.v4(),cards:users.cards,statusOrder:"Your order is being processed"}]
  if (users.order.length<3) {
    users.cards = []
    await User.findOneAndUpdate({ _id: req.user._id},users);
   return res.send(users.cards);
    
  }
  res.send(false)
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let card = await Card.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, req.body);
  if (!card) return res.status(404).send('The card with the given ID was not found.');
  card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(card);
});



router.get('/navigation:name', async (req, res) => {
  const cards = await Card.find({attribution:req.params.name})
  res.send(cards);
});
router.get('/cardsName:name', async (req, res) => {
  let cardsCategory = req.query.cardsCategory
  if (cardsCategory!=="undefined") {
    const cards = await Card.find({attribution:cardsCategory, productName:RegExp(req.params.name)})
    return  res.send(cards);
  }
    const cards = await Card.find({productName:RegExp(req.params.name)})
    res.send(cards);
  
});

router.get('/myCards',auth, async (req, res) => {
  if (!req.user) res.status(400).send('Offline user');
  const user = await User.findById(req.user._id)
  const cards = user.cards
  res.send(cards);
});
router.get('/myOrders',auth, async (req, res) => {
  if (!req.user) res.status(400).send('Offline user');
  const user = await User.findById(req.user._id)
  const order = user.order
  res.send(order);
});
router.get('/:id', auth, async (req, res) => {
  const card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  if (!card) return res.status(404).send('The card with the given ID was not found.');
  res.send(card);
  
});

router.get('/', async (req, res) => {
    const cards = await Card.find()
    return res.send(cards);
});

router.post('/AddProduct', auth ,async(req,res)=>{
  const findCard = await Card.findOne({ productName: req.body.productName})
  if (findCard) {
    return res.send(false)
  }
  let card = new Card(
    {
        attribution: req.body.attribution,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productImage: req.body.productImage,
        weight: req.body.weight
      });
      await card.save()


    res.send(true);



})


router.post('/', async (req, res) => {
  let posts = []
  for (let element of req.body){
    const findCard = await Card.findOne({ productName: element.productName})
    if (!findCard) { 
            let card = new Card(
          {
              attribution: element.attribution,
              productName: element.productName,
              productPrice: element.productPrice,
              productImage: element.productImage,
              weight: element.weight
            });
              
              this.post = await card.save();
              posts = [...posts,this.post]
        }
  }
    res.send(posts);
});

module.exports = router; 