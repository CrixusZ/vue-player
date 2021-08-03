import {
  h,
  mergeProps,
  renderSlot,
  withCtx,
  ref,
  computed,
  watch,
  nextTick,
} from "vue";
import Scroll from "@/components/base/scroll/scroll";
import { useStore } from "vuex";

export default {
  name: "wrap-scroll",
  props: Scroll.props,
  emits: Scroll.emits,
  render(ctx) {
    return h(
      Scroll,
      mergeProps({ ref: "scrollRef" }, ctx.$props, {
        onScroll: (e) => {
          ctx.$emit("scroll", e);
        },
      }),
      {
        default: withCtx(() => {
          return [renderSlot(ctx.$slots, "default")];
        }),
      }
    );
  },
  setup() {
    const scrollRef = ref(null);
    // scroll实例初始化未null,防止渲染前return出去加上计算属性保证获取意渲染的scroll实例
    const scroll = computed(() => {
      return scrollRef.value.scroll;
    });
    const store = useStore();
    const playList = computed(() => store.state.playList);

    watch(playList, async () => {
      await nextTick();
      scroll.value.refresh();
    });
    return {
      scrollRef,
      scroll,
    };
  },
};
