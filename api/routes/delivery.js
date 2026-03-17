const express = require('express');
const { db } = require('../data/seed');

const router = express.Router();

router.get('/:orderId/tracking', (req, res) => {
  const delivery = db.deliveries.find(d => d.orderId === req.params.orderId);
  if (!delivery) {
    return res.status(404).json({ error: 'Not Found', message: `No delivery found for order ${req.params.orderId}` });
  }

  const order = db.orders.find(o => o.id === req.params.orderId);

  res.json({
    orderId: delivery.orderId,
    status: delivery.status,
    driverName: delivery.driverName,
    driverPhone: delivery.driverPhone,
    estimatedArrival: delivery.estimatedArrival,
    currentLocation: delivery.currentLocation,
    deliveryAddress: order ? order.deliveryAddress : null,
    assignedAt: delivery.assignedAt,
    deliveredAt: delivery.deliveredAt
  });
});

router.put('/:orderId/assign', (req, res) => {
  const order = db.orders.find(o => o.id === req.params.orderId);
  if (!order) {
    return res.status(404).json({ error: 'Not Found', message: `Order ${req.params.orderId} not found` });
  }

  const existing = db.deliveries.find(d => d.orderId === req.params.orderId);
  if (existing) {
    return res.status(409).json({ error: 'Conflict', message: `Order ${req.params.orderId} already has a driver assigned` });
  }

  const { driverName, driverPhone } = req.body;
  if (!driverName || !driverPhone) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Fields driverName and driverPhone are required'
    });
  }

  const delivery = {
    orderId: req.params.orderId,
    driverName,
    driverPhone,
    status: 'assigned',
    estimatedArrival: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    currentLocation: { lat: 41.8781, lng: -87.6298 },
    assignedAt: new Date().toISOString(),
    deliveredAt: null
  };

  db.deliveries.push(delivery);
  order.status = 'in_transit';
  order.updatedAt = new Date().toISOString();

  res.status(201).json(delivery);
});

router.get('/active', (req, res) => {
  const activeStatuses = ['assigned', 'in_transit'];
  const active = db.deliveries.filter(d => activeStatuses.includes(d.status));

  res.json({
    count: active.length,
    deliveries: active.map(d => {
      const order = db.orders.find(o => o.id === d.orderId);
      return {
        ...d,
        customerName: order ? order.customerName : null,
        deliveryAddress: order ? order.deliveryAddress : null,
        restaurantId: order ? order.restaurantId : null
      };
    })
  });
});

module.exports = router;
