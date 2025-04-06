
<template>
    <div class="card">
        <DataTable :value="products" showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="name" header="Nombre" style="width: 25%"></Column>
            <Column field="brand" header="Marca" style="width: 25%"></Column>
            <Column field="sale_price" header="Precio de venta" style="width: 25%"></Column>
            <Column field="notes" header="Notas" style="width: 25%"></Column>
            <Column>
            <template #body="slotProps">
                
                <div class="flex items-center gap-x-2 bg-red-200" style="display: flex;">

                    <Button icon="pi pi-pencil" class="mr-2" severity="success" outlined @click="editProduct(slotProps.data)"></Button>
                    <Button  icon="pi pi-trash" severity="danger" outlined @click="deleteProduct(slotProps.data)"></Button>
                </div>
            </template>
            </Column>
            
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Column, DataTable, Button } from 'primevue';
import { useProducts } from '../composables/useProducts.js'

    const products = ref(null);
    const { getProducts } = useProducts();
    
    onMounted(async () => {
        const response = await getProducts();
        console.log('repsonse', response)
        if(response.success){
            console.log('response.data on productsTable: 23 ', response.data)
          products.value = response.data
        }
    });

</script>
