require('dotenv').config();
const {Pool} = require('pg');

const DB_NAME = process.env.NODE_ENV !== 'test' ? process.env.DB_DATABASE : process.env.DB_TEST_DATABASE;

module.exports.db = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || '12345'
});
