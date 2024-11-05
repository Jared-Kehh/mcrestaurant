const express = require('express');
const router = express.Router();

const restaurantsController = require('../controllers/restaurants');

router.get('/', restaurantsController.getAllOther);

router.get('/:id', restaurantsController.getSingleOther);

router.post('/', restaurantsController.CreateOther);

router.put('/:id', restaurantsController.UpdateOther);

router.delete('/:id', restaurantsController.DeleteOther);

module.exports = router;