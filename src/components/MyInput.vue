<template>
  <div class="my-input">
    <input type="text" :placeholder="placeholder" />
  </div>
</template>
<script>
export default {
  props: {
    placeholder: String,
  },
}
</script>
<style lang="scss" scoped>
.my-input {
  $main: #4e4e4e;
  $light: #d0d0d0;
  input {
    margin: 0;
    width: 100%;
    border: 0;
    border-radius: 0;
    box-sizing: border-box;
    padding: 0 8px;
    font-family: 'pokemon-font', 'Noto Sans JP';
    font-size: 1.6rem;
    color: $main;
    outline: none;
    line-height: 48px;

    &::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: $light;
      transition: 0.2s all;
    }

    &::-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: $light;
      transition: 0.2s all;
    }

    &::placeholder {
      /* Others */
      color: $light;
      transition: 0.2s all;
    }
  }
}
</style>
