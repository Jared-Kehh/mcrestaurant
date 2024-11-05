const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/restaurants', require('./restaurants'))
router.use('/outsideRestaurants', require('./outsideRestaurants'))

module.exports = router;