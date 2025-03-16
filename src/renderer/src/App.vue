<script setup lang="ts">
import { Menubar } from 'primevue';
import { ref } from 'vue';


const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home'
    },
    {
        label: 'Features',
        icon: 'pi pi-star'
    },
  ])
</script>

<template>
 <div class="card">
        <Menubar :model="items" />
    </div>
    <h1>hola</h1>
</template>
