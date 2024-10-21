
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('restaurants').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('restaurants')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const Create = async (req, res) => {
  const contact = {
    name: req.body.name,
    foodtype: req.body.foodtype,
    foodtype2: req.body.foodtype2,
    hoursopen: req.body.hoursopen,
    daysopen: req.body.daysopen,
    location: req.body.location,
    description: req.body.description
  };
  const result = await mongodb
    .getDb().db().collection('restaurants').insertOne(contact);
  if (result.acknowledged){
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Something happened in the restaurants while creating.');
  };
};

const Update = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    name: req.body.name,
    foodtype: req.body.foodtype,
    foodtype2: req.body.foodtype2,
    hoursopen: req.body.hoursopen,
    daysopen: req.body.daysopen,
    location: req.body.location,
    description: req.body.description
  };
  const response = await mongodb
    .getDb().db().collection('restaurants').replaceOne({ _id: userId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Something happened in the restaurants while updating.');
  };
};

const Delete = async(req, res) => {
  const userId = new ObjectId(req.params.id)
  const response = await mongodb.getDb().db().collection('restaurants').deleteOne({_id: userId}, true); 
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(response.error || 'Something happened in the restaurants while deleting.');
  };  
};


module.exports = { getAll, getSingle, Create, Update, Delete };