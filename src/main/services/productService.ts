import db from '../database/database.js'

export const getProducts = async () => { 

    try {
        
        const products = db.prepare(`SELECT * FROM products`).all();


        return { success: true, data: products }

    } catch (error) {
        
        return { success: false }

    }
 }