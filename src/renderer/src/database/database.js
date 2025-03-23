import sqlite3 from 'better-sqlite3';

const dbPath = '../database/database.db'

const db = new sqlite3(dbPath);

export default db;
