const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    console.log('SUCCESS: Raw PG connected!');
    process.exit(0);
  })
  .catch(err => {
    console.error('FAILURE: Raw PG error:', err.message);
    process.exit(1);
  });
