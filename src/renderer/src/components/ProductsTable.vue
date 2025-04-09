<template>
    <div class="ctn-products-table">

        <div class="btn-add-product">
            <Button label="Agregar Producto" icon="pi pi-plus" @click="showNewArticle" />
        </div>

        <DataTable :value="products" showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem" style="border-radius: 40px;">
            <Column field="name" header="Nombre" style="width: 25%"></Column>
            <Column field="brand" header="Marca" style="width: 25%"></Column>
            <Column field="sale_price" header="Precio de venta" style="width: 25%"></Column>
            <Column field="notes" header="Notas" style="width: 25%"></Column>
            <Column>
                <template #body="slotProps">

                    <div class="flex items-center gap-x-2 bg-red-200" style="display: flex;">

                        <Button icon="pi pi-pencil" class="mr-2" severity="success" outlined
                            @click="editProduct(slotProps.data)"></Button>
                        <Button icon="pi pi-trash" severity="danger" outlined
                            @click="deleteProduct(slotProps.data)"></Button>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>

    <DynamicDialog />
<Toast />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Column, DataTable, Button, useToast, Toast } from 'primevue';
import { useProducts } from '../composables/useProducts.js'
import '../styles/ProductsTable.css';
import { useDialog } from 'primevue/usedialog';
import NewArticle from './NewArticle.vue';
import DynamicDialog from 'primevue/dynamicdialog';

const dialog = useDialog();
const products = ref(null);
const { getProducts, createProduct } = useProducts();

const toast = useToast();

const showNewArticle = () => {
    dialog.open(NewArticle, {
        modal: true,
        props: {
            header: 'Crear Artículo',
            style: {
                width: '50vw',
            },
            breakpoints:{
                '960px': '75vw',
                '640px': '90vw'
            },
        },
        emits: {
        onSave: (e) => {
            console.log('producto que llega')
            console.log(e);  // {user: 'primetime'}
            saveProduct(e);
        }
        }
    });
}

const saveProduct = async (product) => {
    
    
    const response = await createProduct(product);

    if(response.success) {
        console.log('response.data on productsTable: 23 ', response.data)
        products.value.push(response.data)
        
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Product creado correctamente' });

    } else {
        console.error('Error creating product:', response.error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error creando el producto' });
    }

    // Call the API to create the product
    // After creating the product, you can close the dialog and refresh the products list
    // dialog.closeAll();
}

onMounted(async () => {
    const response = await getProducts();
    console.log('repsonse', response)
    if (response.success) {
        console.log('response.data on productsTable: 23 ', response.data)
        products.value = response.data
    }
});

</script>
