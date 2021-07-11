<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import useScoll from "./use-scroll";
import { ref } from "vue";

export default {
  name: "scroll",
  props: {
    click: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const rootRef = ref(null);
    useScoll(rootRef, props);
    return {
      rootRef,
    };
  },
};
</script>
