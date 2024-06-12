

import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nestapp',
  password: 'root',
  port: '5432',
  
});

export { pool };
