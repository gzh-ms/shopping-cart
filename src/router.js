import Vue from 'vue'
import VueRouter from 'vue-router'
import Cart from './components/cart/cart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'cart',
    component: Cart
  }
]

export default new VueRouter({
  routes
})
