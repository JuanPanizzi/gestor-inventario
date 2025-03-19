<script setup lang="ts">
import { Menubar } from 'primevue';
import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';




const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

const router = useRouter()
const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => router.push({ name: 'Home' })
    },
    {
        label: 'Features',
        icon: 'pi pi-star',
       command: () => router.push({ name: 'Test' })
    },
  ])
</script>

<template>
 <div class="card">
        <Menubar :model="items" />
        <RouterView />
    </div>
</template>
