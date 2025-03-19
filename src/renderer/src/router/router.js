import { createRouter, createWebHashHistory,  } from 'vue-router'
import Test from '../components/Test.vue'
import Home from '../components/Home.vue'

const routes = [ 
    {
        path: '/',
        name: 'Home',
        component: Home
      },
   
    {
        path: '/features',
        name: 'Test',
        component: Test
      }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

export default router