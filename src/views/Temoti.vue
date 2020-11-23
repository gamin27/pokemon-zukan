<template>
  <div class="temoti">
    <div v-if="itemsShow">
      <Cards :items="items" :imgShow="true" :typesShow="true"></Cards>
    </div>
    <div v-else class="not-found">てもち　は　いません。</div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
import Cards from '@/components/Cards'
export default {
  components: { Cards },
  data() {
    return {}
  },
  created() {
    window.scroll(0, 0)
  },
  computed: {
    items() {
      return this.$store.getters['temoti/tmp']
    },
    itemsShow() {
      return this.items.length != 0
    },
  },
}
</script>

<style lang="scss" scoped>
.not-found {
  padding: 32px 16px;
}
</style>
