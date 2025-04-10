<template>
    <div class="ctn-products-table">

        <div class="btn-add-product">
            <Button label="Agregar Producto" icon="pi pi-plus" @click="showNewArticle" />
        </div>

        <DataTable :value="products" showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem" style="border-radius: 40px;">
            <Column field="name" header="Nombre" style="width: 25%"></Column>
            <Column field="brand" header="Marca" style="width: 25%"></Column>
            <Column field="sale_price" header="Precio de venta" style="width: 25%" >
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.sale_price) }}
                </template>
            </Column>
            <Column field="notes" header="Notas" style="width: 25%"></Column>
            <Column>
                <template #body="slotProps">

                    <div class="flex items-center gap-x-2 bg-red-200" style="display: flex;">

                        <Button icon="pi pi-pencil" class="mr-2" severity="success" outlined
                            @click="editProduct(slotProps.data)" style="margin-right: 10px;"></Button>
                        <Button icon="pi pi-trash" severity="danger" outlined
                            @click="confirmDelete(slotProps.data)"></Button>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>

    <DynamicDialog />
<Toast />
<ConfirmPopup />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Column, DataTable, Button, useToast, Toast, useConfirm } from 'primevue';
import { useProducts } from '../composables/useProducts.js'
import '../styles/ProductsTable.css';
import { useDialog } from 'primevue/usedialog';
import NewArticle from './NewArticle.vue';
import DynamicDialog from 'primevue/dynamicdialog';
import EditArticle from './EditArticle.vue';
import ConfirmPopup from 'primevue/confirmpopup';

const dialog = useDialog();
const confirm = useConfirm();
const products = ref(null);
const { getProducts, createProduct, deleteProduct} = useProducts();

const toast = useToast();

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

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
const confirmDelete = (productSelected) => {

    const {id} = productSelected;

    confirm.require({
        // target: event.currentTarget,
        message: '¿Seguro que quieres eliminar este producto?',
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Eliminar',
            severity: 'danger'
        },
        accept: () => {
           removeProduct(id)
        },
        // reject: () => {
        //     toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        // }
    });
};
const removeProduct = async (productId) =>{
    console.log('productId', productId)
    const response = await deleteProduct(productId);
    if(response.success) {
        products.value = products.value.filter(product => product.id !== productId);
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Producto eliminado correctamente', life: 5000 });
    }else{
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error eliminando el producto', life: 5000 });
    }
}
const editProduct = (product) => {
    console.log('product', product)
    dialog.open(EditArticle, {
        modal: true,
        data: {
            selectedProduct: {...product}
        },
        props: {
            header: 'Editar Artículo',
            
            style: {
                width: '50vw',
            },
            breakpoints:{
                '960px': '75vw',
                '640px': '90vw'
            },
        },
        onClose: (opt) => {
            const callbackParams = opt.data; 
            if(callbackParams.dialogData.success){
                products.value = products.value.map((p) => p.id === callbackParams.dialogData.product.id ? callbackParams.dialogData.product : p);
                toast.add({ severity: 'success', summary: 'Éxito', detail: 'Producto editado correctamente', life: 5000 });
            }else if(callbackParams.dialogData.product === null && !callbackParams.dialogData.success){
                toast.add({ severity: 'error', summary: 'Error', detail: 'Error editando el producto', life: 5000 });
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
