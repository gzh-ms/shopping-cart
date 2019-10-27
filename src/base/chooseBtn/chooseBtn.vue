<template>
  <div class="choose" :class="{chosen: chosen}" @click="$emit('changeChosenStatus')"></div>
</template>

<script>
export default {
  name: 'ChooseBtn',
  props: {
    chosen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.choose {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid #979797;
  border-radius: 50%;

  &.chosen {
    &::after {
      content: " ";
      width: 10px;
      height: 10px;
      background: #333;
      border-radius: 50%;
    }
  }
}
</style>