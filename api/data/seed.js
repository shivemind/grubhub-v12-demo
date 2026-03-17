const { v4: uuidv4 } = require('uuid');

const restaurantIds = [
  'rest-001', 'rest-002', 'rest-003', 'rest-004', 'rest-005'
];

const restaurants = [
  {
    id: restaurantIds[0],
    name: "Lou Malnati's Pizzeria",
    cuisine: 'Pizza',
    address: '439 N Wells St, Chicago, IL 60654',
    rating: 4.7,
    isOpen: true,
    estimatedDeliveryMin: 30,
    estimatedDeliveryMax: 45,
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: restaurantIds[1],
    name: 'Portillo\'s Hot Dogs',
    cuisine: 'American',
    address: '100 W Ontario St, Chicago, IL 60654',
    rating: 4.5,
    isOpen: true,
    estimatedDeliveryMin: 20,
    estimatedDeliveryMax: 35,
    createdAt: '2026-01-20T12:00:00Z'
  },
  {
    id: restaurantIds[2],
    name: 'The Berghoff Restaurant',
    cuisine: 'German',
    address: '17 W Adams St, Chicago, IL 60603',
    rating: 4.3,
    isOpen: true,
    estimatedDeliveryMin: 25,
    estimatedDeliveryMax: 40,
    createdAt: '2026-02-01T09:00:00Z'
  },
  {
    id: restaurantIds[3],
    name: 'Girl & The Goat',
    cuisine: 'New American',
    address: '809 W Randolph St, Chicago, IL 60607',
    rating: 4.8,
    isOpen: false,
    estimatedDeliveryMin: 35,
    estimatedDeliveryMax: 50,
    createdAt: '2026-02-10T14:00:00Z'
  },
  {
    id: restaurantIds[4],
    name: 'Al\'s #1 Italian Beef',
    cuisine: 'Italian',
    address: '1079 W Taylor St, Chicago, IL 60607',
    rating: 4.6,
    isOpen: true,
    estimatedDeliveryMin: 15,
    estimatedDeliveryMax: 30,
    createdAt: '2026-02-15T11:00:00Z'
  }
];

let menuItemIdCounter = 100;
function nextMenuItemId() {
  return `item-${++menuItemIdCounter}`;
}

const menuItems = [
  // Lou Malnati's
  { id: 'item-001', restaurantId: restaurantIds[0], name: 'Classic Deep Dish Pizza', description: 'Buttercrust deep dish with sausage, mozzarella, and chunky tomato sauce', price: 18.99, category: 'Entrees', available: true },
  { id: 'item-002', restaurantId: restaurantIds[0], name: 'The Malnati Chicago Classic', description: 'Sausage, extra cheese, butter crust', price: 21.99, category: 'Entrees', available: true },
  { id: 'item-003', restaurantId: restaurantIds[0], name: 'Crouton Salad', description: 'Chopped lettuce, tomatoes, croutons with house vinaigrette', price: 8.99, category: 'Sides', available: true },

  // Portillo's
  { id: 'item-004', restaurantId: restaurantIds[1], name: 'Chicago-Style Hot Dog', description: 'Vienna beef hot dog, mustard, relish, onion, tomato, pickle, sport peppers, celery salt', price: 5.49, category: 'Entrees', available: true },
  { id: 'item-005', restaurantId: restaurantIds[1], name: 'Italian Beef Sandwich', description: 'Thinly sliced seasoned beef on Italian bread with sweet or hot peppers', price: 9.99, category: 'Entrees', available: true },
  { id: 'item-006', restaurantId: restaurantIds[1], name: 'Chocolate Cake Shake', description: 'Chocolate cake blended into a chocolate milkshake', price: 6.99, category: 'Beverages', available: true },

  // The Berghoff
  { id: 'item-007', restaurantId: restaurantIds[2], name: 'Wiener Schnitzel', description: 'Breaded and pan-fried veal cutlet with lemon', price: 22.99, category: 'Entrees', available: true },
  { id: 'item-008', restaurantId: restaurantIds[2], name: 'Sauerbraten', description: 'Marinated pot roast with red cabbage and potato dumplings', price: 24.99, category: 'Entrees', available: true },
  { id: 'item-009', restaurantId: restaurantIds[2], name: 'Apple Strudel', description: 'Traditional warm apple strudel with vanilla sauce', price: 9.99, category: 'Desserts', available: true },

  // Girl & The Goat
  { id: 'item-010', restaurantId: restaurantIds[3], name: 'Wood Oven Roasted Pig Face', description: 'Tamarind, cilantro, red wine maple with a sunny side up egg', price: 19.99, category: 'Entrees', available: true },
  { id: 'item-011', restaurantId: restaurantIds[3], name: 'Goat Empanadas', description: 'Braised goat, pickled peppers, manchego romesco', price: 15.99, category: 'Appetizers', available: true },
  { id: 'item-012', restaurantId: restaurantIds[3], name: 'Grilled Broccoli', description: 'Grilled broccoli, limoncello vinaigrette, shallots, Parmesan', price: 13.99, category: 'Sides', available: false },

  // Al's #1 Italian Beef
  { id: 'item-013', restaurantId: restaurantIds[4], name: "Al's Original Italian Beef", description: 'Slow-roasted seasoned beef on fresh Italian bread, dipped in natural gravy', price: 10.49, category: 'Entrees', available: true },
  { id: 'item-014', restaurantId: restaurantIds[4], name: 'Italian Sausage Sandwich', description: 'Grilled Italian sausage with sweet peppers on Italian bread', price: 9.49, category: 'Entrees', available: true },
  { id: 'item-015', restaurantId: restaurantIds[4], name: 'Cheese Fries', description: 'Fresh-cut fries smothered in melted cheddar', price: 5.99, category: 'Sides', available: true }
];

