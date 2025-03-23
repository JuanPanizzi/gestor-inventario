import sqlite3 from 'better-sqlite3';

const dbPath = '../../database.db'

const db = new sqlite3(dbPath);


const createTableSQL = `CREATE TABLE IF NOT EXISTS products (
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

// Ejecutamos la creación de la tabla
db.exec(createTableSQL);

// Verificamos si ya existen registros
const rowCount = db.prepare('SELECT COUNT(*) AS count FROM products').get();

// Si está vacío, insertamos productos de ejemplo
if (rowCount.count === 0) {
  // Puedes hacer varios INSERT individuales o un batch
  const insertSQL = `
    INSERT INTO products (
      name, brand, provider, sale_price, cost_price, stock, category, description,
      status, notes, created_at, updated_at, location
    )
    VALUES
      (
        'Mouse Inalámbrico', 'Logitech', 'Office Supplies Corp.',
        15, 8, 50, 'Electronics', 'Optical Mouse Inalámbrico', 
        'Activo', 'Initial stock', '2025-02-20', '2025-03-10', 'Shelf C2'
      ),
      (
        'Mechanical Keyboard', 'HyperX', 'GamingWorld Ltd.',
        90, 60, 12, 'Electronics', 'Mechanical keyboard with red switches',
        'Activo', 'Initial stock', '2025-03-05', '2025-03-18', 'Aisle 2A'
      ),
      (
        'Ergonomic Chair', 'ErgoChair', 'Office Solutions',
        70, 45, 20, 'Furniture', 'Adjustable office chair with lumbar support',
        'Activo', 'Initial stock', '2024-12-10', '2025-03-01', 'Furniture Section'
      )
  `;
  db.exec(insertSQL);
}


export default db;
