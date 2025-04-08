import { IpcMain } from "electron";
import { createProduct, getProducts } from "../services/productService";
import { Product } from "../types/Product";


export function productsHandler(ipcMain: IpcMain){

    ipcMain.handle('get-products', async ()=> {

        return await getProducts();
    });
    ipcMain.handle('create-product', async (event, product: Product)=> {
        console.log('product en main', product)
        return await createProduct(product);

    });
}