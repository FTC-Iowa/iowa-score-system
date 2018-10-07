import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "setup",
      component: () => import("./views/setup")
    },
    {
      path: "/teams",
      name: "teams",
      component: () => import("./views/teams")
    },
    {
      path: "/matchlist",
      name: "matchlist",
      component: () => import("./views/matchlist")
    },
    {
      path: "/scores",
      name: "scores",
      component: () => import("./views/scores")
    },
    {
      path: "/save",
      name: "save",
      component: () => import("./views/save")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
