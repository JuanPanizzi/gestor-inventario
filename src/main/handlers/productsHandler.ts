import { ipcMain, IpcMain } from "electron";
import { createProduct, deleteProduct, getProducts } from "../services/productService";
import { Product } from "../types/Product";


export const productsHandler = () => {

    ipcMain.handle('get-products', async ()=> {
   
        return await getProducts();
    });
    ipcMain.handle('create-product', async (_event, product: Product)=> {
        return await createProduct(product);
   
    });
    ipcMain.handle('delete-product', async (_event, id: number)=> {
        return await deleteProduct(id);
    })
    
 }
