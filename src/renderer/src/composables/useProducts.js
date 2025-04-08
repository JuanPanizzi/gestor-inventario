
export function useProducts() {
    

    const getProducts = async() => {
            try {
                //const response = await window.electronAPI.productsAPI.getProducts();
                const response = await window.api.getProducts();
                console.log('response on use Products', response)
                if(response.success){
                    return {success: true, data: response.data}
                }
            } catch (error) {
                console.log('error', error)
            }
     }

     const createProduct = async(product) => {
     console.log('product que se manda', product)
        try {
         
            const response = await window.api.createProduct(product);   
            console.log('response on use Products', response)

            if(response.success){
                return {success: true, data: response.data}
            }
        } catch (error) {
            return { success: false}
        }
    }

    return {
        getProducts,
        createProduct
    }

}