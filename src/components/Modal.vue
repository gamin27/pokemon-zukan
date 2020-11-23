<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <slot />
        </div>
        <header class="modal-header">
          <slot name="header">
            <button class="close-btn" @click="$emit('close')">とじる</button>
          </slot>
        </header>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
}
</script>

<style lang="scss" scoped>
.modal {
  &.modal-overlay {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &-window {
    position: relative;
    width: 500px;
    background: #fff;
    overflow: visible;
    margin-bottom: 48px;
  }

  &-content {
    padding: 20px 8px;
  }

  &-header {
    position: absolute;
    top: -48px;
    right: 0;
    padding: 10px;
    text-align: right;
    color: #fff;
    .close-btn {
      font-family: 'pokemon-font', 'Noto Sans JP';
      font-size: 1.6rem;
      font-weight: bold;
      border: 0px solid;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      text-align: center;
      text-decoration: none;
      letter-spacing: 0.1em;
      color: #fff;
      background: inherit;
    }
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s;

    .modal-window {
      transition: opacity 0.2s, transform 0.2s;
    }
  }

  &-leave-active {
    transition: opacity 0.4s ease 0.2s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;

    .modal-window {
      opacity: 0;
      transform: translateY(100px);
    }
  }
}

// 600px以上
@media screen and (min-width: 600px) {
}
</style>
