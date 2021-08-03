import { createRouter, createWebHashHistory } from "vue-router";
import Recommend from "@/views/recommend";
import Search from "@/views/search";
import Singer from "@/views/singer";
import TopList from "@/views/top-list";
import TopDetail from "@/views/top-detail";
import SingerDetail from "@/views/singer-detail";
import Album from "@/views/album";
import User from "@/views/user-center";

const routes = [
  {
    path: "/",
    redirect: "/recommend",
  },
  {
    path: "/recommend",
    component: Recommend,
    children: [
      {
        path: ":id",
        component: Album,
      },
    ],
  },
  {
    path: "/singer",
    component: Singer,
    children: [
      {
        path: ":id",
        component: SingerDetail,
      },
    ],
  },
  {
    path: "/top-list",
    component: TopList,
    children: [
      {
        path: ":id",
        component: TopDetail,
      },
    ],
  },
  {
    path: "/search",
    component: Search,
    children: [
      {
        path: ":id",
        component: SingerDetail,
      },
    ],
  },
  {
    path: "/user",
    components: {
      user: User, // 指定命名路由
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
