const ENDPOINTS = [
  {
    group: 'Health',
    items: [
      { method: 'GET', path: '/api/v1/health', body: null, noAuth: true }
    ]
  },
  {
    group: 'Restaurants',
    items: [
      { method: 'GET', path: '/api/v1/restaurants', body: null },
      { method: 'GET', path: '/api/v1/restaurants/rest-001', body: null },
      { method: 'POST', path: '/api/v1/restaurants', body: JSON.stringify({ name: "Giordano's", cuisine: "Pizza", address: "730 N Rush St, Chicago, IL 60611", estimatedDeliveryMin: 25, estimatedDeliveryMax: 40 }, null, 2) },
      { method: 'PUT', path: '/api/v1/restaurants/rest-001', body: JSON.stringify({ isOpen: false, rating: 4.9 }, null, 2) },
      { method: 'DELETE', path: '/api/v1/restaurants/rest-005', body: null }
    ]
  },
  {
    group: 'Menus',
    items: [
      { method: 'GET', path: '/api/v1/restaurants/rest-001/menu', body: null },
      { method: 'POST', path: '/api/v1/restaurants/rest-001/menu/items', body: JSON.stringify({ name: "Garlic Bread", description: "Toasted bread with garlic butter and herbs", price: 6.99, category: "Sides" }, null, 2) },
      { method: 'PUT', path: '/api/v1/menu/items/item-001', body: JSON.stringify({ price: 19.99, available: true }, null, 2) },
      { method: 'DELETE', path: '/api/v1/menu/items/item-015', body: null }
    ]
  },
  {
    group: 'Orders',
    items: [
      { method: 'GET', path: '/api/v1/orders', body: null },
      { method: 'GET', path: '/api/v1/orders/order-001', body: null },
      { method: 'POST', path: '/api/v1/orders', body: JSON.stringify({ restaurantId: "rest-001", customerName: "Alex Thompson", items: [{ menuItemId: "item-001", quantity: 1 }, { menuItemId: "item-003", quantity: 2 }], deliveryAddress: "200 E Randolph St, Chicago, IL 60601" }, null, 2) },
      { method: 'PUT', path: '/api/v1/orders/order-003/status', body: JSON.stringify({ status: "ready" }, null, 2) }
    ]
  },
  {
    group: 'Delivery',
    items: [
      { method: 'GET', path: '/api/v1/deliveries/order-002/tracking', body: null },
      { method: 'PUT', path: '/api/v1/deliveries/order-003/assign', body: JSON.stringify({ driverName: "Marcus Rivera", driverPhone: "+1-312-555-0188" }, null, 2) },
      { method: 'GET', path: '/api/v1/deliveries/active', body: null }
    ]
  }
];

function initExplorer() {
  const list = document.getElementById('endpointList');
  const methodSelect = document.getElementById('reqMethod');
  const urlInput = document.getElementById('reqUrl');
  const bodyInput = document.getElementById('reqBody');
  const apiKeyInput = document.getElementById('reqApiKey');
  const sendBtn = document.getElementById('sendBtn');
  const respStatus = document.getElementById('respStatus');
  const respTime = document.getElementById('respTime');
  const respBody = document.getElementById('respBody');

  ENDPOINTS.forEach(group => {
    const div = document.createElement('div');
    div.className = 'endpoint-group';

    const title = document.createElement('div');
    title.className = 'endpoint-group-title';
    title.textContent = group.group;
    div.appendChild(title);

    group.items.forEach(ep => {
      const item = document.createElement('div');
      item.className = 'endpoint-item';

      const badge = document.createElement('span');
      badge.className = `method-badge ${ep.method.toLowerCase()}`;
      badge.textContent = ep.method;

      const path = document.createElement('span');
      path.className = 'path';
      path.textContent = ep.path;

      item.appendChild(badge);
      item.appendChild(path);

      item.addEventListener('click', () => {
        methodSelect.value = ep.method;
        urlInput.value = ep.path;
        bodyInput.value = ep.body || '';
      });

      div.appendChild(item);
    });

    list.appendChild(div);
  });

  async function sendRequest() {
    const method = methodSelect.value;
    const url = urlInput.value;
    const apiKey = apiKeyInput.value;
    const body = bodyInput.value.trim();

    respStatus.textContent = 'Sending...';
    respStatus.className = '';
    respTime.textContent = '';
    respBody.textContent = '';

    const headers = { 'Content-Type': 'application/json' };
    if (apiKey) headers['X-API-Key'] = apiKey;

    const opts = { method, headers };
    if (body && method !== 'GET' && method !== 'DELETE') {
      opts.body = body;
    }

    const start = performance.now();
    try {
      const res = await fetch(url, opts);
      const elapsed = Math.round(performance.now() - start);
      const data = await res.json();

      const statusClass = res.status < 300 ? 'status-2xx' : res.status < 500 ? 'status-4xx' : 'status-5xx';
      respStatus.textContent = `${res.status} ${res.statusText}`;
      respStatus.className = statusClass;
      respTime.textContent = `${elapsed}ms`;
      respBody.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      respStatus.textContent = 'Error';
      respStatus.className = 'status-5xx';
      respTime.textContent = `${Math.round(performance.now() - start)}ms`;
      respBody.textContent = err.message;
    }
  }

  sendBtn.addEventListener('click', sendRequest);

  urlInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendRequest();
  });
}
