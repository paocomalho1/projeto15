import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Comments from '../views/CommentsS.vue'
import Menu from '../views/MenuS.vue'

const rotas: RouteRecordRaw[] = [
    {
    path: '/',
    name: 'menu',
    component: Menu,
    props: true
    },
 {
     path: '/users/:id',
     name: 'users',
     component: Comments,
     props: true
 }
] 

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})


export default roteador