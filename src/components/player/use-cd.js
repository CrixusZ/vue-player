import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

export default function useCd() {
  const store = useStore();
  const playing = computed(() => store.state.playing);
  const cdRef = ref(null);
  const cdImgRef = ref(null);

  const cdCls = computed(() => {
    return playing.value ? "playing" : "";
  });

  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value, cdImgRef.value);
    }
  });
  function syncTransform(wrapper, inner) {
    const wrapperTransfrom = getComputedStyle(wrapper).transform;
    const innerTransfrom = getComputedStyle(inner).transform;
    console.log(wrapperTransfrom);
    console.log(innerTransfrom);
    wrapper.style.transform =
      wrapperTransfrom === "none"
        ? innerTransfrom
        : innerTransfrom.concat(" ", wrapperTransfrom); // 角度叠加
  }

  return {
    cdCls,
    cdRef,
    cdImgRef,
  };
}
