import { createPool, PoolOptions } from 'mysql2/promise';

const pool: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 30,
};

const conn = createPool(pool);

export default conn;