import { ref } from "vue";
import animations from "create-keyframe-animation";

export default function useAnimation() {
  const cdWrapperRef = ref(null);
  let entering = false;
  let leaving = false;

  function enter(el, done) {
    if (leaving) {
      afterLeave();
    }
    entering = true;
    const { x, y, scale } = getPosAndScale();
    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      },
      100: {
        transform: "translate3d(0, 0, 0) scale(1)",
      },
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 600,
        easing: "cubic-bezier(0.45, 0, 0.55, 1)",
      },
    });
    animations.runAnimation(cdWrapperRef.value, "move", done);
  }

  function afterEnter() {
    entering = false;
    animations.unregisterAnimation("move");
    cdWrapperRef.value.animation = "";
  }

  function leave(el, done) {
    if (entering) {
      afterEnter();
    }
    leaving = true;
    const { x, y, scale } = getPosAndScale();
    const cdWrapperEl = cdWrapperRef.value;

    cdWrapperEl.style.transition = "all 0.6s cubic-bezier(0.45, 0, 0.55, 1)";
    cdWrapperEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    cdWrapperEl.addEventListener("transitionend", next);

    function next() {
      cdWrapperEl.removeEventListener("transitionend", next);
      done();
    }
  }

  function afterLeave() {
    leaving = false;
    const cdWrapperEl = cdWrapperRef.value;

    cdWrapperEl.style.transform = "";
    cdWrapperEl.style.transition = "";
  }

  function getPosAndScale() {
    // 小图标的宽度
    const targetWidth = 40;
    // 小图标圆心加上pdl的距离
    const paddingLeft = 40;
    // 小图标圆心加上pdb的距离
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;

    // x轴的偏移量
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    const scale = targetWidth / width;

    return {
      x,
      y,
      scale,
    };
  }

  return {
    enter,
    afterEnter,
    leave,
    afterLeave,
    cdWrapperRef,
  };
}