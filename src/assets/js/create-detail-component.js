import MusicList from "@/components/music-list/music-list";
import storage from "good-storage";
import { processSongs } from "@/service/song";

export default function createDetailComponent(name, key, fetch) {
  return {
    name,
    components: { MusicList },
    props: {
      data: Object,
    },
    data() {
      return {
        songs: [],
        loading: true,
      };
    },
    computed: {
      computedData() {
        let ret = null;
        const data = this.data;
        console.log(data)
        if (data) {
          ret = data;
        } else {
          const cached = storage.session.get(key);
          console.log("cached");
          console.log(cached);
          console.log(this.$route.params.id)
          if (
            cached &&
            (cached.mid || cached.id + "") === this.$route.params.id
          ) {
            ret = cached;
          }
        }
        console.log(ret)
        return ret;
      },
      pic() {
        const data = this.computedData;
        return data && data.pic;
      },
      title() {
        const data = this.computedData;
        return data && (data.name || data.title);
      },
    },
    async created() {
      const data = this.computedData;
      if (!data) {
        const path = this.$route.matched[0].path;
        this.$router.push({
          path,
        });
        return;
      }
      const result = await fetch(data);
      this.songs = await processSongs(result.songs);
      this.loading = false;
    },
  };
}
