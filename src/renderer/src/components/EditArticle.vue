<template>
    <Form>
      <div class="form-container">
        <div class="form-field">
          <label for="name">Nombre</label>
          <InputText id="name" v-model="product.name" required />
        </div>
  
        <div class="form-field">
          <label for="brand">Marca</label>
          <InputText id="brand" v-model="product.brand" required />
        </div>
  
        <div class="form-field">
          <label for="sale_price">Precio de venta</label>
          <InputNumber
            id="sale_price"
            v-model="product.sale_price"
            mode="currency"
            currency="USD"
            locale="en-US"
            required
          />
        </div>
  
        <div class="form-field">
          <label for="stock">Stock</label>
          <InputNumber
            id="stock"
            v-model="product.stock"
            required
          />
        </div>
  
        <div class="form-field full-width">
          <label for="notes">Notas</label>
          <Textarea
            id="notes"
            v-model="product.notes"
            rows="3"
            autoResize
          />
        </div>
      </div>
  
      <div class="submit-button">
        <Button label="Guardar" icon="pi pi-save" type="submit" @click="saveProduct" />
      </div>
    </Form>
  </template>
  
  <script setup>
  import { Form } from '@primevue/forms';
  import { Button, InputNumber, InputText, Textarea } from 'primevue';
  import { onMounted, reactive } from 'vue';
import { inject } from "vue";
import { useProducts } from '../composables/useProducts.js'

const dialogRef = inject('dialogRef');

const { createProduct } = useProducts();
const closeDialog = (productData) => {
    dialogRef.value.close({
        dialogData: {product: productData.product, success: productData.success}, 
    });
}

const props = defineProps({
    product: {
      type: Object,
      default: () => ({
        name: '',
        brand: '',
        sale_price: null,
        stock: null,
        notes: ''
      })
    }
  });

  const product = reactive({
    name:  '',
    brand:  '',
    sale_price: null,
    stock:  null,
    notes:  ''
  });

  

  const emit = defineEmits(['save']);

//   function saveButtonClick() {
    
    
//     emit('save', {...product});
// }


const saveProduct = async () => {
    
    
    const response = await createProduct({...product});

    if(response.success) {
        // products.value.push(response.data)
        const createdProduct = {...response.data}
        closeDialog({product: createdProduct, success: true});
        

    } else {
        console.error('Error creating product:', response.error);
        closeDialog({product: null, success: false});
    }

}
onMounted(() => {
    const params = dialogRef.value.data; 
    console.log('params', params)
    console.log('params.product', params.selectedProduct)

    // product.value = params.selectedProduct;
  Object.assign(product, params.selectedProduct);

})

  </script>
  
  <style scoped>
  .form-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 600px;
    margin: 2rem auto;
  }
  
  .form-field {
    display: flex;
    flex-direction: column;
  }
  
  .full-width {
    grid-column: span 2;
  }
  
  .submit-button {
    margin-top: 1.5rem;
    text-align: center;
  }
  
  @media (max-width: 600px) {
    .form-container {
      grid-template-columns: 1fr;
      padding: 0 1rem;
    }
  
    .full-width {
      grid-column: span 1;
    }
  
    .submit-button .p-button {
      width: 100%;
    }
  }
  </style>
  