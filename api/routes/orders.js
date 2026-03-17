const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../data/seed');

const router = express.Router();

const VALID_STATUSES = ['placed', 'confirmed', 'preparing', 'ready', 'in_transit', 'delivered', 'cancelled'];

router.get('/', (req, res) => {
  const { status, restaurantId } = req.query;
  let results = db.orders;

  if (status) {
    results = results.filter(o => o.status === status);
  }
  if (restaurantId) {
    results = results.filter(o => o.restaurantId === restaurantId);
  }

  res.json({
    count: results.length,
    orders: results
  });
});

router.get('/:id', (req, res) => {
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Not Found', message: `Order ${req.params.id} not found` });
  }
  res.json(order);
});

router.post('/', (req, res) => {
  const { restaurantId, customerName, items, deliveryAddress } = req.body;

  if (!restaurantId || !customerName || !items || !items.length || !deliveryAddress) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Fields restaurantId, customerName, items (non-empty array), and deliveryAddress are required'
    });
  }

  const restaurant = db.restaurants.find(r => r.id === restaurantId);
  if (!restaurant) {
    return res.status(404).json({ error: 'Not Found', message: `Restaurant ${restaurantId} not found` });
  }

  const orderItems = items.map(i => {
    const menuItem = db.menuItems.find(m => m.id === i.menuItemId);
    return {
      menuItemId: i.menuItemId,
      name: menuItem ? menuItem.name : 'Unknown Item',
      quantity: i.quantity || 1,
      price: menuItem ? menuItem.price : 0
    };
  });

  const total = orderItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const now = new Date().toISOString();

  const order = {
    id: `order-${uuidv4().slice(0, 8)}`,
    restaurantId,
    customerName,
    items: orderItems,
    status: 'placed',
    total: parseFloat(total.toFixed(2)),
    deliveryAddress,
    createdAt: now,
    updatedAt: now
  };

  db.orders.push(order);
  res.status(201).json(order);
});

router.put('/:id/status', (req, res) => {
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Not Found', message: `Order ${req.params.id} not found` });
  }

  const { status } = req.body;
  if (!status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`
    });
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();
  res.json(order);
});

module.exports = router;
