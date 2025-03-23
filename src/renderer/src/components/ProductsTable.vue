
<template>
    <div class="card">
        <DataTable :value="products" showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="name" header="Nombre" style="width: 25%"></Column>
            <Column field="brand" header="Marca" style="width: 25%"></Column>
            <Column field="sale_price" header="Precio de venta" style="width: 25%"></Column>
            <Column field="notes" header="Notas" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Column, DataTable } from 'primevue';
import { getProducts } from '../composables/useProducts.js'
    const products = ref(null);

    
    onMounted(async () => {
        const response = await getProducts();
        if(response.success){
          products.value = response.data
        }
    });

</script>
