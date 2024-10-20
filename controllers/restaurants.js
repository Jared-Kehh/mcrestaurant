const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
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
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const Create = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb
    .getDb().db().collection('contacts').insertOne(contact);
  if (result.acknowledged){
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Something happened in the contacts while creating.');
  };
};

const Update = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb().db().collection('contacts').replaceOne({ _id: userId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Something happened in the contacts while updating.');
  };
};

const Delete = async(req, res) => {
  const userId = new ObjectId(req.params.id)
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({_id: userId}, true); 
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(response.error || 'Something happened in the contacts while deleting.');
  };  
};


module.exports = { getAll, getSingle, Create, Update, Delete };