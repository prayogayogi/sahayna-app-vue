import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import Success from '../views/Success.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/product/:id',
    props:true,
    name: 'Product',
    component: Product
  },
  {
    path: '/chart',
    name: 'Chart',
    component: ShoppingCart
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  },
]

const router = new VueRouter({
  routes
})

export default router
