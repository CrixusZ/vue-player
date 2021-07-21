import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import { getLyric } from "../../service/song";
import Lyric from "lyric-parser";

export default function useLyric() {
  const currentLyric = ref(null);
  const store = useStore();
  const currentSong = computed(() => store.getters.currentSong);

  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return;
    }
    const lyric = await getLyric(newSong);
    store.commit("addSongLyric", {
      song: newSong,
      lyric,
    });
    //  currentSong是动态变化的,这样处理应付在加载歌词过程中频繁切换歌曲禁止下面的操作
    if (currentSong.value.lyric !== lyric) {
      return;
    }
    currentLyric.value = new Lyric(lyric, handleLyric);
  });

  function handleLyric() {}
}
