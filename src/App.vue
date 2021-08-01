<template>
  <m-header></m-header>
  <m-tab />
  <router-view :style="viewStyle"></router-view>
  <player></player>
</template>

<script>
import Header from "@/components/header/header";
import Tab from "@/components/tab/tab";
import Player from "./components/player/player";
import { mapState } from "vuex";
export default {
  components: {
    MHeader: Header,
    MTab: Tab,
    Player,
  },
  computed: {
    viewStyle() {
      const bottom = this.playList.length ? "60px" : "0";
      return {
        bottom,
      };
    },
    ...mapState(["playList"]),
  },
};
</script>

<style lang="scss"></style>
