<template>

    <Form>
        <div class="form-container">

        <div class="name">
                <label for="name">Nombre</label>
            <InputText id="name" v-model="product.name" required />
        </div>

        <div class="marca">
            <label for="brand">Marca</label>
            <InputText id="brand" v-model="product.brand" required />
        </div>

        <div class="precio">
            <label for="sale_price">Precio de venta</label>
            <InputNumber id="sale_price" v-model="product.sale_price" mode="currency" currency="USD" locale="en-US"
                required />
        </div>

        <div class="notas">
            <label for="notes">Notas</label>
            <Textarea id="notes" v-model="product.notes" rows="3" autoResize />
        </div>
        
    </div>
        <Button label="Guardar" icon="pi pi-save" type="submit" />


    </Form>


</template>
<script setup>

import { Form } from '@primevue/forms';
import { Button, InputNumber, InputText, Textarea } from 'primevue';
import { reactive } from 'vue';

const product = reactive({
  name: '',
  brand: '',
  sale_price: null,
  notes: ''
})
</script>
<style scoped>
.form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (max-width: 600px) {
  .form-container {
    padding: 0.5rem;
  }

  .p-card {
    padding: 1rem;
  }

  .p-button {
    width: 100%;
  }
}
</style>