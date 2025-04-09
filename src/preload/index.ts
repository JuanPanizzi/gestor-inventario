import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { create } from 'domain'
import { Product } from '../main/types/Product'

// Custom APIs for renderer
const productsAPI = {
  getProducts: () => ipcRenderer.invoke('get-products'),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      ping: () => ipcRenderer.invoke('ping'),
      getProducts: () => ipcRenderer.invoke('get-products'),
      createProduct: (product: Product) => ipcRenderer.invoke('create-product', product),
      deleteProduct: (id: number) => ipcRenderer.invoke('delete-product', id),
      updateProduct: (product: Product) => ipcRenderer.invoke('update-product', product),
    } 
    )
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
// @ts-ignore
window.productsAPI = productsAPI;

}
