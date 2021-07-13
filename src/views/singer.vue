<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers"></index-list>
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
    };
  },
  async created() {
    const res = await getSingerList();
    this.singers = res.singers;
    console.log(res);
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
