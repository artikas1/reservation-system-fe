// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login.vue'),
  },
  {
    path: '/home',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/RoomReservation',
        name: 'RoomReservation',
        component: () => import('@/components/RoomReservation.vue'),
      },
      {
        path: '/EquipmentReservation',
        name: 'EquipmentReservation',
        component: () => import('@/components/EquipmentReservation.vue'),
      },
      {
        path: '/CarReservation',
        name: 'CarReservation',
        component: () => import('@/components/CarReservation.vue'),
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
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// import { createRouter, createWebHistory } from 'vue-router'
//
// const routes = [
//   {
//     path: '/',
//     component: () => import('@/layouts/default/Default.vue'),
//     children: [
//       {
//         path: '/home',
//         name: 'Home',
//         // route level code-splitting
//         // this generates a separate chunk (Home-[hash].js) for this route
//         // which is lazy-loaded when the route is visited.
//         component: () => import('@/views/Home.vue'),
//       },
//       {
//         path: '/RoomReservation',
//         name: 'RoomReservation',
//         component: () => import('@/components/RoomReservation.vue'),
//       },
//       {
//         path: '/EquipmentReservation',
//         name: 'EquipmentReservation',
//         component: () => import('@/components/EquipmentReservation.vue'),
//       },
//       {
//         path: '/CarReservation',
//         name: 'CarReservation',
//         component: () => import('@/components/CarReservation.vue'),
//       },
//       {
//         path: '/ReservationHistory',
//         name: 'ReservationHistory',
//         component: () => import('@/components/ReservationHistory.vue'),
//       },
//       {
//         path: '/DetailedSearch',
//         name: 'DetailedSearch',
//         component: () => import('@/components/DetailedSearch.vue'),
//       }
//     ],
//   },
// ]
//
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// })
//
// export default router
