import { createRouter, createWebHashHistory } from "vue-router";
// 异步组件
// 异步组件加载会自动生成0,1,2,3命名的js，可以使用命名规则改写如下
const Recommend = () =>
  import("@/views/recommend" /* webpackChunkName: "recommend" */);
const Search = () => import("@/views/search" /* webpackChunkName: "search" */);
const Singer = () => import("@/views/singer" /* webpackChunkName: "singer" */);
const TopList = () => import("@/views/top-list" /* webpackChunkName: "topList" */);
const TopDetail = () => import("@/views/top-detail" /* webpackChunkName: "topDetail" */);
const SingerDetail = () => import("@/views/singer-detail" /* webpackChunkName: "singerdetail" */);
const Album = () => import("@/views/album" /* webpackChunkName: "album" */);
const User = () => import("@/views/user-center" /* webpackChunkName: "usercenter" */);
// import Recommend from "@/views/recommend";
// import Search from "@/views/search";
// import Singer from "@/views/singer";
// import TopList from "@/views/top-list";
// import TopDetail from "@/views/top-detail";
// import SingerDetail from "@/views/singer-detail";
// import Album from "@/views/album";
// import User from "@/views/user-center";

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
