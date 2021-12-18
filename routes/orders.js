const express = require("express");
const router = express.Router();

const checkAuth = require('../config/check-auth');
const orderController = require('../controllers/orderController');

router.post('/', orderController.addOrder);

router.get('/', orderController.getOrders);

router.get('/:orderId', orderController.getOrderById);

// // FIX: Try to solve with get request
router.post('/filter', orderController.getOrderByFilter);

router.patch('/:orderId', orderController.updateOrder);

router.post('/:orderId', orderController.cancelOrder);

router.get('/cacelledOrders/', orderController.getCancelledOrders);

router.delete('/', orderController.deleteOrders);

router.delete('/:id', orderController.deleteOrderById);

module.exports = router;