import sqlite3 from 'better-sqlite3';

const dbPath = '../database/database.db'

const db = new sqlite3(dbPath);


const addProductsSQL = `CREATE TABLE IF NOT EXISTS products (
id INTEGER PRIMARY KEY,
name TEXT,
brand TEXT,
provider TEXT,
sale_price INTEGER,
cost_price INTEGER,
stock INTEGER,
category TEXT,
description TEXT,
status TEXT,
notes TEXT,
created_at TEXT,
updated_at TEXT,
location TEXT
)`



export default db;
