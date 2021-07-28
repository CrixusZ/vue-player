<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input class="input-inner" :placeholder="placeholder" v-model="query" />
    <i v-show="query" class="icon-dismiss" @click="clear"></i>
  </div>
</template>

<script>
import { debounce } from "throttle-debounce";

export default {
  name: "search-input",
  props: {
    // v-model传递的参数用modelValue获取
    // 因为数据双向绑定不能直接赋值再input上，不符合数据从父组件到自组件单项流动的原则
    modelValue: String,
    placeholder: {
      type: String,
      default: "搜索歌曲,歌手",
    },
  },
  data() {
    return {
      query: this.modelValue,
    };
  },
  created() {
    // 节流
    this.$watch(
      "query",
      debounce(300, (newQuery) => {
        this.$emit("update:modelValue", newQuery.trim());
      })
    );
    this.$watch("modelValue", (newQuery) => {
      this.query = newQuery;
    });
  },
  methods: {
    clear() {
      this.query = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 32px;
  background: $color-highlight-background;
  border-radius: 6px;
  .icon-search {
    font-size: 24px;
    color: $color-text-d;
  }
  .input-inner {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    outline: 0;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-text-d;
  }
}
</style>
