const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'thuan25092003',
  database: 'todo_db',
  port: 5432
});

pool
  .query('SELECT 1')
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch(err => console.error('❌ PostgreSQL error', err));

module.exports = pool;
