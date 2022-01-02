const express = require('express');
const router = express.Router();

const Subscriber = require('../models/subscribers');


// creation of subscriber
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        channel: req.body.channel
    });
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//get all subscribers
router.get('/', async (req, res) => {
    try{
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})


// get subscriber by id
router.get('/:id', getSubscriber, async(req, res) => {
    res.json(res.subscriber);
})


// delete subscriber by id
router.delete('/:id', getSubscriber, async (req, res) => {
    try{
        await res.subscriber.remove();
        res.json({message: 'Deleted Subscriber'});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

// Update subsciber by id
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name;
    }
    if(req.body.channel != null){
        res.subscriber.channel = req.body.channel;
    }
    try{
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

//middleware to get Subsciber by ID
async function getSubscriber(req, res, next){
    let subscriber;
    try{
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null){
            res.status(404).json({message: 'Cannot find the subsciber'});
        }
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
    res.subscriber = subscriber;
    next();
}
module.exports = router;