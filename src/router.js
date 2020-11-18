import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('./components/frontend/CanBook.vue'),
      children: [
        {
          path: '',
          name: 'FeaturedBooks',
          component: () => import('./components/frontend/FeaturedBooks.vue')
        },
        {
          path: 'shop',
          name: 'Shop',
          component: () => import('./components/frontend/Shop.vue')
        },
        {
          path: 'shop/:shopId',
          name: 'ShopCheck',
          component: () => import('./components/frontend/ShopCheck.vue')
        },
        {
          path: 'news',
          name: 'News',
          component: () => import('./components/frontend/News.vue')
        },
        {
          path: 'aboutUs',
          name: 'AboutUs',
          component: () => import('./components/frontend/AboutUs.vue')
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('./components/frontend/Cart.vue')
        },
        {
          path: 'cart/:cartId',
          name: 'CartCheck',
          component: () => import('./components/frontend/CartCheck.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/frontend/Login.vue')
    },
    {
      path: '/admin',
      component: () => import('./components/backend/Dashboard.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'Products',
          component: () => import('./components/backend/Products.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'orderlist',
          name: 'Orderlist',
          component: () => import('./components/backend/Orderlist.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: () => import('./components/backend/Coupon.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'customerorder',
          name: 'CustomerOrder',
          component: () => import('./components/backend/CustomerOrder.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'customerorder_check/:orderId',
          name: 'CustomerOrderCheck',
          component: () => import('./components/backend/CustomerOrderCheck.vue')
        }
      ]
    }
  ]
})
