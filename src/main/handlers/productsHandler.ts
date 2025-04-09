import { ipcMain, IpcMain } from "electron";
import { createProduct, getProducts } from "../services/productService";
import { Product } from "../types/Product";


export const productsHandler = () => {

    ipcMain.handle('get-products', async ()=> {
   
        return await getProducts();
    });
    ipcMain.handle('create-product', async (_event, product: Product)=> {
        return await createProduct(product);
   
    });
 }
