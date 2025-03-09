const express = require('express');
const router = express.Router();
const addressRoutes = require('./address');
const authRoutes = require('./auth');
const categoryRoutes = require('./category');
const orderRoutes = require('./order');
const orderItemRoutes = require('./orderItem');
const paymentRoutes = require('./payment');
const priceInfoRoutes = require('./priceInfo');
const productRoutes = require('./product');
const reviewRoutes = require('./review');
const userRoutes = require('./user');

router.use('/address', addressRoutes);
router.use('/auth', authRoutes); 
router.use('/category', categoryRoutes); 
router.use('/order', orderRoutes);  
router.use('/orderItem', orderItemRoutes); 
router.use('/payment', paymentRoutes);
router.use('/priceInfo', priceInfoRoutes);
router.use('/product', productRoutes);
router.use('/review', reviewRoutes);
router.use('/user', userRoutes);

module.exports = router;