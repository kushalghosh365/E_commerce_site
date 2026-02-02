import { pool } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, price, image_url } = req.body;
    try {
      
      const result = await pool.query(
        'INSERT INTO orders (product_name, price, image_url) VALUES ($1, $2, $3) RETURNING *',
        [name, price, image_url]
      );

      const savedOrder = result.rows[0];

      console.log("Order saved to PostgreSQL successfully!");
      
      res.status(200).json({ message: 'Order Successful!', order: savedOrder });
    } catch (error) {
      console.error("Database Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}