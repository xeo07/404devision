import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import GoodsListView from './views/GoodsListView.vue'
import CartView from './views/CartView.vue'
import ProductView from './views/ProductView.vue'
import ProductDescriptionView from './views/ProductDescriptionView.vue'
import ProductSpecsView from './views/ProductSpecsView.vue'
import ProductReviewsView from './views/ProductReviewsView.vue'
import RequestView from './views/RequestView.vue'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import UsersView from './views/UsersView.vue'
import ProfileView from './views/ProfileView.vue'
import AdminView from './views/AdminView.vue'
import AdminGoodsView from './views/AdminGoodsView.vue'
import AdminAddGoodView from './views/AdminAddGoodView.vue'
import EditGoodView from './views/EditGoodView.vue'
import NotFoundView from './views/NotFoundView.vue'
import { useUsers } from './composables/useUsers'

const routes = [
  { path: '/', component: HomeView, name: 'home' },
  { path: '/about', component: AboutView, name: 'about' },
  { path: '/goods', component: GoodsListView, name: 'goods' },
  { path: '/cart', component: CartView, name: 'cart' },
  {
    path: '/goods/:id',
    component: ProductView,
    name: 'product',
    children: [
      { path: '', redirect: (to) => ({ name: 'product-description', params: { id: to.params.id } }) },
      { path: 'description', component: ProductDescriptionView, name: 'product-description' },
      { path: 'specs', component: ProductSpecsView, name: 'product-specs' },
      { path: 'reviews', component: ProductReviewsView, name: 'product-reviews' }
    ]
  },
  { path: '/request', component: RequestView, name: 'request' },
  { path: '/login', component: LoginView, name: 'login' },
  { path: '/register', component: RegisterView, name: 'register' },
  { path: '/users', component: UsersView, name: 'users', meta: { requiresAdmin: true } },
  { path: '/profile', component: ProfileView, name: 'profile', meta: { requiresAuth: true } },
  {
    path: '/admin',
    component: AdminView,
    name: 'admin',
    meta: { requiresAdmin: true },
    children: [
      { path: '', redirect: { name: 'admin-goods' } },
      { path: 'goods', component: AdminGoodsView, name: 'admin-goods' },
      { path: 'add', component: AdminAddGoodView, name: 'admin-add-good' }
    ]
  },
  {
    path: '/admin/edit/:id',
    component: EditGoodView,
    name: 'edit-good',
    meta: { requiresAdmin: true }
  },
  { path: '/:pathMatch(.*)*', component: NotFoundView, name: 'not-found' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isAuth, isAdmin } = useUsers()

  if (to.meta.requiresAdmin && !isAdmin.value) {
    next('/login')
    return
  }

  if (to.meta.requiresAuth && !isAuth.value) {
    next('/login')
    return
  }

  next()
})

export default router
