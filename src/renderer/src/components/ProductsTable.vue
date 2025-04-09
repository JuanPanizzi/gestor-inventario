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
        // emits: {
        // onSave: (e) => {
        //     console.log('producto que llega')
        //     console.log(e);  // {user: 'primetime'}
        //     saveProduct(e);
        // },
        // }
        onClose: (opt) => {
            const callbackParams = opt.data; 
            if(callbackParams.dialogData.success){

                products.value.push(callbackParams.dialogData.product);
                toast.add({ severity: 'success', summary: 'Éxito', detail: 'Producto creado correctamente', life: 5000 });
            }else if(callbackParams.dialogData.product === null && !callbackParams.dialogData.success){
                toast.add({ severity: 'error', summary: 'Error', detail: 'Error creando el producto', life: 5000 });
            }
        }
    });
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
