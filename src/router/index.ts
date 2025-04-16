// Composables
import { createRouter, createWebHistory } from 'vue-router';
import UserService from "@/services/UserService.ts";

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/auth/Login.vue'),
  },
  {
    path: '/home',
    component: () => import('@/layouts/default/Default.vue'),
    meta: { requiresAuth: true }, // Mark this route as protected
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/RoomReservation',
        name: 'RoomReservation',
        component: () => import('@/components/room/RoomReservation.vue'),
      },
      {
        path: '/RoomCreation',
        name: 'RoomCreation',
        component: () => import('@/components/room/RoomCreation.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/EquipmentReservation',
        name: 'EquipmentReservation',
        component: () => import('@/components/equipment/EquipmentReservation.vue'),
      },
      {
        path: '/EquipmentCreation',
        name: 'EquipmentCreation',
        component: () => import('@/components/equipment/EquipmentCreation.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/CarReservation',
        name: 'CarReservation',
        component: () => import('@/components/car/CarReservation.vue'),
      },
      {
        path: '/CarCreation',
        name: 'CarCreation',
        component: () => import('@/components/car/CarCreation.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/ReservationHistory',
        name: 'ReservationHistory',
        component: () => import('@/components/ReservationHistory.vue'),
      },
      {
        path: '/DetailedSearch',
        name: 'DetailedSearch',
        component: () => import('@/components/DetailedSearch.vue'),
      },
      {
        path: '/AdminDashboard',
        name: 'AdminDashboard',
        component: () => import('@/components/admin/AdminDashboard.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
    ],
  },

  // Redirect to /home by default
  {
    path: '/',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to protect routes
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('jwtToken');
//
//   if (to.meta.requiresAuth && !token) {
//     // Redirect to login if the route requires authentication and no token is found
//     next('/login');
//   } else if (to.path === '/login' && token) {
//     // Redirect to home if the user is already logged in and tries to access the login page
//     next('/home');
//   } else {
//     // Allow access to the route
//     next();
//   }
// });
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("jwtToken");

  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  if (to.meta.requiresAdmin) {
    try {
      const user = await UserService.getCurrentUser();
      if (!user.isAdmin) return next("/home");
    } catch {
      return next("/login");
    }
  }

  if (to.path === "/login" && token) {
    return next("/home");
  }

  next();
});

export default router;
