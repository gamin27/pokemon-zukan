<template>
  <div class="my-alert" :class="{ active: isActive }">
    <div class="alert-window" :class="{ warn: isWarn }" @click="close()">
      <div class="mess">{{ mess }}</div>
      <p class="close">×</p>
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
export default {
  name: 'my-alert',
  props: {
    message: String,
    level: String,
  },
  data() {
    return {
      //active class flag
      isActive: false,
      //slert message
      mess: '',
      //timer id
      timer: null,
    }
  },
  computed: {
    isWarn() {
      return this.level == 'warning'
    },
  },
  methods: {
    //alert closing process
    close() {
      this.isActive = false
      this.$emit('close')
      clearTimeout(this.timer)
      this.timer = null
    },
  },
  watch: {
    message() {
      //no display ''
      if (!isEmpty(this.message)) {
        if (this.timer == null) {
          //new Alert
          this.isActive = true
        } else {
          //cancel a old timeout
          clearTimeout(this.timer)
        }
        this.mess = this.message
        this.timer = setTimeout(() => {
          this.isActive = false
          // notice alert finished
          this.$emit('close')
          this.timer = null
        }, 3000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.my-alert {
  position: fixed;
  display: block;
  z-index: 100;
  top: -50px;
  left: 0;
  right: 0;
  margin: auto;
  transition: top 0.5s;
  transform: none !important;
  &.active {
    top: 50px;
  }
  .alert-window {
    position: relative;
    display: block;
    margin: auto;
    border: 2px solid #eadd8b;
    border-radius: 4px;
    padding: 4px 8px 8px 8px;
    width: 250px;
    max-width: 100%;
    background: #f7f7d6;
    &.warn {
      color: #a40405;
    }
    .mess {
      text-align: center;
      font-weight: bold;
      font-size: 1.2rem;
    }
    .close {
      position: absolute;
      display: inline-block;
      top: 0px;
      right: 8px;
      font-size: 1.6rem;
      font-weight: bold;
    }
  }
}
@media screen and (min-width: 800px) {
  .my-alert {
    .alert-window {
      width: 450px;
      .mess {
        font-size: 1.6rem;
      }
    }
  }
}
</style>
