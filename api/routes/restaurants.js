const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../data/seed');

const router = express.Router();

router.get('/', (req, res) => {
  const { cuisine, isOpen } = req.query;
  let results = db.restaurants;

  if (cuisine) {
    results = results.filter(r => r.cuisine.toLowerCase() === cuisine.toLowerCase());
  }
  if (isOpen !== undefined) {
    results = results.filter(r => r.isOpen === (isOpen === 'true'));
  }

  res.json({
    count: results.length,
    restaurants: results
  });
});

router.get('/:id', (req, res) => {
  const restaurant = db.restaurants.find(r => r.id === req.params.id);
  if (!restaurant) {
    return res.status(404).json({ error: 'Not Found', message: `Restaurant ${req.params.id} not found` });
  }
  res.json(restaurant);
});

router.post('/', (req, res) => {
  const { name, cuisine, address, estimatedDeliveryMin, estimatedDeliveryMax } = req.body;

  if (!name || !cuisine || !address) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Fields name, cuisine, and address are required'
    });
  }

  const restaurant = {
    id: `rest-${uuidv4().slice(0, 8)}`,
    name,
    cuisine,
    address,
    rating: 0,
    isOpen: true,
    estimatedDeliveryMin: estimatedDeliveryMin || 20,
    estimatedDeliveryMax: estimatedDeliveryMax || 40,
    createdAt: new Date().toISOString()
  };

  db.restaurants.push(restaurant);
  res.status(201).json(restaurant);
});

router.put('/:id', (req, res) => {
  const idx = db.restaurants.findIndex(r => r.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Restaurant ${req.params.id} not found` });
  }

  const updates = req.body;
  db.restaurants[idx] = { ...db.restaurants[idx], ...updates, id: db.restaurants[idx].id };
  res.json(db.restaurants[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = db.restaurants.findIndex(r => r.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Restaurant ${req.params.id} not found` });
  }

  const removed = db.restaurants.splice(idx, 1)[0];
  res.json({ message: `Restaurant "${removed.name}" removed`, id: removed.id });
});

module.exports = router;
