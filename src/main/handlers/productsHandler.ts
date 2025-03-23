import { IpcMain } from "electron";

export function productsHandler(ipcMain: IpcMain){

    ipcMain.handle('get-products', async ()=> {

        

    })
}