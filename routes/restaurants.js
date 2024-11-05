const express = require('express');
const router = express.Router();

const restaurantsController = require('../controllers/restaurants');

router.get('/', restaurantsController.getAll);

router.get('/:id', restaurantsController.getSingle);

router.post('/', restaurantsController.Create);

router.put('/:id', restaurantsController.Update);

router.delete('/:id', restaurantsController.Delete);

module.exports = router;