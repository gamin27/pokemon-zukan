<template>
  <div class="jump" :class="{ jumping: isActive }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'jump',
  data() {
    return {
      isActive: false,
    }
  },
  mounted() {
    const jump = () => {
      this.isActive = !this.isActive
      setTimeout(jump, 400)
    }
    jump()
  },
}
</script>
<style lang="scss">
.jump {
  &.jumping {
    transform: translateY(-15px);
  }
}
</style>
