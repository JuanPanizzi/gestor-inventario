
export function useProducts() {
    

    const getProducts = async() => {
            try {
                //const response = await window.electronAPI.productsAPI.getProducts();
                const response = await window.electronPepe.ping();
                console.log('resposne on use Products', response)
                // if(response.success){
                //     console.log('response.data', response.data)
                // }
            } catch (error) {
                console.log('error', error)
            }
     }


    return {
        getProducts
    }

}