
<template>
    <div class="card">
        <DataTable :value="products" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
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

    const products = ref([
  {
    id: 'SKU-001',
    name: 'Monitor Full HD 24"',
    description: 'LED monitor with 1080p resolution',
    brand: 'Samsung',
    provider: 'Tecnología S.A.',
    stock: 30,
    category: 5,
    cost_price: 100,
    sale_price: 150,
    location: 'Aisle 1B',
    status: 'Active',
    createdAt: '2025-03-01',
    updatedAt: '2025-03-15',
    notes: 'Includes HDMI cable'
  },
  {
    id: 'SKU-002',
    name: 'Wireless Mouse',
    description: 'Optical mouse with USB receiver',
    brand: 'Logitech',
    provider: 'Office Supplies Corp.',
    stock: 50,
    category: 10,
    cost_price: 8,
    sale_price: 15,
    location: 'Shelf C2',
    status: 'Active',
    createdAt: '2025-02-20',
    updatedAt: '2025-03-10',
    notes: 'Includes AA battery'
  },
  {
    id: 'SKU-003',
    name: 'Mechanical RGB Keyboard',
    description: 'Backlit keyboard with red switches',
    brand: 'HyperX',
    provider: 'GamingWorld Ltd.',
    stock: 12,
    category: 3,
    cost_price: 60,
    sale_price: 90,
    location: 'Aisle 2A',
    status: 'Active',
    createdAt: '2025-03-05',
    updatedAt: '2025-03-18',
    notes: '1-year warranty included'
  },
  {
    id: 'SKU-004',
    name: 'Ultrabook Laptop 13"',
    description: 'Intel Core i7, 16GB RAM, 512GB SSD',
    brand: 'Dell',
    provider: 'Tech Solutions Inc.',
    stock: 8,
    category: 2,
    cost_price: 750,
    sale_price: 950,
    location: 'Main Warehouse',
    status: 'Active',
    createdAt: '2025-01-15',
    updatedAt: '2025-03-12',
    notes: 'USB-C adapter included'
  },
  {
    id: 'SKU-005',
    name: 'Ergonomic Chair',
    description: 'Adjustable office chair with lumbar support',
    brand: 'ErgoChair',
    provider: 'Office Solutions',
    stock: 20,
    category: 5,
    cost_price: 45,
    sale_price: 70,
    location: 'Furniture Section',
    status: 'Active',
    createdAt: '2024-12-10',
    updatedAt: '2025-03-01',
    notes: 'Black color'
  }
]
);

// onMounted(() => {});

const customers = ref();

</script>
