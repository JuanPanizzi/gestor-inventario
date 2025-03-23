import { IpcMain } from "electron";
import { getProducts } from "../services/productService";

export function productsHandler(ipcMain: IpcMain){

    ipcMain.handle('get-products', async ()=> {

        return await getProducts();

    })
}