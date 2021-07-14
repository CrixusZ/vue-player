<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="selectSinger"></index-list>
    <router-view :singer="selectedSinger"></router-view>
  </div>
</template>

<script>
import { getSingerList } from "@/service/singer";
import IndexList from "../components/index-list/index-list";
export default {
  name: "singer",
  components: {
    IndexList,
  },
  data() {
    return {
      singers: [],
      selectedSinger: null,
    };
  },
  async created() {
    const res = await getSingerList();
    this.singers = res.singers;
    console.log(res);
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer;
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
