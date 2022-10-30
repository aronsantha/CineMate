import { createRouter, createWebHistory } from "vue-router";
import DiscoverView from "../views/DiscoverView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "discover",
      component: DiscoverView,
    },
    {
      path: "/collection",
      name: "collection",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CollectionView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

export default router;
