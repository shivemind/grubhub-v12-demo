const express = require('express');
const { db } = require('../data/seed');

const router = express.Router();

router.get('/restaurants/:restaurantId/menu', (req, res) => {
  const restaurant = db.restaurants.find(r => r.id === req.params.restaurantId);
  if (!restaurant) {
    return res.status(404).json({ error: 'Not Found', message: `Restaurant ${req.params.restaurantId} not found` });
  }

  const items = db.menuItems.filter(i => i.restaurantId === req.params.restaurantId);
  const categories = {};
  items.forEach(item => {
    if (!categories[item.category]) categories[item.category] = [];
    categories[item.category].push(item);
  });

  res.json({
    restaurantId: req.params.restaurantId,
    restaurantName: restaurant.name,
    itemCount: items.length,
    categories
  });
});

router.post('/restaurants/:restaurantId/menu/items', (req, res) => {
  const restaurant = db.restaurants.find(r => r.id === req.params.restaurantId);
  if (!restaurant) {
    return res.status(404).json({ error: 'Not Found', message: `Restaurant ${req.params.restaurantId} not found` });
  }

  const { name, description, price, category } = req.body;
  if (!name || price === undefined || !category) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Fields name, price, and category are required'
    });
  }

  const item = {
    id: db.nextMenuItemId(),
    restaurantId: req.params.restaurantId,
    name,
    description: description || '',
    price: parseFloat(price),
    category,
    available: true
  };

  db.menuItems.push(item);
  res.status(201).json(item);
});

router.put('/menu/items/:itemId', (req, res) => {
  const idx = db.menuItems.findIndex(i => i.id === req.params.itemId);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Menu item ${req.params.itemId} not found` });
  }

  const updates = req.body;
  db.menuItems[idx] = {
    ...db.menuItems[idx],
    ...updates,
    id: db.menuItems[idx].id,
    restaurantId: db.menuItems[idx].restaurantId
  };
  res.json(db.menuItems[idx]);
});

router.delete('/menu/items/:itemId', (req, res) => {
  const idx = db.menuItems.findIndex(i => i.id === req.params.itemId);
  if (idx === -1) {
    return res.status(404).json({ error: 'Not Found', message: `Menu item ${req.params.itemId} not found` });
  }

  const removed = db.menuItems.splice(idx, 1)[0];
  res.json({ message: `Menu item "${removed.name}" removed`, id: removed.id });
});

module.exports = router;
