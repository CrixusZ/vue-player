import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";

import { onMounted, onUnmounted, ref, onActivated, onDeactivated } from "vue";

BScroll.use(Slide);

export default function useSlider(wrapperRef) {
  const slider = ref(null);
  const currentPageIndex = ref(0);
  onMounted(() => {
    const sliderVal = (slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true, // 轮播图配置
    }));
    sliderVal.on("slideWillChange", (page) => {
      currentPageIndex.value = page.pageX;
    });
  });
  onUnmounted(() => {
    slider.value.destroy();
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
    slider,
    currentPageIndex,
  };
}
