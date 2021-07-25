import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import { getLyric } from "../../service/song";
import Lyric from "lyric-parser";

export default function useLyric({ songReady, currentTime }) {
  const currentLyric = ref(null);
  const lyricScollRef = ref(null);
  const lyricListRef = ref(null);
  const pureMusicLyric = ref("");
  const playingLyric = ref("");
  const currentLineNum = ref(0);
  const store = useStore();
  const currentSong = computed(() => store.getters.currentSong);

  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return;
    }
    // 已经缓存lyric要暂停掉
    stopLyric();
    currentLyric.value = null;
    currentLineNum.value = 0;

    const lyric = await getLyric(newSong);
    store.commit("addSongLyric", {
      song: newSong,
      lyric,
    });
    //  currentSong是动态变化的,这样处理应付在加载歌词过程中频繁切换歌曲禁止下面的操作
    if (currentSong.value.lyric !== lyric) {
      debugger;
      return;
    }
    currentLyric.value = new Lyric(lyric, handleLyric);
    console.log(currentLyric.value);
    console.log(currentLineNum.value);
    const hasLyric = currentLyric.value.lines.length;
    if (hasLyric) {
      if (songReady.value) {
        playLyric();
      }
    } else {
      console.log(lyric);
      playingLyric.value = pureMusicLyric.value = lyric.replace(
        /\[(\d{2}):(\d{2}):(\d{2})\]/g,
        ""
      );
    }
    console.log(pureMusicLyric);
  });

  function handleLyric({ lineNum, txt }) {
    currentLineNum.value = lineNum;
    playingLyric.value = txt;
    const scrollComp = lyricScollRef.value;
    const listEl = lyricListRef.value;
    if (!listEl) {
      return;
    }
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5];
      scrollComp.scroll.scrollToElement(lineEl, 1000);
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000);
    }
  }

  function playLyric() {
    const currentLyricVal = currentLyric.value;
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000);
    }
  }

  function stopLyric() {
    const currentLyricVal = currentLyric.value;
    if (currentLyricVal) {
      currentLyricVal.stop();
    }
  }
  return {
    currentLyric,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    playLyric,
    stopLyric,
    lyricScollRef,
    lyricListRef,
  };
}
