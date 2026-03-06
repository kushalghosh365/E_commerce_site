export const products = [
  {
    id: 1,
    name: 'Exclusive Shirt',
    price: 1200,
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRykVxiUCwzP628M6IW7zBG0qVYRmRrpbYUQA&s'
  },
  {
    id: 2,
    name: 'Classic Denim',
    price: 1800,
    image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80'
  },
  {
    id: 3,
    name: 'Smart Watch',
    price: 4500,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'
  },
  {
    id: 4,
    name: 'Wireless Earbuds',
    price: 2500,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
  },
  {
    id: 5,
    name: 'Leather Wallet',
    price: 900,
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80'
  },
  {
    id: 6,
    name: 'Running Shoes',
    price: 3200,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'
  },
  {
    id: 7,
    name: 'Mechanical Keyboard',
    price: 5500,
    image_url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80'
  },
  {
    id: 8,
    name: 'Gaming Mouse',
    price: 2200,
    image_url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80'
  },
  {
    id: 9,
    name: 'Backpack',
    price: 1500,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80'
  },
  {
    id: 10,
    name: 'Sunglasses',
    price: 1100,
    image_url: 'https://images.unsplash.com/photo-1511499767390-91f94f741a81?w=500&q=80'
  },
  {
    id: 11,
    name: 'Smartphone',
    price: 45000,
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80'
  },
  {
    id: 12,
    name: 'Coffee Mug',
    price: 400,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80'
  },
  {
    id: 13,
    name: 'Table Lamp',
    price: 1800,
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed657f9971?w=500&q=80'
  },
  {
    id: 14,
    name: 'Water Bottle',
    price: 600,
    image_url: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&q=80'
  },
  {
    id: 15,
    name: 'Laptop Stand',
    price: 1200,
    image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80'
  },
  {
    id: 16,
    name: 'Winter Jacket',
    price: 3500,
    image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80'
  },
  {
    id: 17,
    name: 'Silk Tie',
    price: 800,
    image_url: 'https://images.unsplash.com/photo-1589756823851-41a56119df44?w=500&q=80'
  },
  {
    id: 18,
    name: 'Wristband',
    price: 300,
    image_url: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=500&q=80'
  },
  {
    id: 19,
    name: 'Bluetooth Speaker',
    price: 2800,
    image_url: 'https://images.unsplash.com/photo-1608156639585-34a0a56ee6c9?w=500&q=80'
  },
  {
    id: 20,
    name: 'Digital Camera',
    price: 32000,
    image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80'
  },
  {
    id: 21,
    name: 'Notebook',
    price: 200,
    image_url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&q=80'
  },
  {
    id: 22,
    name: 'Desk Chair',
    price: 7500,
    image_url: 'https://images.unsplash.com/photo-1505843490701-5be550bc2351?w=500&q=80'
  },
  {
    id: 23,
    name: 'Wall Clock',
    price: 1200,
    image_url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80'
  },
  {
    id: 24,
    name: 'Yoga Mat',
    price: 1000,
    image_url: 'https://images.unsplash.com/photo-1601925260368-ae2f20455f91?w=500&q=80'
  }
];

export const orders = [];

export const pool = {
  query: async (text, params) => {
    const queryText = text.trim().toLowerCase();
    
    // Handle SELECT products
    if (queryText.includes('select') && queryText.includes('products')) {
      return { rows: products };
    }
    
    // Handle INSERT order
    if (queryText.includes('insert into orders')) {
      const [name, price, image_url] = params;
      const newOrder = {
        id: orders.length + 1,
        product_name: name,
        price,
        image_url,
        created_at: new Date().toISOString()
      };
      orders.push(newOrder);
      return { rows: [newOrder] };
    }
    
    return { rows: [] };
  }
};


