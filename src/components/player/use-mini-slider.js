import {
  ref,
  onMounted,
  nextTick,
  onUnmounted,
  computed,
  watch,
  onActivated,
  onDeactivated,
} from "vue";
import { useStore } from "vuex";
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";

BScroll.use(Slide);

export default function useMiniSlider() {
  const sliderWrapperRef = ref(null);
  const slider = ref(null);

  const store = useStore();
  const fullScreen = computed(() => store.state.fullScreen);
  const playList = computed(() => store.state.playList);
  const currentIndex = computed(() => store.state.currentIndex);

  const sliderShow = computed(() => {
    // fullScreen存在且playList存在
    return !fullScreen.value && !!playList.value;
  });
  onMounted(() => {
    let sliderVal;
    watch(sliderShow, async (newSliderShow) => {
      if (newSliderShow) {
        await nextTick();
        if (!sliderVal) {
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true,
            },
          });

          sliderVal.on("slidePageChanged", ({ pageX }) => {
            store.commit("setCurrentIndex", pageX);
          });
        } else {
          sliderVal.refresh();
        }
        sliderVal.goToPage(currentIndex.value, 0, 0);
      }
    });

    watch(currentIndex, (newIndex) => {
      if (sliderVal && sliderShow.value) {
        sliderVal.goToPage(newIndex, 0, 0);
      }
    });

    watch(playList, async (newList) => {
      if (sliderVal && sliderShow.value && newList.length) {
        await nextTick();
        sliderVal.refresh();
      }
    });
  });
  onUnmounted(() => {
    if (slider.value) {
      slider.value.destory();
    }
  });
  // onActivated, onDeactivated在使用keep-alive标签中有效，每次进入都会执行钩子中的函数
  onActivated(() => {
    slider.value.enable();
    slider.value.refresh();
  });

  onDeactivated(() => {
    slider.value.disable();
  });
  return {
    sliderWrapperRef,
    slider,
  };
}
