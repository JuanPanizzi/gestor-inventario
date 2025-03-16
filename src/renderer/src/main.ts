

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'

import Aura from '@primeuix/themes/aura';
// createApp(App).mount('#app')

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    ripple: true 
});

app.mount('#app');