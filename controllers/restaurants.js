
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try{
  const result = await mongodb.getDb().db().collection('restaurants').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  })} catch (err){
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'An error occurred while fetching restaurants.' });
  };
};

const getSingle = async (req, res, next) => {
  try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('restaurants')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  })} catch (err){
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'An error occurred while fetching restaurants.' });
  };
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
    try{
      result.acknowledged;
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json(err || 'Some error occurred while creating the contact.');
    }
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
    try {
      response.modifiedCount > 0;
      res.status(204).send();
    }
    catch (err) {
      res.status(500).json(err || 'Some error occurred while updating the contact.');
    }
};

const Delete = async(req, res) => {
  const userId = new ObjectId(req.params.id)
  const response = await mongodb.getDb().db().collection('restaurants').deleteOne({_id: userId}, true); 
  console.log(response);
  try {
    response.deletedCount > 0;
    res.status(204).send();
  }
  catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the contact.');
  }
};

const getAllOther = async (req, res, next) => {
  try{
  const result = await mongodb.getDb().db().collection('outsideRestaurants').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  })} catch (err){
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'An error occurred while fetching restaurants.' });
  };
};

const getSingleOther = async (req, res, next) => {
  try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('outsideRestaurants')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  })} catch (err){
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'An error occurred while fetching restaurants.' });
  };
};

const CreateOther = async (req, res) => {
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
    .getDb().db().collection('outsideRestaurants').insertOne(contact);
    try{
      result.acknowledged;
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json(err || 'Some error occurred while creating the contact.');
    }
};

const UpdateOther = async (req, res) => {
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
    .getDb().db().collection('outsideRestaurants').replaceOne({ _id: userId }, contact);
    try {
      response.modifiedCount > 0;
      res.status(204).send();
    }
    catch (err) {
      res.status(500).json(err || 'Some error occurred while updating the contact.');
    }
};

const DeleteOther = async(req, res) => {
  const userId = new ObjectId(req.params.id)
  const response = await mongodb.getDb().db().collection('outsideRestaurants').deleteOne({_id: userId}, true); 
  console.log(response);
  try {
    response.deletedCount > 0;
    res.status(204).send();
  }
  catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the contact.');
  }
};

module.exports = { getAll, getSingle, Create, Update, Delete, 
  getAllOther, getSingleOther, CreateOther, UpdateOther, DeleteOther };