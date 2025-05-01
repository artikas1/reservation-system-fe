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
        path: '/RoomList',
        name: 'RoomList',
        component: () => import('@/components/room/RoomList.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/RoomCreation',
        name: 'RoomCreation',
        component: () => import('@/components/room/RoomCreation.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/RoomDeletion',
        name: 'RoomDeletion',
        component: () => import('@/components/room/RoomDeletion.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/EquipmentReservation',
        name: 'EquipmentReservation',
        component: () => import('@/components/equipment/EquipmentReservation.vue'),
      },
      {
        path: '/EquipmentList',
        name: 'EquipmentList',
        component: () => import('@/components/equipment/EquipmentList.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/EquipmentCreation',
        name: 'EquipmentCreation',
        component: () => import('@/components/equipment/EquipmentCreation.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/EquipmentDeletion',
        name: 'EquipmentDeletion',
        component: () => import('@/components/equipment/EquipmentDeletion.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/CarReservation',
        name: 'CarReservation',
        component: () => import('@/components/car/CarReservation.vue'),
      },
      {
        path: '/CarList',
        name: 'CarList',
        component: () => import('@/components/car/CarList.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/CarCreation',
        name: 'CarCreation',
        component: () => import('@/components/car/CarCreation.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/CarDeletion',
        name: 'CarDeletion',
        component: () => import('@/components/car/CarDeletion.vue'),
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
