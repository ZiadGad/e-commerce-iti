const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;

  // Check if the product already exists in the cart
  const existingCartItem = await Cart.findOne({ productId });

  if (existingCartItem) {
    // If it exists, update the quantity
    existingCartItem.quantity += quantity; // You can also set a specific quantity if needed
    await existingCartItem.save();

    return res.status(200).json({
      status: 'success',
      data: {
        cartItem: existingCartItem,
      },
    });
  }

  // If it doesn't exist, create a new cart item
  const cartItem = await Cart.create({ productId, quantity });

  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError('Invalid product ID, product not found', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      cartItem,
    },
  });
});

exports.getCartItems = catchAsync(async (req, res, next) => {
  const cartItems = await Cart.find();

  res.status(200).json({
    status: 'success',
    results: cartItems.length,
    data: {
      cartItems,
    },
  });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const cartItem = await Cart.findByIdAndUpdate(
    id,
    { quantity },
    { new: true, runValidators: true },
  );

  if (!cartItem) {
    return next(new AppError('No cart item found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      cartItem,
    },
  });
});

exports.removeCartItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const cartItem = await Cart.findByIdAndDelete(id);

  if (!cartItem) {
    return next(new AppError('No cart item found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
