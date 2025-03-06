import { type RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/layouts/DefaultLayout.vue'),
        redirect: '/one',
        children: [
            {
                path: '/one',
                name: 'one',
                component: () => import('@/views/oneone/one.vue')
            },
            {
                path: '/tow',
                name: 'tow',
                component: () => import('@/views/towtow/tow.vue')
            },
            {
                path: '/three',
                name: 'three',
                component: () => import('@/views/three/three.vue')
            },
            {
                path: '/four',
                name: 'four',
                component: () => import('@/views/four/four.vue')
            },
            {
                path: '/five',
                name: 'five',
                component: () => import('@/views/five/five.vue')
            }
        ]
    },
    
]
export default routes