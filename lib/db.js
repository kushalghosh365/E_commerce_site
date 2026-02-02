import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config'; // এই লাইনটি .env ফাইলকে কোডের সাথে কানেক্ট করবে

export const pool = new Pool({
  // এটি সরাসরি .env ফাইলের DATABASE_URL থেকে লিঙ্কটি নিয়ে নেবে
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false
  }
});