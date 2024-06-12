

import { pool } from "../db";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM images');
      client.release();
      const images = result.rows;
      res.status(200).json(images);
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    // Handle POST request
  } else if (req.method === 'DELETE') {
    // Handle DELETE request
  } else if (req.method === 'PUT') {
    // Handle PUT request
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
