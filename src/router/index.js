import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ResetPassword from '../views/ResetPassword.vue';
import Success from '../views/Success.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/reset-password', component: ResetPassword },
  { path: '/success', component: Success }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
