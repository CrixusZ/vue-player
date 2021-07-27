<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from "../service/singer";
// import { processSongs } from "../service/song";
import createDetailComponent from "../assets/js/create-detail-component";
// import MusicList from "../components/music-list/music-list";
// import storage from "good-storage";
import { SINGER_KEY } from "../assets/js/constant";
export default createDetailComponent(
  "singer-detail",
  SINGER_KEY,
  getSingerDetail
);
// export default {
//   name: "singer-detail",
//   props: {
//     singer: Object,
//   },
//   components: { MusicList },
//   data() {
//     return {
//       songs: [],
//       loading: true,
//     };
//   },
//   computed: {
//     computedSinger() {
//       let res = null;
//       const singer = this.singer;
//       if (singer) {
//         res = singer;
//       } else {
//         const cachedSinger = storage.session.get(SINGER_KEY);
//         if (cachedSinger && cachedSinger.mid === this.$route.params.id) {
//           res = cachedSinger;
//         }
//       }
//       return res;
//     },
//     pic() {
//       const singer = this.computedSinger;
//       return singer && singer.pic;
//     },
//     title() {
//       const singer = this.computedSinger;
//       return singer && singer.name;
//     },
//   },
//   async created() {
//     if (!this.computedSinger) {
//       const path = this.$route.match[0].path;
//       this.$router.push({
//         path,
//       });
//       return;
//     }
//     const singer = this.computedSinger;
//     const res = await getSingerDetail(singer);
//     this.songs = await processSongs(res.songs);
//     this.loading = false;
//   },
// };
</script>
<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