const orders = [
  {
    id: 'order-001',
    restaurantId: restaurantIds[0],
    customerName: 'Sarah Johnson',
    items: [
      { menuItemId: 'item-001', name: 'Classic Deep Dish Pizza', quantity: 1, price: 18.99 },
      { menuItemId: 'item-003', name: 'Crouton Salad', quantity: 2, price: 8.99 }
    ],
    status: 'delivered',
    total: 36.97,
    deliveryAddress: '233 S Wacker Dr, Chicago, IL 60606',
    createdAt: '2026-03-17T11:30:00Z',
    updatedAt: '2026-03-17T12:15:00Z'
  },
  {
    id: 'order-002',
    restaurantId: restaurantIds[1],
    customerName: 'Mike Chen',
    items: [
      { menuItemId: 'item-004', name: 'Chicago-Style Hot Dog', quantity: 2, price: 5.49 },
      { menuItemId: 'item-006', name: 'Chocolate Cake Shake', quantity: 1, price: 6.99 }
    ],
    status: 'in_transit',
    total: 17.97,
    deliveryAddress: '875 N Michigan Ave, Chicago, IL 60611',
    createdAt: '2026-03-17T12:00:00Z',
    updatedAt: '2026-03-17T12:20:00Z'
  },
  {
    id: 'order-003',
    restaurantId: restaurantIds[4],
    customerName: 'Emily Rodriguez',
    items: [
      { menuItemId: 'item-013', name: "Al's Original Italian Beef", quantity: 1, price: 10.49 },
      { menuItemId: 'item-015', name: 'Cheese Fries', quantity: 1, price: 5.99 }
    ],
    status: 'preparing',
    total: 16.48,
    deliveryAddress: '111 N State St, Chicago, IL 60602',
    createdAt: '2026-03-17T12:30:00Z',
    updatedAt: '2026-03-17T12:30:00Z'
  }
];

const deliveries = [
  {
    orderId: 'order-001',
    driverName: 'Carlos Mendez',
    driverPhone: '+1-312-555-0147',
    status: 'delivered',
    estimatedArrival: '2026-03-17T12:10:00Z',
    currentLocation: { lat: 41.8789, lng: -87.6359 },
    assignedAt: '2026-03-17T11:35:00Z',
    deliveredAt: '2026-03-17T12:08:00Z'
  },
  {
    orderId: 'order-002',
    driverName: 'Aisha Williams',
    driverPhone: '+1-312-555-0293',
    status: 'in_transit',
    estimatedArrival: '2026-03-17T12:40:00Z',
    currentLocation: { lat: 41.8915, lng: -87.6244 },
    assignedAt: '2026-03-17T12:10:00Z',
    deliveredAt: null
  }
];

function getDb() {
  return {
    restaurants: [...restaurants],
    menuItems: [...menuItems],
    orders: [...orders],
    deliveries: [...deliveries],
    nextMenuItemId
  };
}

let db = getDb();

function resetDb() {
  db = getDb();
}

module.exports = { db, resetDb };
