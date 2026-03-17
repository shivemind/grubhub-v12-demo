require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const apiKeyAuth = require('./api/middleware/apiKey');
const restaurantRoutes = require('./api/routes/restaurants');
const menuRoutes = require('./api/routes/menus');
const orderRoutes = require('./api/routes/orders');
const deliveryRoutes = require('./api/routes/delivery');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'GrubHub Partner API',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use('/api/v1/restaurants', apiKeyAuth, restaurantRoutes);
app.use('/api/v1', apiKeyAuth, menuRoutes);
app.use('/api/v1/orders', apiKeyAuth, orderRoutes);
app.use('/api/v1/deliveries', apiKeyAuth, deliveryRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`\n  GrubHub Partner API running at http://localhost:${PORT}`);
  console.log(`  Demo UI available at http://localhost:${PORT}\n`);
});
