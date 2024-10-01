const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router
  .route('/')
  .post(cartController.addToCart)
  .get(cartController.getCartItems);

router
  .route('/:id')
  .patch(cartController.updateCartItem)
  .delete(cartController.removeCartItem);

module.exports = router;
