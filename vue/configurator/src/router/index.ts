import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/connect",
  },
  {
    path: "/connect",
    name: "Connet Widget",
    component: () =>
      import(/* webpackChunkName: "connect" */ "../views/ConnectView.vue"),
  },
  {
    path: "/marketplace",
    name: "Marketplace Widget",
    // route level code-splitting
    // this generates a separate chunk (marketplace.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "marketplace" */ "../views/MarketplaceView.vue"
      ),
  },
  {
    path: "/identity",
    name: "Wallet Identity Widget",
    component: () =>
      import(/* webpackChunkName: "identity" */ "../views/IdentityView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
