import db from '../database/database.js'
import { Product } from '../types/Product.js';


export const getProducts = async () => { 

    try {
        
        const products = db.prepare(`SELECT * FROM products`).all();


        return { success: true, data: products }

    } catch (error) {
        
        return { success: false }

    }
 }

 export const createProduct = async (product: Product) => {
    try {
    
        const { name, brand, sale_price, notes } = product;

        const stmt = db.prepare(`INSERT INTO products (name, brand, sale_price, notes) VALUES (?, ?, ?, ?)`);    
        const result = stmt.run(name, brand, sale_price, notes);

        if (result.changes > 0) {
         
            return { success: true, data: { id: result.lastInsertRowid, ...product } };
        }
        
        return { success: false, message: 'Error al crear producto' };
        
    } catch (error) {
        
        return { success: false }

    }
    
 }

 export const deleteProduct = async (id: number) => {
    try {
        
        const stmt = db.prepare(`DELETE FROM products WHERE id = ?`);    
        const result = stmt.run(id);

        if (result.changes > 0) {
         
            return { success: true, data: { id } };
        }
        
        return { success: false, message: 'Error al eliminar producto' };
        
    } catch (error) {
        
        return { success: false }

    }
    
 }

 export const updateProduct = async (product: Product) => {
    try {
        
        const { id, name, brand, sale_price, notes } = product;

        const stmt = db.prepare(`UPDATE products SET name = ?, brand = ?, sale_price = ?, notes = ? WHERE id = ?`);    
        const result = stmt.run(name, brand, sale_price, notes, id);

        if (result.changes > 0) {
         
            return { success: true, data: { id, ...product } };
        }
        
        return { success: false, message: 'Error al actualizar producto' };
        
    } catch (error) {
        
        return { success: false }

    }
    
 }


