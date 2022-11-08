import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/connect",
    name: "Connet Widget",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ConnectView.vue"),
  },
  {
    path: "/marketplace",
    name: "Marketplace Widget",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MarketplaceView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
