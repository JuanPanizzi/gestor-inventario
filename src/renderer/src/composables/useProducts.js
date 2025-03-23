
export function useProducts() {
    

    const getProducts = async() => {
            try {
                const response = await window.electronAPI.productsAPI.getProducts();
                if(response.success){
                    console.log('response.data', response.data)
                }
            } catch (error) {
                console.log('error', error)
            }
     }


    return {
        getProducts
    }

}